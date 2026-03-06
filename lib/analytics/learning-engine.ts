/**
 * Learning Engine
 * Uses collected data to recommend best techniques
 */

import { analyticsStore } from './database';

export interface TechniqueRecommendation {
    techniques: string[];
    expectedImprovement: number;
    confidence: 'high' | 'medium' | 'low';
    sampleSize: number;
}

/**
 * Get recommended techniques for a given context
 */
export function getRecommendedTechniques(
    mood: string,
    domain: string,
    currentScore: number
): TechniqueRecommendation[] {
    // Determine score range (±10 points)
    const scoreRange: [number, number] = [
        Math.max(0, currentScore - 10),
        Math.min(100, currentScore + 10)
    ];

    const bestTechniques = analyticsStore.getBestTechniques(mood, domain, scoreRange);

    if (bestTechniques.length === 0) {
        // No data yet, return defaults
        return [{
            techniques: ['context-aware', 'contractions', 'sdsl-boost'],
            expectedImprovement: 15,
            confidence: 'low',
            sampleSize: 0
        }];
    }

    return bestTechniques.map((bt, index) => {
        // Confidence based on position and avg improvement
        let confidence: 'high' | 'medium' | 'low';
        if (index === 0 && bt.avgImprovement > 20) {
            confidence = 'high';
        } else if (bt.avgImprovement > 10) {
            confidence = 'medium';
        } else {
            confidence = 'low';
        }

        return {
            techniques: bt.techniques,
            expectedImprovement: Math.round(bt.avgImprovement),
            confidence,
            sampleSize: bestTechniques.length
        };
    });
}

/**
 * Learn from AI detection patterns
 */
export function getAIDetectionInsights() {
    const patterns = analyticsStore.analyzeAIPatterns();

    if (!patterns) {
        return {
            insights: ['Not enough data collected yet'],
            recommendations: ['Continue collecting AI samples']
        };
    }

    const insights: string[] = [];
    const recommendations: string[] = [];

    // SDSL insights
    const avgSDSL = parseFloat(patterns.avgSDSL);
    if (avgSDSL < 5) {
        insights.push(`AI content averages SDSL ${patterns.avgSDSL} (very uniform)`);
        recommendations.push('Target SDSL 9-12 for human-like variation');
    }

    // Hedging insights
    const avgHedging = parseFloat(patterns.avgHedging);
    if (avgHedging > 5) {
        insights.push(`AI content averages ${patterns.avgHedging} hedging phrases`);
        recommendations.push('Aggressive hedging removal is critical');
    }

    // Smog density
    const avgSmog = parseFloat(patterns.avgSmogDensity);
    if (avgSmog > 2) {
        insights.push(`AI content has ${patterns.avgSmogDensity} AI phrases per 100 words`);
        recommendations.push('Remove all AI buzzwords');
    }

    // Rare words
    const avgRare = parseFloat(patterns.avgRareWordRatio);
    if (avgRare < 20) {
        insights.push(`AI uses only ${patterns.avgRareWordRatio}% rare words (generic)`);
        recommendations.push('Inject domain-specific vocabulary');
    }

    return {
        insights,
        recommendations,
        sampleCount: patterns.sampleCount
    };
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
    return analyticsStore.getSummary();
}
