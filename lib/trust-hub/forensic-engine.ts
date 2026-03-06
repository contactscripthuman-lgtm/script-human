import {
    AuthenticityLayer,
    QualityLayer,
    OriginalityLayer,
    CredibilityLayer,
    ForensicAnalysisResult,
    RiskLevel,
    ContentMetadata,
    ContentIssue
} from "./types";
import crypto from "crypto";
import { COMMON_WORDS } from "./common-words";

/**
 * MULTI-SECTION FORENSIC ALGORITHM
 * Detects strategic variance tricks by analyzing intro, body, conclusion separately
 */
export function analyzeAuthenticity(content: string, metadata: ContentMetadata): AuthenticityLayer {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const lowerWords = words.map(w => w.toLowerCase());
    const lowerContent = content.toLowerCase();

    let aiLikelihood = 0;

    // ===== MULTI-SECTION SDSL ANALYSIS (CATCHES GEMINI'S TRICK) =====

    // Overall SDSL (for reference)
    const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / sentenceLengths.length;
    const sdsl = Math.sqrt(variance);
    const burstiness = Math.min(20, sdsl * 1.5);

    // CRITICAL: Analyze text in sections to detect "fake variance"
    if (sentences.length >= 10) {
        const third = Math.floor(sentences.length / 3);
        const intro = sentenceLengths.slice(0, third);
        const body = sentenceLengths.slice(third, third * 2);
        const conclusion = sentenceLengths.slice(third * 2);

        // Calculate SDSL for each section
        const calcSDSL = (arr: number[]) => {
            const m = arr.reduce((a, b) => a + b, 0) / arr.length;
            const v = arr.reduce((acc, len) => acc + Math.pow(len - m, 2), 0) / arr.length;
            return Math.sqrt(v);
        };

        const introSDSL = calcSDSL(intro);
        const bodySDSL = calcSDSL(body);
        const conclusionSDSL = calcSDSL(conclusion);

        // GEMINI DETECTION: High intro SDSL but low body SDSL = strategic variance
        if (introSDSL > 7 && bodySDSL < 5) {
            aiLikelihood += 50; // CAUGHT THE TRICK!
        } else if (introSDSL > 6 && bodySDSL < 4) {
            aiLikelihood += 60; // VERY suspicious pattern
        }

        // If body is very uniform, that's what matters most
        if (bodySDSL < 3.0) {
            aiLikelihood += 65; // Body is VERY uniform
        } else if (bodySDSL < 4.0) {
            aiLikelihood += 55;
        } else if (bodySDSL < 5.0) {
            aiLikelihood += 45;
        } else if (bodySDSL < 6.0) {
            aiLikelihood += 30;
        }
    } else {
        // Short content: use overall SDSL with ULTRA-AGGRESSIVE thresholds
        if (sdsl < 3.0) {
            aiLikelihood += 70;
        } else if (sdsl < 4.0) {
            aiLikelihood += 60;
        } else if (sdsl < 5.0) {
            aiLikelihood += 50;
        } else if (sdsl < 6.0) {
            aiLikelihood += 35;
        } else if (sdsl < 7.0) {
            aiLikelihood += 15;
        } else if (sdsl >= 9.0) {
            aiLikelihood -= 25;
        } else if (sdsl >= 11.0) {
            aiLikelihood -= 30;
        }
    }

    // Additional variance checks
    if (variance < 10) {
        aiLikelihood += 20; // Too consistent overall
    } else if (variance > 50) {
        aiLikelihood -= 10; // Very chaotic (human)
    }

    // Sentence Length Extremes
    const veryShort = sentenceLengths.filter(l => l < 5).length;
    const veryLong = sentenceLengths.filter(l => l > 30).length;
    const extremeRatio = (veryShort + veryLong) / sentences.length;

    if (extremeRatio === 0 && sentences.length > 8) {
        aiLikelihood += 20;
    } else if (extremeRatio > 0.3) {
        aiLikelihood -= 15;
    }

    // ===== SILICON SMOG FILTER (EXPANDED FROM SAMPLES) =====

    const aiPhrases = [
        // Classic LLM phrases
        "delve into", "tapestry", "multifaceted", "furthermore", "moreover",
        "it's important to note", "it's worth noting", "in today's digital age",
        "in conclusion", "to summarize", "first and foremost", "cutting-edge",
        "game-changer", "revolutionize", "paradigm shift", "holistic approach",
        "embark on a journey", "sphere of", "intricate dance", "beacon of",
        "testament to", "landscape of", "realm of", "fabric of",
        "cornerstone of", "plethora of", "myriad of", "vast array",
        "it is essential", "it is crucial", "one must", "one should",
        "serves as a", "plays a pivotal role", "underscores the importance",
        "sheds light on", "brings to light", "paves the way",
        "as an AI", "I don't have personal", "I apologize",
        "certainly", "absolutely", "indeed", "albeit",
        "comprehensive analysis", "in-depth exploration", "nuanced understanding",
        "leveraging", "harnessing", "optimizing", "streamlining",
        "seamlessly integrate", "robust framework", "scalable solution",
        "navigate the complexities", "at the end of the day", "move the needle",
        "deep dive", "unpack", "let's explore", "key takeaway",

        // CLAUDE-SPECIFIC (from actual sample)
        "characterized by", "marked by", "unprecedented complexity",
        "emergence of", "strategic competition", "manifested in",
        "fundamental reassessment", "renaissance", "persistent instability",
        "growing assertiveness", "increasingly", "essential to",

        // GEMINI-SPECIFIC (from actual sample)
        "fragmented frontier", "geopolit", "brinkmanship",
        "managed confrontation", "sovereign", "extraterritorial",
        "cognitive power", "hybrid conflict", "at a crossroads",
        "recalibration", "muscular", "interventionism",

        // PERPLEXITY-SPECIFIC (from actual sample)
        "multi-aligned", "de-risking", "near-shoring", "friend-shoring",
        "non-state actors", "systemic rival", "main axis",

        // CHATGPT-SPECIFIC (from actual sample)
        "refers to", "shaped by", "plays a crucial role",
        "emerged as", "remains a central", "historically",
        "increasingly used", "reflects", "priorities"
    ];

    const aiPatterns: string[] = [];
    aiPhrases.forEach(phrase => {
        if (lowerContent.includes(phrase)) aiPatterns.push(phrase);
    });

    // ULTRA-HEAVY PENALTIES
    if (aiPatterns.length >= 12) aiLikelihood += 75;
    else if (aiPatterns.length >= 10) aiLikelihood += 70;
    else if (aiPatterns.length >= 8) aiLikelihood += 60;
    else if (aiPatterns.length >= 6) aiLikelihood += 50;
    else if (aiPatterns.length >= 5) aiLikelihood += 45;
    else if (aiPatterns.length >= 4) aiLikelihood += 40;
    else if (aiPatterns.length >= 3) aiLikelihood += 30;
    else if (aiPatterns.length >= 2) aiLikelihood += 20;
    else if (aiPatterns.length === 1) aiLikelihood += 10;

    // ===== VOCABULARY & PREDICTABILITY =====

    // Type-Token Ratio
    const uniqueWords = new Set(lowerWords);
    const ttr = uniqueWords.size / lowerWords.length;

    if (ttr < 0.40) aiLikelihood += 30;
    else if (ttr < 0.48) aiLikelihood += 25;
    else if (ttr < 0.55) aiLikelihood += 18;
    else if (ttr < 0.62) aiLikelihood += 10;
    else if (ttr >= 0.70) aiLikelihood -= 15;

    // Word Length Consistency
    const wordLengths = lowerWords.map(w => w.replace(/[^a-z]/g, '').length).filter(l => l > 0);
    const avgWordLen = wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length;
    const wordLenSD = Math.sqrt(wordLengths.reduce((acc, l) => acc + Math.pow(l - avgWordLen, 2), 0) / wordLengths.length);

    if (wordLenSD < 1.8) aiLikelihood += 20;
    else if (wordLenSD < 2.3) aiLikelihood += 12;
    else if (wordLenSD > 3.5) aiLikelihood -= 10;

    // ===== PATTERN DETECTION =====

    // Paragraph Consistency
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    const sentencesPerPara = paragraphs.map(p => p.split(/[.!?]+/).filter(s => s.trim().length > 0).length);

    if (paragraphs.length >= 3) {
        const avgSentencesPerPara = sentencesPerPara.reduce((a, b) => a + b, 0) / paragraphs.length;
        const paraVariance = sentencesPerPara.reduce((acc, count) =>
            acc + Math.pow(count - avgSentencesPerPara, 2), 0) / paragraphs.length;

        if (avgSentencesPerPara >= 2.5 && avgSentencesPerPara <= 5.5) {
            if (paraVariance < 0.3) aiLikelihood += 30;
            else if (paraVariance < 0.7) aiLikelihood += 22;
            else if (paraVariance < 1.5) aiLikelihood += 12;
        }
    }

    // Sentence Starter Repetition
    const starters = sentences.map(s => s.trim().split(/\s+/)[0]?.toLowerCase() || '');
    const starterCounts = new Map<string, number>();
    starters.forEach(s => starterCounts.set(s, (starterCounts.get(s) || 0) + 1));
    const maxRepeated = Math.max(...Array.from(starterCounts.values()));

    if (maxRepeated > sentences.length * 0.25) aiLikelihood += 25;
    else if (maxRepeated > sentences.length * 0.15) aiLikelihood += 15;

    // Formal Transitions
    const transitions = ["however", "therefore", "thus", "consequently", "additionally", "furthermore", "moreover", "nevertheless"];
    let transCount = 0;
    transitions.forEach(t => {
        transCount += (lowerContent.match(new RegExp(`\\b${t}\\b`, 'gi')) || []).length;
    });

    if (transCount / sentences.length > 0.15) aiLikelihood += 25;
    else if (transCount / sentences.length > 0.08) aiLikelihood += 15;

    // Perfect Grammar
    let grammarIssues = 0;
    grammarIssues += (content.match(/  +/g) || []).length;
    grammarIssues += (content.match(/[.!?]{2,}/g) || []).length;
    grammarIssues += (content.match(/\. [a-z]/g) || []).length;

    if (grammarIssues === 0 && words.length > 100) aiLikelihood += 25;
    else if (grammarIssues === 0 && words.length > 50) aiLikelihood += 15;

    // ===== AUTHENTICITY MARKERS (HUMAN CHAOS) =====

    // Contractions
    const contractions = (content.match(/\b(don't|can't|won't|it's|that's|i'm|you're|we're|they're|isn't|aren't|wasn't|weren't)\b/gi) || []).length;
    if (contractions / sentences.length > 0.20) aiLikelihood -= 15;
    else if (contractions / sentences.length > 0.10) aiLikelihood -= 8;

    // Exclamations
    const exclamations = (content.match(/!/g) || []).length;
    if (exclamations > 3 && exclamations / sentences.length > 0.12) aiLikelihood -= 12;

    // Questions
    const questions = (content.match(/\?/g) || []).length;
    if (questions > 2 && questions / sentences.length > 0.10) aiLikelihood -= 8;

    // ===== ADVANCED SCRIPTHUMAN METRICS (2026) =====

    // 1. SMOG DENSITY (Context-aware AI phrase detection)
    const wordCount = words.length;
    const smogDensity = (aiPatterns.length / Math.max(wordCount, 1)) * 100;

    // Apply density-based penalties (already applied above, this is for export)

    // 2. HEDGING FILTER (AI Safety Language)
    const hedgingPhrases = [
        "it's important to note", "it should be noted", "it's worth noting",
        "generally speaking", "on the other hand", "it's worth mentioning",
        "in most cases", "typically", " tends to", "may be", "could be",
        "arguably", "one might say", "it appears that", "it seems that",
        "in general", "as a rule", "for the most part", "by and large"
    ];

    let hedgingCount = 0;
    hedgingPhrases.forEach(phrase => {
        hedgingCount += (lowerContent.match(new RegExp(`\\b${phrase.replace(/'/g, "'")}\\ b`, 'gi')) || []).length;
    });

    const hedgingDensity = (hedgingCount / Math.max(wordCount, 1)) * 100;

    // Apply hedging penalties
    if (hedgingDensity > 3.0) aiLikelihood += 20;
    else if (hedgingDensity > 1.0) aiLikelihood += 10;

    // 3. LEXICAL RARENESS (Vocabulary Specificity)
    const cleanWords = Array.from(uniqueWords).filter(w =>
        w.length > 3 && /^[a-z]+$/.test(w)  // Only alphabetic words > 3 chars
    );
    const rareWords = cleanWords.filter(w => !COMMON_WORDS.has(w));
    const rareWordRatio = (rareWords.length / Math.max(cleanWords.length, 1)) * 100;

    // Apply rareness bonuses/penalties
    if (rareWordRatio > 30) aiLikelihood -= 15;      // High specificity
    else if (rareWordRatio > 20) aiLikelihood -= 8;
    else if (rareWordRatio < 10) aiLikelihood += 15; // Too generic

    // 4. STYLISTIC IDIOSYNCRASIES (Human Quirks, not "errors")
    let idiosyncrasies = 0;

    // Coordinator starts ("And," "But," "Or," at sentence start)
    const coordinatorStarts = (content.match(/[.!?]\s+(And|But|Or),/gi) || []).length;
    idiosyncrasies += coordinatorStarts;

    // Em-dashes (pairs)
    const emDashes = (content.match(/—[^—]+—/g) || []).length;
    idiosyncrasies += emDashes;

    // Multiple exclamations (!!+)
    const multiExclamations = (content.match(/!!+/g) || []).length;
    idiosyncrasies += multiExclamations;

    // Parenthetical asides (meaningful content, not just single words)
    const parentheticals = (content.match(/\([^)]{10,}\)/g) || []).length;
    idiosyncrasies += parentheticals;

    // Sentence fragments (already counted in extremes, but good to track)
    // (Already handled via fragment detection above)

    // Apply idiosyncrasies bonuses/penalties
    if (idiosyncrasies >= 2 && idiosyncrasies <= 5) {
        aiLikelihood -= 10;  // Human stylistic choices
    } else if (idiosyncrasies === 0 && words.length > 100) {
        aiLikelihood += 15;  // Too perfect = AI
    } else if (idiosyncrasies > 8) {
        // Too many might be trying too hard, slight penalty
        aiLikelihood += 5;
    }

    // Cap at 0-100 (AFTER all adjustments)
    aiLikelihood = Math.min(100, Math.max(0, aiLikelihood));

    return {
        score: Math.round(100 - aiLikelihood),
        aiLikelihood,
        sdsl,
        burstiness,
        aiPatterns,
        metadataScore: 0,
        confidence: 100,

        // Advanced Scripthuman Metrics
        smogDensity: Math.round(smogDensity * 100) / 100,
        hedgingScore: hedgingCount,
        rareWordRatio: Math.round(rareWordRatio * 100) / 100,
        stylisticIdiosyncrasies: idiosyncrasies
    };
}

export function analyzeQuality(content: string): QualityLayer {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    const fleschScore = Math.max(0, Math.min(100,
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
    ));
    const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    let grammarIssues = 0;
    grammarIssues += (content.match(/  +/g) || []).length;
    grammarIssues += (content.match(/[.!?]{2,}/g) || []).length;
    grammarIssues += (content.match(/\. [a-z]/g) || []).length;

    let perfectnessScore = 100;
    if (grammarIssues === 0 && words.length > 100) perfectnessScore = 70;

    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    const avgSentencesPerPara = sentences.length / Math.max(1, paragraphs.length);
    const structureScore = avgSentencesPerPara > 2 && avgSentencesPerPara < 8 ? 100 : 70;

    const active = content.match(/\b(I|we|you|they|he|she)\s+(am|are|is|was|were|have|had|do|does|did)/gi) || [];
    const passive = content.match(/\b(is|was|were|are|been|be)\s+\w+ed\b/gi) || [];
    const engagementScore = Math.min(100, (active.length / Math.max(1, passive.length)) * 50 + 50);

    const score = Math.round(
        fleschScore * 0.3 +
        perfectnessScore * 0.3 +
        structureScore * 0.2 +
        engagementScore * 0.2
    );

    return {
        score,
        readabilityScore: Math.round(fleschScore),
        gradeLevel: Math.round(gradeLevel * 10) / 10,
        grammarIssues,
        structureScore,
        engagementScore: Math.round(engagementScore),
        confidence: 100
    };
}

function countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;

    const vowels = 'aeiouy';
    let count = 0;
    let prevWasVowel = false;

    for (let i = 0; i < word.length; i++) {
        const isVowel = vowels.includes(word[i]);
        if (isVowel && !prevWasVowel) count++;
        prevWasVowel = isVowel;
    }

    if (word.endsWith('e')) count--;
    return Math.max(1, count);
}

export function analyzeOriginality(content: string): OriginalityLayer {
    const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words);
    const uniquenessScore = Math.round((uniqueWords.size / words.length) * 100);

    const cliches = [
        "at the end of the day", "think outside the box", "low-hanging fruit",
        "move the needle", "circle back", "touch base", "synergy",
        "paradigm shift", "game changer", "best practice", "win-win",
        "at this point in time", "each and every", "few and far between",
        "for all intents and purposes", "in the final analysis", "last but not least"
    ];

    let clicheCount = 0;
    const lowerContent = content.toLowerCase();
    cliches.forEach(c => { if (lowerContent.includes(c)) clicheCount++; });

    const phrases = [];
    for (let i = 0; i < words.length - 2; i++) {
        phrases.push(words.slice(i, i + 3).join(' '));
    }
    const phraseCount = new Map();
    phrases.forEach(p => phraseCount.set(p, (phraseCount.get(p) || 0) + 1));
    const repetitions = Array.from(phraseCount.values()).filter(c => c > 1).length;
    const repetitionScore = Math.max(0, 100 - repetitions * 5);

    const questions = (content.match(/\?/g) || []).length;
    const freshInsights = questions > 0 && uniquenessScore > 40;

    const score = Math.round(
        uniquenessScore * 0.5 +
        Math.max(0, 100 - clicheCount * 15) * 0.3 +
        repetitionScore * 0.2
    );

    return {
        score: Math.max(0, score),
        uniquenessScore,
        clicheCount,
        freshInsights,
        repetitionScore,
        confidence: 100
    };
}

export function analyzeCredibility(content: string, metadata: ContentMetadata): CredibilityLayer {
    const citationPatterns = [
        /\[\d+\]/g,
        /\(\w+,?\s+\d{4}\)/g,
        /according to/gi,
        /research shows/gi,
        /studies indicate/gi
    ];

    const citationsPresent = citationPatterns.some(p => p.test(content));

    const claimWords = ["research", "study", "data", "statistics", "survey", "expert", "scientists"];
    let factCheckSignals = 0;
    claimWords.forEach(w => {
        factCheckSignals += (content.match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
    });

    const biasWords = [
        "obviously", "clearly", "undeniably", "without a doubt", "everyone knows",
        "always", "never", "must", "should", "terrible", "amazing", "perfect",
        "utterly", "completely", "absolutely", "totally"
    ];
    let biasIndicators = 0;
    biasWords.forEach(w => {
        biasIndicators += (content.match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
    });

    const score = Math.round(
        (citationsPresent ? 50 : 30) +
        Math.max(0, 30 - biasIndicators * 3) +
        Math.max(0, 20 - factCheckSignals * 2)
    );

    return {
        score,
        citationsPresent,
        factCheckSignals,
        biasIndicators,
        sourceQuality: 50,
        confidence: 100
    };
}

export function generateContentHash(content: string): string {
    return crypto.createHash("sha256").update(content).digest("hex");
}

export function classifyRiskLevel(score: number): RiskLevel {
    if (score >= 85) return "minimal";
    if (score >= 70) return "low";
    if (score >= 50) return "medium";
    if (score >= 30) return "high";
    return "critical";
}

import type { Recommendation } from "./types";

export function generateRecommendations(result: ForensicAnalysisResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // --- Authenticity (Critical Impact) ---
    if (result.layers.authenticity.aiLikelihood > 60) {
        recommendations.push({
            text: `High AI Likelihood (${result.layers.authenticity.aiLikelihood}%) detected.`,
            type: "Critical",
            impactPoints: 25,
            category: "Authenticity"
        });
    }

    if (result.layers.authenticity.aiPatterns.length > 5) {
        recommendations.push({
            text: `Remove ${result.layers.authenticity.aiPatterns.length} detected AI phrases (e.g., "${result.layers.authenticity.aiPatterns.slice(0, 3).join('", "')}").`,
            type: "Major",
            impactPoints: 20,
            category: "Authenticity"
        });
    }

    if (result.layers.authenticity.sdsl < 6) {
        recommendations.push({
            text: `Increase sentence variance (SDSL ${result.layers.authenticity.sdsl.toFixed(2)} is too low). Mix short (5-8 words) and long (30+ words) sentences.`,
            type: "Critical",
            impactPoints: 20,
            category: "Authenticity"
        });
    }

    // New: Perfect Grammar Check
    if (result.layers.quality.grammarIssues === 0 && result.metrics.wordCount > 100) {
        recommendations.push({
            text: "Content is too perfect. Add 2-3 natural imperfections (colloquialisms, fragments) to lower AI score.",
            type: "Major",
            impactPoints: 15,
            category: "Authenticity"
        });
    }

    // New: Formal Transitions Check
    const formalWords = ["however", "therefore", "furthermore", "moreover", "consequently"];
    const hasFormalTransitions = result.layers.authenticity.aiPatterns.some(p => formalWords.some(fw => p.toLowerCase().includes(fw)));
    if (hasFormalTransitions) {
        recommendations.push({
            text: "Replace formal transitions (However, Therefore) with casual ones (But, So, Plus).",
            type: "Major",
            impactPoints: 12,
            category: "Authenticity"
        });
    }

    // --- Quality (Medium Impact) ---
    if (result.layers.quality.readabilityScore < 50) {
        recommendations.push({
            text: "Improve readability score (currently " + result.layers.quality.readabilityScore + "). Simplify complex sentence structures.",
            type: "Minor",
            impactPoints: 10,
            category: "Quality"
        });
    }

    // New: Paragraph Structure
    if (result.metrics.paragraphCount > 3) {
        // Simplified check: assume if SDSL is low, paragraph variance is likely low too
        // Ideal is to check actual para variance from analysis, but we don't return that directly in result.layers (it's internal).
        // relying on generic advice if Authenticity is low.
        if (result.layers.authenticity.score < 70) {
            recommendations.push({
                text: "Vary paragraph lengths. Mix 1-line paragraphs with longer 4-5 line blocks.",
                type: "Minor",
                impactPoints: 8,
                category: "Quality"
            });
        }
    }

    // --- Originality (Major Impact) ---
    if (result.layers.originality.uniquenessScore < 40) {
        recommendations.push({
            text: "Increase vocabulary diversity and reduce common cliches.",
            type: "Major",
            impactPoints: 15,
            category: "Originality"
        });
    }

    // New: Personal Voice
    if (result.layers.authenticity.score < 80) {
        recommendations.push({
            text: "Inject personal voice: I-statements, direct questions, or personal opinions.",
            type: "Minor",
            impactPoints: 8,
            category: "Originality"
        });
    }

    // --- Credibility (Major Impact) ---
    if (!result.layers.credibility.citationsPresent && result.layers.credibility.factCheckSignals > 3) {
        recommendations.push({
            text: "Add citations or sources for statistical claims.",
            type: "Major",
            impactPoints: 10,
            category: "Credibility"
        });
    }

    // Sort by impact (Critical first)
    return recommendations.sort((a, b) => b.impactPoints - a.impactPoints);
}

export function detectIssues(result: ForensicAnalysisResult): ContentIssue[] {
    const issues: ContentIssue[] = [];

    if (result.layers.authenticity.aiLikelihood > 70) {
        issues.push({
            type: "AI-Generated Content Detected",
            severity: "critical",
            location: "Overall content",
            description: `${result.layers.authenticity.aiLikelihood}% AI likelihood - very high probability of AI generation`
        });
    } else if (result.layers.authenticity.aiLikelihood > 50) {
        issues.push({
            type: "Possible AI Content",
            severity: "high",
            location: "Overall content",
            description: `${result.layers.authenticity.aiLikelihood}% AI likelihood - content shows AI characteristics`
        });
    }

    if (result.layers.authenticity.sdsl < 6) {
        issues.push({
            type: "Uniform Sentence Structure",
            severity: "critical",
            location: "Sentence patterns",
            description: `SDSL: ${result.layers.authenticity.sdsl.toFixed(2)} - sentences are extremely uniform (definite AI indicator)`
        });
    }

    return issues;
}

import type { HumanizationStep } from "./types";

/**
 * Generate actionable humanization guide to help users reach 75%+ score
 */
export function generateHumanizationGuide(result: ForensicAnalysisResult): HumanizationStep[] {
    const guide: HumanizationStep[] = [];
    const auth = result.layers.authenticity;

    // CRITICAL FIXES (These give the biggest score boost)

    if (auth.sdsl < 6) {
        guide.push({
            priority: "critical",
            action: "Add Sentence Variety (MOST IMPORTANT)",
            explanation: `Your SDSL is ${auth.sdsl.toFixed(2)} (too uniform). Mix short sentences (5-8 words) with long ones (25-35 words). Example: "Climate change is real. However, the comprehensive analysis of atmospheric carbon dioxide concentrations over the past century reveals a disturbing trend that scientists are still working to fully understand."`,
            impact: "+20-30 points"
        });
    }

    if (auth.aiPatterns.length >= 5) {
        guide.push({
            priority: "critical",
            action: `Remove ${auth.aiPatterns.length} AI Phrases`,
            explanation: `Replace these detected AI phrases with natural alternatives: "${auth.aiPatterns.slice(0, 5).join('", "')}". Example: Change "characterized by" to "has", "unprecedented" to "new", "growing assertiveness" to "more confident".`,
            impact: "+15-25 points"
        });
    }

    // HIGH PRIORITY FIXES

    if (result.layers.quality.grammarIssues === 0 && result.metrics.wordCount > 100) {
        guide.push({
            priority: "high",
            action: "Add Natural Imperfections",
            explanation: "Your content is TOO perfect. Add 2-3 minor variations: Use contractions (isn't, don't), add an exclamation point, include a question, or use informal phrasing. AI never makes small mistakes.",
            impact: "+10-15 points"
        });
    }

    if (auth.aiPatterns.some(p => p.includes("however") || p.includes("therefore") || p.includes("furthermore"))) {
        guide.push({
            priority: "high",
            action: "Replace Formal Transitions",
            explanation: 'Change: "However" → "But", "Therefore" → "So", "Furthermore" → "Also", "Moreover" → "Plus". Use casual connectors instead of academic ones.',
            impact: "+8-12 points"
        });
    }

    const contractions = (result.metrics.wordCount > 0) ? 0 : 0; // We'd need to recalculate, simplified for now
    guide.push({
        priority: "high",
        action: "Add Contractions & Informal Language",
        explanation: "Use: don't, can't, won't, it's, that's, you're instead of formal versions. Add phrases like \"I think\", \"honestly\", \"basically\", \"kind of\". HUMANS are casual!",
        impact: "+8-12 points"
    });

    // MEDIUM PRIORITY FIXES

    guide.push({
        priority: "medium",
        action: "Add Extreme Sentence Lengths",
        explanation: "Include at least 2 very short sentences (under 5 words) like \"Not anymore.\" or \"Here's why.\" AND 1-2 very long sentences (over 30 words) with multiple clauses.",
        impact: "+5-10 points"
    });

    guide.push({
        priority: "medium",
        action: "Vary Paragraph Structure",
        explanation: "Mix paragraph lengths: 1-2 sentences, then 4-5 sentences, then 3 sentences. AI uses consistent 3-4 sentence paragraphs. Humans vary wildly.",
        impact: "+5-10 points"
    });

    guide.push({
        priority: "medium",
        action: "Add Personal Voice",
        explanation: 'Include: Questions ("What does this mean?"), exclamations ("This is huge!"), personal observations ("I noticed that"), or direct address ("You might wonder"). Break the robotic tone.',
        impact: "+5-8 points"
    });

    return guide;
}


/**
 * MAIN ANALYSIS WITH ULTRA-AGGRESSIVE VETO
 */
export function analyzeContent(content: string, metadata: ContentMetadata = {}): ForensicAnalysisResult {
    const contentHash = generateContentHash(content);
    const timestamp = new Date().toISOString();

    const authenticity = analyzeAuthenticity(content, metadata);
    const quality = analyzeQuality(content);
    const originality = analyzeOriginality(content);
    const credibility = analyzeCredibility(content, metadata);

    // ULTRA-AGGRESSIVE VETO SYSTEM
    let overallTrustScore: number;

    if (authenticity.aiLikelihood >= 75) {
        overallTrustScore = Math.min(30, Math.round(
            authenticity.score * 0.60 +
            quality.score * 0.15 +
            originality.score * 0.15 +
            credibility.score * 0.10
        ));
    } else if (authenticity.aiLikelihood >= 60) {
        overallTrustScore = Math.min(45, Math.round(
            authenticity.score * 0.55 +
            quality.score * 0.20 +
            originality.score * 0.15 +
            credibility.score * 0.10
        ));
    } else if (authenticity.aiLikelihood >= 50) {
        overallTrustScore = Math.min(55, Math.round(
            authenticity.score * 0.50 +
            quality.score * 0.22 +
            originality.score * 0.15 +
            credibility.score * 0.13
        ));
    } else if (authenticity.aiLikelihood >= 40) {
        overallTrustScore = Math.min(65, Math.round(
            authenticity.score * 0.45 +
            quality.score * 0.28 +
            originality.score * 0.15 +
            credibility.score * 0.12
        ));
    } else if (authenticity.aiLikelihood >= 25) {
        overallTrustScore = Math.min(75, Math.round(
            authenticity.score * 0.40 +
            quality.score * 0.32 +
            originality.score * 0.16 +
            credibility.score * 0.12
        ));
    } else {
        overallTrustScore = Math.round(
            authenticity.score * 0.35 +
            quality.score * 0.35 +
            originality.score * 0.18 +
            credibility.score * 0.12
        );
    }

    const riskLevel = classifyRiskLevel(overallTrustScore);

    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);

    const result: ForensicAnalysisResult = {
        contentHash,
        timestamp,
        overallTrustScore,
        riskLevel,
        layers: {
            authenticity,
            quality,
            originality,
            credibility
        },
        metrics: {
            wordCount: words.length,
            sentenceCount: sentences.length,
            paragraphCount: paragraphs.length,
            avgWordsPerSentence: Math.round(words.length / sentences.length * 10) / 10
        },
        issues: [],
        recommendations: [],
        humanizationGuide: []
    };

    result.issues = detectIssues(result);
    result.recommendations = generateRecommendations(result);
    result.humanizationGuide = generateHumanizationGuide(result);

    return result;
}
