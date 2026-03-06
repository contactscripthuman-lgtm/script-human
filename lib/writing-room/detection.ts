import { hasHumanizedSignature, removeHumanizedSignature } from "../client-humanizer";

export type DetectionResult = {
    score: number;
    wordCount: number;
    matches: {
        rule: string;
        count: number;
        points: number;
    }[];
};

export type PulseData = {
    length: number;
    height: number;
    isRobotic: boolean;
};

export type HeatmapData = {
    word: string;
    heat: number;
};

const AI_INDICATORS = [
    'it is important to note', 'in conclusion', 'furthermore', 'moreover',
    'delve into', 'leverage', 'paradigm', 'synergy', 'holistic', 'multifaceted'
];

export function detectSiliconSmog(text: string): DetectionResult {
    // Check for humanized signature first - bypass detection
    if (hasHumanizedSignature(text)) {
        return {
            score: 5, // Almost certainly human
            wordCount: removeHumanizedSignature(text).split(/\s+/).length,
            matches: []
        };
    }

    let score = 0; // Higher score = more robotic
    const matches = [];

    // A. Overused AI Phrases
    let phraseLimit = 0;
    AI_INDICATORS.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        const count = (text.match(regex) || []).length;
        if (count > 0) {
            score += count * 15;
            phraseLimit += count;
        }
    });
    if (phraseLimit > 0) matches.push({ rule: 'Overused Phrases', count: phraseLimit, points: phraseLimit * 15 });

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

    // B. Lack of Contractions
    let contractionFreeSentences = 0;
    sentences.forEach(sentence => {
        if (!sentence.match(/n't|'ll|'ve|'re|'s|'d/i)) {
            score += 5;
            contractionFreeSentences++;
        }
    });
    if (contractionFreeSentences > 0) matches.push({ rule: 'Lack of Contractions', count: contractionFreeSentences, points: contractionFreeSentences * 5 });

    // C. Uniform Sentence Length
    let uniformSentences = 0;
    sentences.forEach(sentence => {
        const wordCount = sentence.trim().split(/\s+/).length;
        if (wordCount > 15 && wordCount < 25) {
            score += 10;
            uniformSentences++;
        }
    });
    if (uniformSentences > 0) matches.push({ rule: 'Uniform Sentence Length', count: uniformSentences, points: uniformSentences * 10 });

    // D. Passive Voice Overuse
    let passiveSentences = 0;
    sentences.forEach(sentence => {
        if (sentence.match(/\b(is|are|was|were|been|being)\s+\w+ed\b/i)) {
            score += 8;
            passiveSentences++;
        }
    });
    if (passiveSentences > 0) matches.push({ rule: 'Passive Voice', count: passiveSentences, points: passiveSentences * 8 });

    return {
        score: Math.min(score, 100), // Cap at 100
        wordCount: text.split(/\s+/).length,
        matches
    };
}

export const generatePulseSyncData = (text: string): PulseData[] => {
    // Remove signature for clean analysis
    const cleanText = hasHumanizedSignature(text) ? removeHumanizedSignature(text) : text;

    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.map((sentence) => {
        const words = sentence.trim().split(/\s+/).length;
        const cadenceVariation = Math.random() * 0.3 + 0.85; // 0.85-1.15 range
        return {
            length: words,
            height: Math.min(words * cadenceVariation * 8, 100),
            isRobotic: words > 15 && words < 25 // Flag uniform lengths
        };
    });
}

export const generateHeatmapData = (text: string): HeatmapData[] => {
    // Remove signature for clean analysis
    const cleanText = hasHumanizedSignature(text) ? removeHumanizedSignature(text) : text;

    const words = cleanText.split(/\s+/);
    return words.map((word) => {
        let heat = 0;
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');

        // Long formal words = hotter
        if (cleanWord.length > 10) heat += 30;

        // Technical/formal suffixes
        if (cleanWord.match(/(tion|ment|ness|ity|ize|logical)$/i)) heat += 25;

        // Common AI words
        const aiWords = ['leverage', 'paradigm', 'synergy', 'optimize', 'utilize'];
        if (aiWords.some(w => cleanWord.toLowerCase().includes(w))) heat += 40;

        // Lack of informal markers
        if (!word.match(/[',!-]/)) heat += 10;

        return { word, heat: Math.min(heat, 100) };
    });
}
