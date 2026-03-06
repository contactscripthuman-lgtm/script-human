/**
 * FORENSIC-GRADE HUMANIZATION ENGINE
 * Reverse-engineered from Trust Hub's AI detection patterns
 * GOAL: Guarantee >75% Trust Hub scores by actively avoiding ALL AI fingerprints
 */

export type Mood = "professional" | "casual" | "friendly" | "academic" | "storytelling";

// ============================================
// AI PHRASE DATABASE (Imported from Trust Hub)
// ============================================

const FORBIDDEN_AI_PHRASES: Record<string, string[]> = {
    // Classic LLM phrases
    "delve into": ["explore", "look at", "examine", "dig into", "investigate"],
    "tapestry": ["mix", "blend", "combination", "variety"],
    "multifaceted": ["complex", "layered", "many-sided", "varied"],
    "furthermore": ["and", "plus", "also", "besides"],
    "moreover": ["and", "plus", "also", "what's more"],
    "it's important to note": ["note that", "remember", "keep in mind"],
    "it's worth noting": ["notably", "interestingly", "worth mentioning"],
    "in today's digital age": ["today", "now", "these days"],
    "in conclusion": ["finally", "to wrap up", "in short"],
    "to summarize": ["in short", "simply put", "basically"],
    "first and foremost": ["first", "mainly", "primarily"],
    "cutting-edge": ["latest", "newest", "modern", "advanced"],
    "game-changer": ["major shift", "big deal", "breakthrough"],
    "revolutionize": ["transform", "change", "reshape"],
    "paradigm shift": ["major change", "big shift", "transformation"],
    "holistic approach": ["complete approach", "full approach", "comprehensive method"],
    "embark on a journey": ["start", "begin", "get into"],
    "sphere of": ["area of", "field of", "world of"],
    "intricate dance": ["complex interaction", "interplay", "relationship"],
    "beacon of": ["symbol of", "example of", "sign of"],
    "testament to": ["proof of", "sign of", "evidence of"],
    "landscape of": ["world of", "field of", "area of"],
    "realm of": ["world of", "field of", "area of"],
    "fabric of": ["structure of", "makeup of", "essence of"],
    "cornerstone of": ["foundation of", "basis of", "key to"],
    "plethora of": ["many", "lots of", "plenty of"],
    "myriad of": ["many", "countless", "numerous"],
    "vast array": ["many", "wide range", "variety"],
    "it is essential": ["it's key", "it's critical", "you need to"],
    "it is crucial": ["it's vital", "it's critical", "it's key"],
    "one must": ["you should", "you need to", "it's important to"],
    "one should": ["you should", "you could", "it helps to"],
    "serves as a": ["acts as", "works as", "is"],
    "plays a pivotal role": ["is key", "is crucial", "matters"],
    "underscores the importance": ["shows why", "highlights", "emphasizes"],
    "sheds light on": ["reveals", "shows", "clarifies"],
    "brings to light": ["reveals", "uncovers", "shows"],
    "paves the way": ["enables", "opens up", "makes possible"],
    "comprehensive analysis": ["full analysis", "complete review", "thorough look"],
    "in-depth exploration": ["detailed look", "close examination", "deep dive"],
    "nuanced understanding": ["subtle grasp", "detailed insight", "complex view"],
    "leveraging": ["using", "tapping into", "applying"],
    "harnessing": ["using", "tapping", "utilizing"],
    "optimizing": ["improving", "enhancing", "maximizing"],
    "streamlining": ["simplifying", "improving", "making easier"],
    "seamlessly integrate": ["blend in", "fit together", "combine"],
    "robust framework": ["strong structure", "solid system", "effective model"],
    "scalable solution": ["flexible fix", "adaptable approach", "expandable system"],
    "navigate the complexities": ["deal with", "handle", "work through"],
    "at the end of the day": ["ultimately", "in the end", "basically"],
    "move the needle": ["make progress", "create change", "have impact"],
    "deep dive": ["detailed look", "close examination", "thorough review"],
    "unpack": ["examine", "explore", "break down"],
    "let's explore": ["let's look at", "let's examine", "here's"],
    "key takeaway": ["main point", "bottom line", "key insight"],

    // CLAUDE-SPECIFIC
    "characterized by": ["marked by", "defined by", "known for"],
    "marked by": ["defined by", "shaped by", "characterized by"],
    "unprecedented complexity": ["extreme complexity", "unique challenges", "unusual difficulty"],
    "emergence of": ["rise of", "appearance of", "arrival of"],
    "strategic competition": ["rivalry", "contest", "competition"],
    "manifested in": ["shown in", "seen in", "expressed in"],
    "fundamental reassessment": ["major rethink", "complete review", "basic reconsideration"],
    "renaissance": ["revival", "renewal", "rebirth"],
    "persistent instability": ["ongoing chaos", "continued uncertainty", "lasting turmoil"],
    "growing assertiveness": ["increasing boldness", "rising confidence", "stronger stance"],
    "increasingly": ["more and more", "progressively", "gradually more"],
    "essential to": ["key to", "vital for", "critical for"],

    // GEMINI-SPECIFIC
    "fragmented frontier": ["divided area", "split region", "broken landscape"],
    "geopolit": ["political", "governmental", "international"],
    "brinkmanship": ["risky tactics", "aggressive strategy", "high-stakes game"],
    "managed confrontation": ["controlled conflict", "organized opposition", "strategic tension"],
    "sovereign": ["independent", "self-governing", "autonomous"],
    "extraterritorial": ["beyond borders", "external", "outside jurisdiction"],
    "cognitive power": ["mental influence", "intellectual force", "thinking power"],
    "hybrid conflict": ["mixed warfare", "blended combat", "combined struggle"],
    "at a crossroads": ["at a turning point", "facing choices", "at a junction"],
    "recalibration": ["adjustment", "shift", "rebalancing"],
    "muscular": ["strong", "forceful", "aggressive"],
    "interventionism": ["involvement", "interference", "active policy"],

    // PERPLEXITY-SPECIFIC
    "multi-aligned": ["diversified", "varied", "multiple partnerships"],
    "de-risking": ["reducing risk", "minimizing danger", "lowering exposure"],
    "near-shoring": ["relocating nearby", "bringing closer", "regional sourcing"],
    "friend-shoring": ["ally sourcing", "partner-based", "friendly supply"],
    "non-state actors": ["private groups", "organizations", "unofficial players"],
    "systemic rival": ["major competitor", "structural opponent", "system-level threat"],
    "main axis": ["primary line", "key connection", "central link"],

    // CHATGPT-SPECIFIC
    "refers to": ["means", "indicates", "describes"],
    "shaped by": ["influenced by", "formed by", "molded by"],
    "plays a crucial role": ["is vital", "is key", "matters greatly"],
    "emerged as": ["became", "developed into", "arose as"],
    "remains a central": ["stays a key", "continues as main", "is still central"],
    "historically": ["in the past", "traditionally", "over time"],
    "increasingly used": ["more common", "growing use", "rising adoption"],
    "reflects": ["shows", "demonstrates", "indicates"],
    "priorities": ["goals", "focuses", "main aims"],

    // General AI words
    "utilize": ["use", "employ", "apply"],
    "facilitate": ["help", "enable", "make easier"],
    "implement": ["use", "apply", "put in place"],
    "individuals": ["people", "folks", "persons"],
    "commence": ["start", "begin", "kick off"],
    "endeavor": ["try", "attempt", "effort"],
    "optimal": ["best", "ideal", "perfect"],
    "robust": ["strong", "solid", "effective"],
    "comprehensive": ["complete", "thorough", "full"],
    "paramount": ["crucial", "essential", "vital"],
};

// ============================================
// SDSL (Sentence Diversity Selector Level) Calculator
// ============================================

export function calculateSDSL(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length < 2) return 0;

    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / sentenceLengths.length;

    return Math.sqrt(variance);
}

// ============================================
// MODULE 1: AI PHRASE ANNIHILATOR
// ============================================

export function removeAllAIPhrases(text: string): string {
    let result = text;

    Object.entries(FORBIDDEN_AI_PHRASES).forEach(([aiPhrase, alternatives]) => {
        const regex = new RegExp(aiPhrase, 'gi');
        result = result.replace(regex, () => {
            // Random selection to avoid creating new patterns
            return alternatives[Math.floor(Math.random() * alternatives.length)];
        });
    });

    return result;
}

// ============================================
// MODULE 2: SDSL MAXIMIZER
// ============================================

export function maximizeSDSL(text: string, mood: Mood, targetSDSL: number = 9.0): string {
    let currentText = text;
    let currentSDSL = calculateSDSL(currentText);
    let iterations = 0;
    const maxIterations = 5;

    while (currentSDSL < targetSDSL && iterations < maxIterations) {
        currentText = applySentenceVariety(currentText, mood);
        currentSDSL = calculateSDSL(currentText);
        iterations++;
    }

    return currentText;
}

export function applySentenceVariety(text: string, mood: Mood): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    if (sentences.length < 3) return text;

    const result: string[] = [];

    sentences.forEach((sentence, idx) => {
        const words = sentence.split(/\s+/);
        const currentLength = words.length;

        // Decision: shorten, keep, or lengthen?
        const roll = Math.random();

        // 40% chance: Make VERY SHORT (2-5 words) - INCREASED from 30%
        if (roll < 0.4 && currentLength > 6) {
            const fragment = words.slice(0, Math.min(4, Math.floor(words.length / 3))).join(' ');
            result.push(fragment.trim() + '.');
            return;
        }

        // 30% chance: Make VERY LONG (35-50 words) - INCREASED from 20%
        if (roll >= 0.4 && roll < 0.7 && idx < sentences.length - 1 && currentLength < 20) {
            // Merge with next sentence using connector
            const connector = mood === 'academic' ? ', which' : mood === 'casual' ? ', and' : '—';
            const nextSentence = sentences[idx + 1] || '';
            const merged = sentence.replace(/[.!?]$/, '') + connector + ' ' + nextSentence.charAt(0).toLowerCase() + nextSentence.slice(1);
            result.push(merged);
            sentences[idx + 1] = ''; // Mark as consumed
            return;
        }

        // 30%: Keep as is (REDUCED from 50%)
        result.push(sentence);
    });

    return result.filter(s => s.trim()).join(' ');
}

// ============================================
// MODULE 3: SENTENCE EXTREMES INJECTOR
// ============================================

export function injectSentenceExtremes(text: string, mood: Mood): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    // INCREASED targets: casual 45%, academic 25%, others 35%
    const targetExtremesRatio = mood === 'casual' || mood === 'storytelling' ? 0.45 : mood === 'academic' ? 0.25 : 0.35;

    let veryShort = 0;
    let veryLong = 0;

    const result = sentences.map((sentence, idx) => {
        const words = sentence.split(/\s+/);
        const length = words.length;

        const currentExtremes = (veryShort + veryLong) / sentences.length;

        // Need more extremes?
        if (currentExtremes < targetExtremesRatio) {
            // Make some VERY short (INCREASED chance from 0.5 to 0.6)
            if (Math.random() < 0.6 && length > 6) {
                veryShort++;
                const fragment = words.slice(0, 3).join(' '); // Even shorter: 3 words max
                return fragment.trim() + '.';
            }

            // Make some VERY long (if next sentence exists)
            if (idx < sentences.length - 1 && length < 20) {
                veryLong++;
                const next = sentences[idx + 1];
                const merged = sentence.replace(/[.!?]$/, '') + ', and ' + next.charAt(0).toLowerCase() + next.slice(1);
                sentences[idx + 1] = ''; // Mark consumed
                return merged;
            }
        }

        return sentence;
    });

    return result.filter(s => s.trim()).join(' ');
}

// ============================================
// MODULE 4: PARAGRAPH VARIANCE CREATOR
// ============================================

export function createVariedParagraphs(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    if (sentences.length < 3) return text;

    const paragraphs: string[] = [];
    let current: string[] = [];

    // AI uses consistent 3-5 sentences
    // We use random: 1, 2, 4, 6, 8
    const paragraphSizes = [1, 2, 2, 3, 4, 4, 5, 6, 8];

    sentences.forEach((sentence) => {
        current.push(sentence);

        const targetSize = paragraphSizes[Math.floor(Math.random() * paragraphSizes.length)];

        if (current.length >= targetSize) {
            paragraphs.push(current.join(' '));
            current = [];
        }
    });

    if (current.length > 0) {
        paragraphs.push(current.join(' '));
    }

    return paragraphs.join('\n\n');
}

// ============================================
// MODULE 5: NATURAL IMPERFECTION INJECTOR
// ============================================

export function addNaturalQuirks(text: string, mood: Mood): string {
    if (mood === 'academic' || mood === 'professional') {
        return text; // Minimal quirks for formal moods
    }

    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    const result: string[] = [];

    // Define quirks by mood
    const quirks = {
        casual: {
            fragments: ['Really.', 'Exactly.', 'Not always.', 'Who knows?', 'Hard to say.'],
            emDashes: ['—at least I think so—', '—honestly—', '—from what I can tell—'],
            interjections: ['Look,', 'Listen,', 'I mean,']
        },
        friendly: {
            fragments: ['Pretty cool.', 'Nice.', 'Makes sense.', 'Fair enough.'],
            emDashes: ['—or so it seems—', '—surprisingly enough—'],
            interjections: ['Hey,', 'So,', 'Actually,']
        },
        storytelling: {
            fragments: ['Suddenly.', 'Amazing.', 'Unexpected.'],
            emDashes: ['—believe it or not—', '—in that moment—'],
            interjections: ['Picture this:', "Here's the thing:"]
        },
        professional: { fragments: [], emDashes: [], interjections: [] },
        academic: { fragments: [], emDashes: [], interjections: [] }
    };

    const config = quirks[mood];

    sentences.forEach((sentence, idx) => {
        // Add interjection at start (10% chance)
        if (idx === 0 && config.interjections.length > 0 && Math.random() < 0.1) {
            const interjection = config.interjections[Math.floor(Math.random() * config.interjections.length)];
            result.push(interjection + ' ' + sentence);
            return;
        }

        // Add fragment (15% chance)
        if (config.fragments.length > 0 && Math.random() < 0.15) {
            result.push(sentence);
            result.push(config.fragments[Math.floor(Math.random() * config.fragments.length)]);
            return;
        }

        // Add em-dash aside (10% chance)
        if (config.emDashes.length > 0 && Math.random() < 0.1) {
            const words = sentence.split(/\s+/);
            if (words.length > 10) {
                const mid = Math.floor(words.length / 2);
                const aside = config.emDashes[Math.floor(Math.random() * config.emDashes.length)];
                const modified = [
                    ...words.slice(0, mid),
                    aside,
                    ...words.slice(mid)
                ].join(' ');
                result.push(modified);
                return;
            }
        }

        result.push(sentence);
    });

    return result.join(' ');
}

// ============================================
// MODULE 6: MOOD-BASED AUTHENTICITY MARKERS
// ============================================

const MOOD_CONFIG = {
    casual: {
        contractionRate: 0.95,  // INCREASED from 0.9
        transitions: ['But', 'And', 'So', 'Yet'],
        formalTransitions: ['Furthermore', 'Moreover', 'Additionally', 'Consequently']
    },
    professional: {
        contractionRate: 0.65,  // INCREASED from 0.5
        transitions: ['But', 'And', 'Yet', 'However'],
        formalTransitions: ['Furthermore', 'Moreover']
    },
    friendly: {
        contractionRate: 0.85,  // INCREASED from 0.75
        transitions: ['Plus', 'And', 'Also', 'But'],
        formalTransitions: ['Furthermore', 'Moreover', 'Additionally']
    },
    academic: {
        contractionRate: 0.35,  // INCREASED from 0.2
        transitions: ['Yet', 'However', 'Still'],
        formalTransitions: []
    },
    storytelling: {
        contractionRate: 0.80,  // INCREASED from 0.7
        transitions: ['Then', 'And', 'But', 'So'],
        formalTransitions: ['Furthermore', 'Moreover']
    }
};

export function applyMoodAuthenticity(text: string, mood: Mood): string {
    let result = text;
    const config = MOOD_CONFIG[mood];

    // Remove formal transitions (AI fingerprint)
    config.formalTransitions.forEach(formal => {
        const replacement = config.transitions[Math.floor(Math.random() * config.transitions.length)];
        result = result.replace(new RegExp(`\\b${formal}\\b`, 'gi'), replacement);
    });

    // Add heavy contractions
    const contractions: Record<string, string> = {
        'do not': "don't",
        'cannot': "can't",
        'will not': "won't",
        'is not': "isn't",
        'are not': "aren't",
        'was not': "wasn't",
        'were not': "weren't",
        'have not': "haven't",
        'has not': "hasn't",
        'had not': "hadn't",
        'would not': "wouldn't",
        'should not': "shouldn't",
        'could not': "couldn't",
        'it is': "it's",
        'that is': "that's",
        'you are': "you're",
        'we are': "we're",
        'they are': "they're",
        'I am': "I'm"
    };

    Object.entries(contractions).forEach(([full, contracted]) => {
        if (Math.random() < config.contractionRate) {
            result = result.replace(new RegExp(`\\b${full}\\b`, 'gi'), contracted);
        }
    });

    return result;
}

// ============================================
// MAIN FORENSIC HUMANIZATION ENGINE
// ============================================

export function forensicHumanize(text: string, mood: Mood = 'professional'): string {
    console.log('🔬 Starting Forensic Humanization...');
    console.log(`Input SDSL: ${calculateSDSL(text).toFixed(2)}`);

    let humanized = text;

    // PHASE 1: CRITICAL - Remove AI Fingerprints
    console.log('📍 Phase 1: Removing AI fingerprints...');
    humanized = removeAllAIPhrases(humanized);

    // PHASE 2: CRITICAL - Maximize SDSL
    console.log('📍 Phase 2: Maximizing SDSL...');
    const targetSDSL = mood === 'storytelling' ? 10.0 : mood === 'casual' ? 9.5 : mood === 'academic' ? 7.5 : 8.5;
    humanized = maximizeSDSL(humanized, mood, targetSDSL);
    humanized = injectSentenceExtremes(humanized, mood);

    // PHASE 3: Add Human Chaos
    console.log('📍 Phase 3: Adding natural variance...');
    humanized = createVariedParagraphs(humanized);

    // PHASE 4: Mood-Specific Authenticity
    console.log('📍 Phase 4: Applying mood markers...');
    humanized = addNaturalQuirks(humanized, mood);
    humanized = applyMoodAuthenticity(humanized, mood);

    const finalSDSL = calculateSDSL(humanized);
    console.log(`✅ Final SDSL: ${finalSDSL.toFixed(2)}`);
    console.log(`🎯 Target was: ${targetSDSL.toFixed(2)}`);

    // Return humanized text (no signature needed)
    return humanized;
}

// Helper exports
// Helper exports
// Exported inline
