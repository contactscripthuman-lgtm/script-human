/**
 * Tone Analysis System
 * Analyzes formality, technicality, and emotional tone of text
 */

export interface ToneAnalysis {
    formality: number; // 0-100 (0=very casual, 100=very formal)
    technicality: number; // 0-100 (0=general, 100=highly technical)
    emotion: number; // 0-100 (0=neutral, 100=highly emotional)
    characteristics: string[];
}

/**
 * Analyze the tone of text
 */
export function analyzeTone(text: string): ToneAnalysis {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/);
    const lowerText = text.toLowerCase();

    let formalityScore = 50; // Start neutral
    let technicalityScore = 0;
    let emotionScore = 0;
    const characteristics: string[] = [];

    // === FORMALITY ANALYSIS ===

    // Contractions reduce formality
    const contractionCount = (text.match(/n't|'s|'re|'ve|'d|'ll|'m/g) || []).length;
    const contractionRatio = contractionCount / words.length;
    if (contractionRatio > 0.05) {
        formalityScore -= 20;
        characteristics.push('Casual contractions');
    } else if (contractionRatio === 0 && words.length > 50) {
        formalityScore += 15;
        characteristics.push('No contractions');
    }

    // Casual markers
    const casualMarkers = ['yeah', 'nah', 'gonna', 'wanna', 'kinda', 'sorta', 'stuff', 'things', 'pretty much'];
    const casualCount = casualMarkers.filter(m => lowerText.includes(m)).length;
    if (casualCount > 0) {
        formalityScore -= casualCount * 10;
        characteristics.push('Casual language');
    }

    // Formal transitions increase formality
    const formalTransitions = ['furthermore', 'moreover', 'nevertheless', 'consequently', 'thus', 'hence'];
    const formalCount = formalTransitions.filter(t => lowerText.includes(t)).length;
    if (formalCount > 0) {
        formalityScore += formalCount * 5;
        characteristics.push('Formal transitions');
    }

    // Passive voice increases formality
    const passiveMarkers = ['is being', 'was being', 'has been', 'had been', 'will be'];
    const passiveCount = passiveMarkers.filter(p => lowerText.includes(p)).length;
    if (passiveCount > 2) {
        formalityScore += 10;
        characteristics.push('Passive voice');
    }

    // Long sentences increase formality
    const avgSentenceLength = words.length / sentences.length;
    if (avgSentenceLength > 25) {
        formalityScore += 10;
        characteristics.push('Long sentences');
    } else if (avgSentenceLength < 12) {
        formalityScore -= 10;
        characteristics.push('Short sentences');
    }

    // === TECHNICALITY ANALYSIS ===

    // Technical jargon
    const technicalTerms = [
        'algorithm', 'API', 'database', 'server', 'protocol', 'encryption',
        'authentication', 'deployment', 'architecture', 'framework', 'library',
        'bandwidth', 'latency', 'throughput', 'scalability', 'optimization'
    ];
    const techCount = technicalTerms.filter(t => lowerText.includes(t)).length;
    technicalityScore += techCount * 5;

    // Code snippets
    if (text.match(/```|function|class|const|import|export/)) {
        technicalityScore += 30;
        characteristics.push('Contains code');
    }

    // Acronyms
    const acronymCount = (text.match(/\b[A-Z]{2,}\b/g) || []).length;
    technicalityScore += Math.min(20, acronymCount * 2);

    // === EMOTION ANALYSIS ===

    // Exclamation marks
    const exclamationCount = (text.match(/!/g) || []).length;
    emotionScore += Math.min(30, exclamationCount * 10);
    if (exclamationCount > 0) {
        characteristics.push('Exclamatory');
    }

    // Emotional words
    const emotionalWords = [
        'love', 'hate', 'amazing', 'terrible', 'wonderful', 'awful',
        'excited', 'furious', 'thrilled', 'devastated', 'ecstatic', 'miserable'
    ];
    const emotionCount = emotionalWords.filter(e => lowerText.includes(e)).length;
    emotionScore += emotionCount * 8;

    // Question marks (curiosity/engagement)
    const questionCount = (text.match(/\?/g) || []).length;
    if (questionCount > 0) {
        emotionScore += Math.min(15, questionCount * 5);
        characteristics.push('Questioning');
    }

    // All caps words (strong emotion)
    const capsWords = (text.match(/\b[A-Z]{4,}\b/g) || []).length;
    if (capsWords > 0) {
        emotionScore += capsWords * 15;
        characteristics.push('Emphatic capitals');
    }

    // Clamp scores
    formalityScore = Math.max(0, Math.min(100, formalityScore));
    technicalityScore = Math.max(0, Math.min(100, technicalityScore));
    emotionScore = Math.max(0, Math.min(100, emotionScore));

    return {
        formality: Math.round(formalityScore),
        technicality: Math.round(technicalityScore),
        emotion: Math.round(emotionScore),
        characteristics
    };
}

/**
 * Get tone descriptor
 */
export function getToneDescriptor(tone: ToneAnalysis): string {
    const { formality, technicality, emotion } = tone;

    if (technicality > 60) return 'Technical';
    if (formality > 70 && emotion < 30) return 'Formal';
    if (formality < 30 && emotion > 50) return 'Casual & Emotional';
    if (formality < 40) return 'Casual';
    if (formality > 60) return 'Professional';

    return 'Balanced';
}
