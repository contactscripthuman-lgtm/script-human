/**
 * Analytics Database Schema & Queries
 * Tracks humanization results and learns from user data
 */

export interface HumanizationResult {
    id: string;
    originalScore: number;
    humanizedScore: number;
    improvement: number;
    techniques: string[];
    mood: string;
    domain: string;
    wordCount: number;
    success: boolean;
    timestamp: Date;
}

export interface AISample {
    id: string;
    content: string;
    detectedModel?: string; // GPT, Claude, Gemini
    trustScore: number;
    metrics: {
        sdsl: number;
        hedging: number;
        smogDensity: number;
        rareWordRatio: number;
        aiLikelihood: number;
    };
    timestamp: Date;
}

// In-memory storage (upgrade to real DB later)
class AnalyticsStore {
    private humanizations: HumanizationResult[] = [];
    private aiSamples: AISample[] = [];

    /**
     * Track a humanization result
     */
    trackHumanization(result: Omit<HumanizationResult, 'id' | 'timestamp'>): void {
        this.humanizations.push({
            ...result,
            id: this.generateId(),
            timestamp: new Date()
        });

        // Keep only last 10,000 entries
        if (this.humanizations.length > 10000) {
            this.humanizations = this.humanizations.slice(-10000);
        }

        console.log(`📊 Tracked: ${result.mood}/${result.domain} | ${result.originalScore}% → ${result.humanizedScore}% (+${result.improvement})`);
    }

    /**
     * Collect AI sample for learning
     */
    collectAISample(sample: Omit<AISample, 'id' | 'timestamp'>): void {
        // Only store if high AI likelihood
        if (sample.metrics.aiLikelihood > 70) {
            this.aiSamples.push({
                ...sample,
                id: this.generateId(),
                timestamp: new Date()
            });

            // Keep only last 5,000 samples
            if (this.aiSamples.length > 5000) {
                this.aiSamples = this.aiSamples.slice(-5000);
            }

            console.log(`🤖 AI Sample Collected: ${sample.detectedModel || 'Unknown'} | AI: ${sample.metrics.aiLikelihood}%`);
        }
    }

    /**
     * Get best techniques for specific context
     */
    getBestTechniques(
        mood: string,
        domain: string,
        scoreRange: [number, number]
    ): { techniques: string[]; avgImprovement: number }[] {
        // Filter successful humanizations
        const relevant = this.humanizations.filter(h =>
            h.mood === mood &&
            h.domain === domain &&
            h.originalScore >= scoreRange[0] &&
            h.originalScore <= scoreRange[1] &&
            h.success
        );

        if (relevant.length === 0) {
            return [];
        }

        // Group by technique combinations
        const techniqueMap = new Map<string, number[]>();

        relevant.forEach(h => {
            const key = h.techniques.sort().join('|');
            if (!techniqueMap.has(key)) {
                techniqueMap.set(key, []);
            }
            techniqueMap.get(key)!.push(h.improvement);
        });

        // Calculate averages and sort
        const results = Array.from(techniqueMap.entries())
            .map(([key, improvements]) => ({
                techniques: key.split('|'),
                avgImprovement: improvements.reduce((a, b) => a + b, 0) / improvements.length
            }))
            .sort((a, b) => b.avgImprovement - a.avgImprovement);

        return results.slice(0, 10); // Top 10
    }

    /**
     * Get analytics summary
     */
    getSummary() {
        const totalHumanizations = this.humanizations.length;
        const successRate = totalHumanizations > 0
            ? (this.humanizations.filter(h => h.success).length / totalHumanizations) * 100
            : 0;

        const avgImprovement = totalHumanizations > 0
            ? this.humanizations.reduce((sum, h) => sum + h.improvement, 0) / totalHumanizations
            : 0;

        const totalAISamples = this.aiSamples.length;

        return {
            totalHumanizations,
            successRate: Math.round(successRate),
            avgImprovement: Math.round(avgImprovement),
            totalAISamples,
            lastUpdated: new Date()
        };
    }

    /**
     * Analyze AI patterns from collected samples
     */
    analyzeAIPatterns() {
        if (this.aiSamples.length === 0) return null;

        const avgMetrics = {
            sdsl: 0,
            hedging: 0,
            smogDensity: 0,
            rareWordRatio: 0,
            aiLikelihood: 0
        };

        this.aiSamples.forEach(sample => {
            avgMetrics.sdsl += sample.metrics.sdsl;
            avgMetrics.hedging += sample.metrics.hedging;
            avgMetrics.smogDensity += sample.metrics.smogDensity;
            avgMetrics.rareWordRatio += sample.metrics.rareWordRatio;
            avgMetrics.aiLikelihood += sample.metrics.aiLikelihood;
        });

        const count = this.aiSamples.length;
        return {
            avgSDSL: (avgMetrics.sdsl / count).toFixed(2),
            avgHedging: (avgMetrics.hedging / count).toFixed(1),
            avgSmogDensity: (avgMetrics.smogDensity / count).toFixed(2),
            avgRareWordRatio: (avgMetrics.rareWordRatio / count).toFixed(1),
            avgAILikelihood: (avgMetrics.aiLikelihood / count).toFixed(1),
            sampleCount: count
        };
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Singleton instance
export const analyticsStore = new AnalyticsStore();
