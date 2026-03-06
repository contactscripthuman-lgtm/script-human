/**
 * Structure-Breaker - Burstiness Analysis & Human Noise Injection
 * Accurate burstiness calculation with intelligent suggestion system
 */

export interface BurstinessAnalysis {
    score: number; // 0-1 (higher = more human)
    level: 'low' | 'medium' | 'high';
    suggestions: StructureSuggestion[];
    sentenceStats: {
        total: number;
        avgLength: number;
        variance: number;
        shortest: number;
        longest: number;
    };
}

export interface StructureSuggestion {
    id: string;
    position: number; // character index in original text
    type: 'fragment' | 'emdash' | 'parenthetical' | 'interjection';
    suggestion: string;
    reason: string;
    originalSentence: string;
    transformedSentence: string;
    priority: 'high' | 'medium' | 'low';
}

export type NoiseType = 'fragment' | 'emdash' | 'parenthetical' | 'interjection';

// Enhanced human noise templates
const NOISE_TEMPLATES = {
    fragments: [
        'Not always.',
        'But sometimes.',
        'Maybe.',
        'Who knows?',
        'Hard to say.',
        'Definitely not.',
        'Or at least, that\'s what I think.',
        'Could be wrong though.',
        'Perhaps.',
        'Occasionally.',
        'Sometimes, anyway.',
        'Not really.',
        'Could be.',
        'Probably.',
        'Definitely.',
        'Sort of.',
        'Kind of.',
        'In a way.',
    ],

    emdashes: [
        'at least in my view',
        'or so it seems',
        'though I could be mistaken',
        'from what I can tell',
        'based on my experience',
        'surprisingly enough',
        'to my surprise',
        'believe it or not',
        'as far as I know',
        'in most cases',
        'more often than not',
        'at least typically',
        'from my perspective',
        'generally speaking',
        'if you ask me',
    ],

    parentheticals: [
        '(though I could be wrong about this)',
        '(at least from my perspective)',
        '(or so I believe)',
        '(I think)',
        '(probably)',
        '(maybe)',
        '(not always, but often)',
        '(surprisingly)',
        '(in my experience)',
        '(generally)',
        '(usually)',
        '(typically)',
        '(most of the time)',
        '(often enough)',
    ],

    interjections: [
        'Look,',
        'Listen,',
        'Here\'s the thing:',
        'You know what?',
        'Honestly,',
        'To be fair,',
        'In my experience,',
        'I mean,',
        'Actually,',
        'Basically,',
        'Frankly,',
        'Realistically,',
        'To be honest,',
    ]
};

/**
 * Analyze text burstiness and generate suggestions
 */
export function analyzeBurstiness(text: string): BurstinessAnalysis {
    const sentences = text.split(/[.!?]+\s+/).filter(s => s.trim());
    const lengths = sentences.map(s => s.split(/\s+/).length);

    // Calculate statistics
    const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    const variance = calculateVariance(lengths, avgLength);
    const score = calculateBurstinessScore(variance, avgLength);
    const level = score > 0.7 ? 'high' : score > 0.4 ? 'medium' : 'low';

    const sentenceStats = {
        total: sentences.length,
        avgLength: Math.round(avgLength),
        variance: Math.round(variance * 100) / 100,
        shortest: Math.min(...lengths),
        longest: Math.max(...lengths)
    };

    // Generate suggestions based on analysis
    const suggestions = generateSuggestions(text, sentences, lengths, score);

    return { score, level, suggestions, sentenceStats };
}

/**
 * Calculate burstiness score (0-1)
 * Formula: variance / mean
 * Higher score = more varied = more human-like
 */
function calculateBurstinessScore(variance: number, mean: number): number {
    if (mean === 0) return 0;

    const rawScore = variance / mean;

    // Normalize to 0-1 scale (0.7+ is excellent)
    return Math.min(1, rawScore / 0.7);
}

/**
 * Calculate variance
 */
function calculateVariance(numbers: number[], mean: number): number {
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length;
    return Math.sqrt(avgSquaredDiff);
}

/**
 * Generate intelligent suggestions based on text analysis
 */
function generateSuggestions(
    text: string,
    sentences: string[],
    lengths: number[],
    burstinessScore: number
): StructureSuggestion[] {
    const suggestions: StructureSuggestion[] = [];
    let charPosition = 0;

    // Identify problematic areas
    for (let i = 0; i < sentences.length; i++) {
        const currentLength = lengths[i];
        const sentence = sentences[i].trim();

        // Check for uniform blocks (3+ consecutive similar-length sentences)
        if (i >= 2) {
            const prev1 = lengths[i - 1];
            const prev2 = lengths[i - 2];

            const diff1 = Math.abs(currentLength - prev1);
            const diff2 = Math.abs(prev1 - prev2);

            // If all three sentences are within 3 words of each other = UNIFORM
            if (diff1 <= 3 && diff2 <= 3) {
                // HIGH PRIORITY: Break this uniformity AGGRESSIVELY

                // Suggestion 1: Add fragment after current sentence
                suggestions.push({
                    id: `frag-${i}`,
                    position: charPosition + sentence.length,
                    type: 'fragment',
                    suggestion: getRandomNoise('fragments'),
                    reason: 'Uniform sentence block detected - add fragment for variety',
                    originalSentence: sentence,
                    transformedSentence: sentence + '. ' + getRandomNoise('fragments'),
                    priority: 'high'
                });
            }

            // Even if not perfectly uniform, still suggest fragments for low burstiness
            else if (diff1 <= 5 && diff2 <= 5 && burstinessScore < 0.6) {
                suggestions.push({
                    id: `frag-uniform-${i}`,
                    position: charPosition + sentence.length,
                    type: 'fragment',
                    suggestion: getRandomNoise('fragments'),
                    reason: 'Low sentence variance - add fragment',
                    originalSentence: sentence,
                    transformedSentence: sentence + '. ' + getRandomNoise('fragments'),
                    priority: 'medium'
                });
            }
        }

        // Check for overly long sentences (>22 words, lowered from 25)
        if (currentLength > 22) {
            // Suggestion: Break with em-dash
            const midpoint = Math.floor(sentence.length / 2);
            const breakPoint = sentence.indexOf(' ', midpoint);

            if (breakPoint !== -1) {
                const firstPart = sentence.substring(0, breakPoint);
                const secondPart = sentence.substring(breakPoint + 1);
                const noise = getRandomNoise('emdashes');

                suggestions.push({
                    id: `emdash-${i}`,
                    position: charPosition + breakPoint,
                    type: 'emdash',
                    suggestion: `—${noise}—`,
                    reason: 'Long sentence detected - break with em-dash for natural flow',
                    originalSentence: sentence,
                    transformedSentence: `${firstPart}—${noise}—${secondPart}`,
                    priority: 'high'  // Changed from medium to high
                });
            }
        }

        // Check for sentences that could use parenthetical aside
        if (currentLength > 15 && currentLength < 25 && Math.random() < 0.3) {
            const words = sentence.split(/\s+/);
            const insertPoint = Math.floor(words.length * 0.7);
            const noise = getRandomNoise('parentheticals');

            const transformed = [
                ...words.slice(0, insertPoint),
                noise,
                ...words.slice(insertPoint)
            ].join(' ');

            suggestions.push({
                id: `paren-${i}`,
                position: charPosition + words.slice(0, insertPoint).join(' ').length,
                type: 'parenthetical',
                suggestion: noise,
                reason: 'Add personal touch with parenthetical aside',
                originalSentence: sentence,
                transformedSentence: transformed,
                priority: 'low'
            });
        }

        // Suggest interjection at start of first sentence if formal
        if (i === 0 && !hasInterjection(sentence)) {
            const noise = getRandomNoise('interjections');

            suggestions.push({
                id: `interject-${i}`,
                position: charPosition,
                type: 'interjection',
                suggestion: noise,
                reason: 'Start with conversational interjection for human touch',
                originalSentence: sentence,
                transformedSentence: noise + ' ' + sentence,
                priority: 'medium'
            });
        }

        charPosition += sentence.length + 2; // +2 for ". "
    }

    // Sort by priority
    return suggestions.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

/**
 * Apply a specific suggestion to text
 */
export function applySuggestion(text: string, suggestion: StructureSuggestion): string {
    const { position, suggestion: noise, type } = suggestion;

    const before = text.substring(0, position);
    const after = text.substring(position);

    switch (type) {
        case 'fragment':
            return before + '. ' + noise + after;

        case 'emdash':
            return before + noise + after;

        case 'parenthetical':
            return before + ' ' + noise + after;

        case 'interjection':
            return noise + ' ' + text;

        default:
            return text;
    }
}

/**
 * Apply multiple suggestions to text
 */
export function applyMultipleSuggestions(text: string, suggestions: StructureSuggestion[]): string {
    let result = text;

    // Sort by position (descending) to avoid position shifts
    const sorted = [...suggestions].sort((a, b) => b.position - a.position);

    sorted.forEach(suggestion => {
        result = applySuggestion(result, suggestion);
    });

    return result;
}

/**
 * Helper functions
 */
function getRandomNoise(type: keyof typeof NOISE_TEMPLATES): string {
    const templates = NOISE_TEMPLATES[type];
    return templates[Math.floor(Math.random() * templates.length)];
}

function hasInterjection(sentence: string): boolean {
    const interjectionStarters = ['look', 'listen', 'honestly', 'you know', 'i mean', 'here\'s'];
    const lowerSentence = sentence.toLowerCase();

    return interjectionStarters.some(starter => lowerSentence.startsWith(starter));
}

/**
 * Get improvement suggestions for low burstiness
 */
export function getImprovementTips(score: number): string[] {
    if (score >= 0.7) {
        return ['✅ Excellent burstiness! Your text has natural variation.'];
    } else if (score >= 0.4) {
        return [
            'Add 1-2 very short sentences (3-5 words)',
            'Break one long sentence with em-dash',
            'Insert a fragment for dramatic effect'
        ];
    } else {
        return [
            '🔴 Low burstiness detected - high AI risk!',
            'Add 3+ short sentences or fragments',
            'Break 2-3 long sentences with em-dashes',
            'Start sentences with interjections',
            'Vary your sentence lengths dramatically'
        ];
    }
}
