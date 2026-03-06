/**
 * Voice-Clone Dictionary - Linguistic Fingerprinting Engine
 * Uses vector-based stylometry to capture brand voice DNA
 */

export interface StyleVector {
    // Syntactic metrics
    syntacticVariance: number;      // σ of sentence lengths
    avgSentenceLength: number;       // mean sentence length
    paragraphDensity: number;        // sentences per paragraph

    // Lexical metrics
    lexicalDensity: number;           // unique words / total words  
    hapaxRatio: number;               // words appearing once / total unique words
    avgWordLength: number;            // mean word length

    // Readability metrics
    fleschReading: number;            // Flesch Reading Ease (0-100, higher = easier)

    // Punctuation patterns
    commaFrequency: number;           // commas per 100 words
    questionRatio: number;            // questions / total sentences
    exclamationRatio: number;         // exclamations / total sentences
}

export interface VoiceProfile {
    id: string;
    name: string;
    vector: StyleVector;
    sampleTexts: string[];
    trainingDate: Date;
    accuracy: number; // 0-1 similarity score
}

export interface TrainingResult {
    profile: VoiceProfile;
    confidence: number;
    samplesAnalyzed: number;
    processingTime: number;
}

/**
 * Extract text from PDFs (client-side simulation)
 * In production, this would use pdf.js or similar
 */
export async function extractTextFromPDF(file: File): Promise<string> {
    // Simulated extraction - in real implementation, use pdf.js
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            // This is a placeholder - real implementation would parse PDF binary
            resolve(`Extracted text from ${file.name}. Sample content for analysis.`);
        };
        reader.readAsText(file);
    });
}

/**
 * Calculate syntactic variance (σ of sentence lengths)
 */
function calculateSyntacticVariance(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);

    if (lengths.length === 0) return 0;

    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / lengths.length;

    return Math.sqrt(variance);
}

/**
 * Calculate lexical density (unique content words / total words)
 */
function calculateLexicalDensity(text: string): number {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words.filter(w => w.length > 3)); // Filter out short words

    if (words.length === 0) return 0;

    return uniqueWords.size / words.length;
}

/**
 * Calculate hapax legomena ratio (words appearing once)
 */
function calculateHapaxRatio(text: string): number {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const wordCounts = new Map<string, number>();

    words.forEach(word => {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });

    const hapaxWords = Array.from(wordCounts.values()).filter(count => count === 1).length;
    const uniqueWords = wordCounts.size;

    if (uniqueWords === 0) return 0;

    return hapaxWords / uniqueWords;
}

/**
 * Calculate average sentence length
 */
function calculateAvgSentenceLength(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (sentences.length === 0) return 0;

    const totalWords = sentences.reduce((sum, s) => {
        return sum + s.trim().split(/\s+/).length;
    }, 0);

    return totalWords / sentences.length;
}

/**
 * Calculate average word length
 */
function calculateAvgWordLength(text: string): number {
    const words = text.split(/\s+/).filter(w => w.length > 0);

    if (words.length === 0) return 0;

    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    return totalChars / words.length;
}

/**
 * Calculate paragraph density (sentences per paragraph)
 */
function calculateParagraphDensity(text: string): number {
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (paragraphs.length === 0) return 0;

    return sentences.length / paragraphs.length;
}

/**
 * Calculate Flesch Reading Ease score
 * Formula: 206.835 - 1.015(total words/total sentences) - 84.6(total syllables/total words)
 */
function calculateFleschReading(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);

    if (sentences.length === 0 || words.length === 0) return 0;

    // Estimate syllables (simple approximation)
    const estimateSyllables = (word: string): number => {
        word = word.toLowerCase().replace(/[^a-z]/g, '');
        if (word.length <= 3) return 1;
        const vowels = word.match(/[aeiouy]+/g);
        return vowels ? vowels.length : 1;
    };

    const totalSyllables = words.reduce((sum, word) => sum + estimateSyllables(word), 0);
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = totalSyllables / words.length;

    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, score)); // Clamp between 0-100
}

/**
 * Calculate comma frequency (per 100 words)
 */
function calculateCommaFrequency(text: string): number {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const commas = (text.match(/,/g) || []).length;

    if (words.length === 0) return 0;

    return (commas / words.length) * 100;
}

/**
 * Calculate question ratio
 */
function calculateQuestionRatio(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const questions = (text.match(/\?/g) || []).length;

    if (sentences.length === 0) return 0;

    return questions / sentences.length;
}

/**
 * Calculate exclamation ratio
 */
function calculateExclamationRatio(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const exclamations = (text.match(/!/g) || []).length;

    if (sentences.length === 0) return 0;

    return exclamations / sentences.length;
}

/**
 * Extract enhanced style vector from text with 10 metrics
 */
export function extractStyleVector(text: string): StyleVector {
    return {
        syntacticVariance: calculateSyntacticVariance(text),
        avgSentenceLength: calculateAvgSentenceLength(text),
        paragraphDensity: calculateParagraphDensity(text),
        lexicalDensity: calculateLexicalDensity(text),
        hapaxRatio: calculateHapaxRatio(text),
        avgWordLength: calculateAvgWordLength(text),
        fleschReading: calculateFleschReading(text),
        commaFrequency: calculateCommaFrequency(text),
        questionRatio: calculateQuestionRatio(text),
        exclamationRatio: calculateExclamationRatio(text)
    };
}

/**
 * Calculate cosine similarity between two style vectors
 */
export function calculateSimilarity(v1: StyleVector, v2: StyleVector): number {
    // Convert to arrays for dot product calculation with all 10 metrics
    const vec1 = [
        v1.syntacticVariance,
        v1.avgSentenceLength,
        v1.paragraphDensity,
        v1.lexicalDensity,
        v1.hapaxRatio,
        v1.avgWordLength,
        v1.fleschReading,
        v1.commaFrequency,
        v1.questionRatio,
        v1.exclamationRatio
    ];

    const vec2 = [
        v2.syntacticVariance,
        v2.avgSentenceLength,
        v2.paragraphDensity,
        v2.lexicalDensity,
        v2.hapaxRatio,
        v2.avgWordLength,
        v2.fleschReading,
        v2.commaFrequency,
        v2.questionRatio,
        v2.exclamationRatio
    ];

    // Normalize vectors for better similarity comparison
    const normalize = (vec: number[]) => {
        const mag = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
        return mag === 0 ? vec : vec.map(v => v / mag);
    };

    const norm1 = normalize(vec1);
    const norm2 = normalize(vec2);

    // Dot product of normalized vectors
    const dotProduct = norm1.reduce((sum, val, i) => sum + val * norm2[i], 0);

    // Return similarity score (0-1)
    return Math.max(0, Math.min(1, dotProduct));
}

/**
 * Train voice profile from multiple text samples
 */
export async function trainVoiceProfile(
    name: string,
    texts: string[]
): Promise<TrainingResult> {
    const startTime = Date.now();

    // Extract vectors from all samples
    const vectors = texts.map(text => extractStyleVector(text));

    // Average all vectors to create profile
    const avgVector: StyleVector = {
        syntacticVariance: vectors.reduce((sum, v) => sum + v.syntacticVariance, 0) / vectors.length,
        avgSentenceLength: vectors.reduce((sum, v) => sum + v.avgSentenceLength, 0) / vectors.length,
        paragraphDensity: vectors.reduce((sum, v) => sum + v.paragraphDensity, 0) / vectors.length,
        lexicalDensity: vectors.reduce((sum, v) => sum + v.lexicalDensity, 0) / vectors.length,
        hapaxRatio: vectors.reduce((sum, v) => sum + v.hapaxRatio, 0) / vectors.length,
        avgWordLength: vectors.reduce((sum, v) => sum + v.avgWordLength, 0) / vectors.length,
        fleschReading: vectors.reduce((sum, v) => sum + v.fleschReading, 0) / vectors.length,
        commaFrequency: vectors.reduce((sum, v) => sum + v.commaFrequency, 0) / vectors.length,
        questionRatio: vectors.reduce((sum, v) => sum + v.questionRatio, 0) / vectors.length,
        exclamationRatio: vectors.reduce((sum, v) => sum + v.exclamationRatio, 0) / vectors.length
    };

    // Calculate confidence (consistency across samples)
    const similarities = vectors.map(v => calculateSimilarity(v, avgVector));
    const confidence = similarities.reduce((a, b) => a + b, 0) / similarities.length;

    const profile: VoiceProfile = {
        id: `voice-${Date.now()}`,
        name,
        vector: avgVector,
        sampleTexts: texts,
        trainingDate: new Date(),
        accuracy: confidence
    };

    return {
        profile,
        confidence,
        samplesAnalyzed: texts.length,
        processingTime: Date.now() - startTime
    };
}

/**
 * Match text against voice profile
 */
export function matchTextToProfile(text: string, profile: VoiceProfile): {
    similarity: number;
    match: 'excellent' | 'good' | 'fair' | 'poor';
    recommendations: string[];
} {
    const textVector = extractStyleVector(text);
    const similarity = calculateSimilarity(textVector, profile.vector);

    let match: 'excellent' | 'good' | 'fair' | 'poor';
    if (similarity >= 0.9) match = 'excellent';
    else if (similarity >= 0.75) match = 'good';
    else if (similarity >= 0.6) match = 'fair';
    else match = 'poor';

    const recommendations: string[] = [];

    // Generate recommendations based on differences
    const diff = {
        syntactic: Math.abs(textVector.syntacticVariance - profile.vector.syntacticVariance),
        lexical: Math.abs(textVector.lexicalDensity - profile.vector.lexicalDensity),
        hapax: Math.abs(textVector.hapaxRatio - profile.vector.hapaxRatio)
    };

    if (diff.syntactic > 2) {
        recommendations.push(textVector.syntacticVariance > profile.vector.syntacticVariance
            ? "Try using more consistent sentence lengths"
            : "Vary your sentence structure more");
    }

    if (diff.lexical > 0.1) {
        recommendations.push(textVector.lexicalDensity > profile.vector.lexicalDensity
            ? "Simplify vocabulary to match brand voice"
            : "Use more diverse vocabulary");
    }

    if (diff.hapax > 0.15) {
        recommendations.push("Adjust use of unique words to match brand style");
    }

    return {
        similarity,
        match,
        recommendations
    };
}
