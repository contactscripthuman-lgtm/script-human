/**
 * Smart Recommendation Parser & Applier
 * Converts Trust Hub recommendations into actionable transformations
 */

import type { ForensicAnalysisResult } from '@/lib/trust-hub/types';

export interface ActionableRecommendation {
    type: 'sdsl' | 'ai-phrases' | 'contractions' | 'vocabulary' | 'citations' | 'readability';
    action: string;
    targetValue?: number;
    patterns?: string[];
}

/**
 * Parse Trust Hub recommendations into actionable steps
 */
export function parseRecommendations(result: ForensicAnalysisResult): ActionableRecommendation[] {
    const actions: ActionableRecommendation[] = [];

    result.recommendations.forEach(rec => {
        // Fix: rec is an object with a 'text' property, not a string
        const textContent = typeof rec === 'string' ? rec : rec.text;
        const lowerRec = textContent.toLowerCase();

        // SDSL recommendations
        if (lowerRec.includes('sdsl') && lowerRec.includes('too uniform')) {
            actions.push({
                type: 'sdsl',
                action: 'Increase sentence length variation',
                targetValue: 9 // Target SDSL
            });
        }

        // AI phrase removal
        if (lowerRec.includes('remove ai phrases') || lowerRec.includes('ai likelihood')) {
            // Extract AI patterns if provided
            const patternsMatch = textContent.match(/"([^"]+)"/g);
            const patterns = patternsMatch ? patternsMatch.map(p => p.replace(/"/g, '')) : [];

            actions.push({
                type: 'ai-phrases',
                action: 'Remove AI-generated patterns',
                patterns: patterns.length > 0 ? patterns : undefined
            });
        }

        // Vocabulary diversity
        if (lowerRec.includes('vocabulary') || lowerRec.includes('diversity')) {
            actions.push({
                type: 'vocabulary',
                action: 'Increase vocabulary richness'
            });
        }

        // Readability
        if (lowerRec.includes('readability') || lowerRec.includes('simplify')) {
            actions.push({
                type: 'readability',
                action: 'Improve readability and flow'
            });
        }

        // Citations
        if (lowerRec.includes('citations')) {
            actions.push({
                type: 'citations',
                action: 'Add supporting citations'
            });
        }
    });

    return actions;
}

/**
 * Apply recommendations to text
 */
export function applyRecommendations(
    text: string,
    actions: ActionableRecommendation[],
    mood: string
): string {
    let result = text;

    actions.forEach(action => {
        switch (action.type) {
            case 'sdsl':
                result = improveSentenceVariation(result, mood);
                break;

            case 'ai-phrases':
                result = removeAIPatternsStrong(result, action.patterns);
                break;

            case 'vocabulary':
                result = enrichVocabulary(result, mood);
                break;

            case 'readability':
                result = improveReadability(result);
                break;

            case 'contractions':
                result = addContractionsStrong(result);
                break;
        }
    });

    return result;
}

/**
 * Improve sentence variation for better SDSL
 */
function improveSentenceVariation(text: string, mood: string): string {
    const sentences = text.split(/([.!?]+\s+)/);
    const processed: string[] = [];

    sentences.forEach((sent, i) => {
        if (i % 2 === 1) {
            // Keep punctuation
            processed.push(sent);
            return;
        }

        const words = sent.trim().split(/\s+/);

        // Vary sentence lengths
        if (i % 3 === 0 && words.length > 15) {
            // Make some sentences shorter by splitting
            const midpoint = Math.floor(words.length / 2);
            processed.push(words.slice(0, midpoint).join(' ') + '.');
            processed.push(' ' + words.slice(midpoint).join(' '));
        } else if (i % 4 === 0 && words.length < 8) {
            // Make some sentences longer by combining
            processed.push(sent);
        } else {
            processed.push(sent);
        }
    });

    return processed.join('');
}

/**
 * Strong AI pattern removal
 */
function removeAIPatternsStrong(text: string, specificPatterns?: string[]): string {
    let result = text;

    // Remove specific patterns if provided
    if (specificPatterns && specificPatterns.length > 0) {
        specificPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            result = result.replace(regex, '');
        });
    }

    // Common AI phrases to remove
    const aiPhrases = [
        'delve into', 'tapestry', 'multifaceted', 'furthermore', 'moreover',
        'it\'s important to note', 'it\'s worth noting', 'in today\'s digital age',
        'landscape', 'paradigm shift', 'game changer', 'cutting-edge',
        'innovative solution', 'robust framework', 'seamless integration'
    ];

    aiPhrases.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        result = result.replace(regex, '');
    });

    // Clean up double spaces
    result = result.replace(/\s{2,}/g, ' ');

    return result;
}

/**
 * Enrich vocabulary with mood-appropriate words
 */
function enrichVocabulary(text: string, mood: string): string {
    let result = text;

    // Replace generic words with more specific ones
    const replacements: Record<string, string[]> = {
        'good': ['excellent', 'outstanding', 'remarkable', 'impressive'],
        'bad': ['poor', 'inadequate', 'substandard', 'disappointing'],
        'very': ['extremely', 'remarkably', 'exceptionally', 'notably'],
        'big': ['substantial', 'significant', 'considerable', 'extensive'],
        'small': ['minor', 'modest', 'limited', 'minimal']
    };

    Object.entries(replacements).forEach(([generic, specific]) => {
        const regex = new RegExp(`\\b${generic}\\b`, 'gi');
        const replacement = specific[Math.floor(Math.random() * specific.length)];
        result = result.replace(regex, replacement);
    });

    return result;
}

/**
 * Improve readability
 */
function improveReadability(text: string): string {
    let result = text;

    // Break up long sentences
    result = result.replace(/,\s+and\s+/g, '. ');
    result = result.replace(/,\s+but\s+/g, '. However, ');

    // Add transitions
    const sentences = result.split(/\.\s+/);
    const processed = sentences.map((sent, i) => {
        if (i > 0 && Math.random() < 0.3) {
            const transitions = ['Also', 'Plus', 'Additionally'];
            return transitions[Math.floor(Math.random() * transitions.length)] + ', ' + sent.toLowerCase();
        }
        return sent;
    });

    return processed.join('. ');
}

/**
 * Add contractions strongly
 */
function addContractionsStrong(text: string): string {
    let result = text;

    const contractions: Record<string, string> = {
        'do not': "don't",
        'does not': "doesn't",
        'did not': "didn't",
        'is not': "isn't",
        'are not': "aren't",
        'was not': "wasn't",
        'were not': "weren't",
        'have not': "haven't",
        'has not': "hasn't",
        'had not': "hadn't",
        'will not': "won't",
        'would not': "wouldn't",
        'should not': "shouldn't",
        'cannot': "can't",
        'could not': "couldn't",
        'it is': "it's",
        'that is': "that's",
        'I am': "I'm",
        'you are': "you're",
        'we are': "we're",
        'they are': "they're"
    };

    Object.entries(contractions).forEach(([full, contracted]) => {
        const regex = new RegExp(`\\b${full}\\b`, 'gi');
        result = result.replace(regex, contracted);
    });

    return result;
}
