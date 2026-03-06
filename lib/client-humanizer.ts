/**
 * Enhanced Client-side text humanization with grammar correction and paragraph formatting
 */

export type Mood = "professional" | "casual" | "friendly" | "academic" | "storytelling";

// Invisible signature for humanized content detection
const HUMANIZED_SIGNATURE = '\u200B\u200C\u200D'; // Zero-width characters

// AI-common words to replace
const AI_WORDS: Record<string, string[]> = {
    "utilize": ["use", "employ", "apply"],
    "leverage": ["use", "take advantage of", "apply"],
    "facilitate": ["help", "enable", "make easier"],
    "implement": ["use", "apply", "put in place"],
    "individuals": ["people", "folks", "persons"],
    "commence": ["start", "begin", "kick off"],
    "endeavor": ["try", "attempt", "effort"],
    "optimal": ["best", "ideal", "perfect"],
    "robust": ["strong", "solid", "effective"],
    "comprehensive": ["complete", "thorough", "full"],
    "delve into": ["explore", "look at", "examine"],
    "paramount": ["crucial", "essential", "vital"],
};

// Grammar correction patterns (COMPREHENSIVE)
const GRAMMAR_FIXES = [
    // Common their/there/they're errors
    { pattern: /\btheir\s+going\b/gi, replacement: "they're going" },
    { pattern: /\btheir\s+is\b/gi, replacement: "there is" },
    { pattern: /\btheir\s+are\b/gi, replacement: "there are" },
    { pattern: /\btheir\s+was\b/gi, replacement: "there was" },
    { pattern: /\btheir\s+were\b/gi, replacement: "there were" },
    { pattern: /\btheyre\b/gi, replacement: "they're" },
    { pattern: /\bthier\b/gi, replacement: "their" },

    // Its/it's errors
    { pattern: /\bits\s+a\b/gi, replacement: "it's a" },
    { pattern: /\bits\s+the\b/gi, replacement: "it's the" },
    { pattern: /\bits\s+not\b/gi, replacement: "it's not" },
    { pattern: /\bits\s+been\b/gi, replacement: "it's been" },
    { pattern: /\bits\s+going\b/gi, replacement: "it's going" },

    // Your/you're errors
    { pattern: /\byour\s+welcome\b/gi, replacement: "you're welcome" },
    { pattern: /\byour\s+going\b/gi, replacement: "you're going" },
    { pattern: /\byour\s+not\b/gi, replacement: "you're not" },
    { pattern: /\byour\s+right\b/gi, replacement: "you're right" },
    { pattern: /\byour\s+wrong\b/gi, replacement: "you're wrong" },

    // Should/could/would of → have
    { pattern: /\bshould\s+of\b/gi, replacement: "should have" },
    { pattern: /\bcould\s+of\b/gi, replacement: "could have" },
    { pattern: /\bwould\s+of\b/gi, replacement: "would have" },
    { pattern: /\bmust\s+of\b/gi, replacement: "must have" },
    { pattern: /\bmight\s+of\b/gi, replacement: "might have" },

    // Then/than confusion
    { pattern: /\bbetter\s+then\b/gi, replacement: "better than" },
    { pattern: /\bmore\s+then\b/gi, replacement: "more than" },
    { pattern: /\bless\s+then\b/gi, replacement: "less than" },
    { pattern: /\brather\s+then\b/gi, replacement: "rather than" },

    // Affect/effect (common cases)
    { pattern: /\bhas\s+an\s+affect\s+on\b/gi, replacement: "has an effect on" },
    { pattern: /\bthe\s+affect\s+of\b/gi, replacement: "the effect of" },

    // Loose/lose
    { pattern: /\bwill\s+loose\b/gi, replacement: "will lose" },
    { pattern: /\bdont\s+loose\b/gi, replacement: "don't lose" },
    { pattern: /\bto\s+loose\b/gi, replacement: "to lose" },

    // Common spelling errors
    { pattern: /\brecieve\b/gi, replacement: "receive" },
    { pattern: /\bacheive\b/gi, replacement: "achieve" },
    { pattern: /\bbelive\b/gi, replacement: "believe" },
    { pattern: /\boccured\b/gi, replacement: "occurred" },
    { pattern: /\boccurance\b/gi, replacement: "occurrence" },
    { pattern: /\bseperate\b/gi, replacement: "separate" },
    { pattern: /\bdefinately\b/gi, replacement: "definitely" },
    { pattern: /\bwierd\b/gi, replacement: "weird" },
    { pattern: /\buntill\b/gi, replacement: "until" },
    { pattern: /\balot\b/gi, replacement: "a lot" },
    { pattern: /\bnoone\b/gi, replacement: "no one" },

    // Double negatives (informal speech patterns)
    { pattern: /\bdont\s+have\s+no\b/gi, replacement: "don't have any" },
    { pattern: /\baint\s+got\s+no\b/gi, replacement: "don't have any" },

    // Subject-verb agreement (common cases)
    { pattern: /\bhe\s+don't\b/gi, replacement: "he doesn't" },
    { pattern: /\bshe\s+don't\b/gi, replacement: "she doesn't" },
    { pattern: /\bit\s+don't\b/gi, replacement: "it doesn't" },

    // Missing apostrophes (contractions)
    { pattern: /\bdont\b/gi, replacement: "don't" },
    { pattern: /\bcant\b/gi, replacement: "can't" },
    { pattern: /\bwont\b/gi, replacement: "won't" },
    { pattern: /\bdidnt\b/gi, replacement: "didn't" },
    { pattern: /\bhasnt\b/gi, replacement: "hasn't" },
    { pattern: /\bhavent\b/gi, replacement: "haven't" },
    { pattern: /\bisnt\b/gi, replacement: "isn't" },
    { pattern: /\barent\b/gi, replacement: "aren't" },
    { pattern: /\bwasnt\b/gi, replacement: "wasn't" },
    { pattern: /\bwerent\b/gi, replacement: "weren't" },
    { pattern: /\bshouldnt\b/gi, replacement: "shouldn't" },
    { pattern: /\bwouldnt\b/gi, replacement: "wouldn't" },
    { pattern: /\bcouldnt\b/gi, replacement: "couldn't" },

    // A/An errors (basic cases)
    { pattern: /\ba\s+([aeiou])/gi, replacement: "an $1" },
    { pattern: /\ban\s+([^aeiou])/gi, replacement: "a $1" },

    // Double spaces
    { pattern: /\s{2,}/g, replacement: " " },

    // Space before punctuation
    { pattern: /\s+([.,!?;:])/g, replacement: "$1" },

    // Missing space after punctuation
    { pattern: /([.,!?;:])([A-Z])/g, replacement: "$1 $2" },

    // Multiple punctuation
    { pattern: /\.{2,}/g, replacement: "." },
    { pattern: /!{2,}/g, replacement: "!" },
    { pattern: /\?{2,}/g, replacement: "?" },

    // Fix em-dash spacing (no spaces around em-dashes)
    { pattern: /\s*—\s*/g, replacement: "—" },
];

/**
 * Correct common grammar errors (COMPREHENSIVE)
 */
function correctGrammar(text: string): string {
    let corrected = text;

    // Apply all grammar fixes
    GRAMMAR_FIXES.forEach(({ pattern, replacement }) => {
        corrected = corrected.replace(pattern, replacement);
    });

    // Ensure first letter is capitalized
    if (corrected.length > 0) {
        corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    }

    // Capitalize after sentence endings (., !, ?)
    corrected = corrected.replace(/([.!?])\s+([a-z])/g, (match, p1, p2) => {
        return p1 + ' ' + p2.toUpperCase();
    });

    // Fix common capitalization issues with "I"
    corrected = corrected.replace(/\bi\s/g, 'I ');
    corrected = corrected.replace(/\bi'm\b/gi, "I'm");
    corrected = corrected.replace(/\bi'll\b/gi, "I'll");
    corrected = corrected.replace(/\bi've\b/gi, "I've");
    corrected = corrected.replace(/\bi'd\b/gi, "I'd");

    // Remove extra spaces at start/end
    corrected = corrected.trim();

    return corrected;
}

/**
 * Format text into proper paragraphs
 */
function formatIntoParagraphs(text: string): string {
    // Split into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);

    if (sentences.length <= 3) {
        return text; // Too short for paragraphs
    }

    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];

    sentences.forEach((sentence, idx) => {
        currentParagraph.push(sentence);

        // Create new paragraph every 3-5 sentences
        const shouldBreak = currentParagraph.length >= 3 && (
            currentParagraph.length >= 5 ||
            Math.random() < 0.4 || // Random breaks for variety
            idx === sentences.length - 1 // Last sentence
        );

        if (shouldBreak) {
            paragraphs.push(currentParagraph.join(' '));
            currentParagraph = [];
        }
    });

    // Add any remaining sentences
    if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join(' '));
    }

    // Join with double line breaks
    return paragraphs.join('\n\n');
}

/**
 * Add humanized signature for detection bypass
 */
function addHumanizedSignature(text: string): string {
    return text + HUMANIZED_SIGNATURE;
}

/**
 * Check if text has humanized signature
 */
export function hasHumanizedSignature(text: string): boolean {
    return text.endsWith(HUMANIZED_SIGNATURE);
}

/**
 * Remove signature from text
 */
export function removeHumanizedSignature(text: string): string {
    if (hasHumanizedSignature(text)) {
        return text.slice(0, -HUMANIZED_SIGNATURE.length);
    }
    return text;
}

/**
 * Replace AI words with natural alternatives
 */
function replaceAIWords(text: string): string {
    let result = text;

    Object.entries(AI_WORDS).forEach(([aiWord, alternatives]) => {
        const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
        result = result.replace(regex, () => {
            return alternatives[Math.floor(Math.random() * alternatives.length)];
        });
    });

    return result;
}

/**
 * Add contractions based on mood
 */
function addContractions(text: string, mood: Mood): string {
    const contractionRules: Record<string, string> = {
        "do not": "don't",
        "cannot": "can't",
        "will not": "won't",
        "is not": "isn't",
        "are not": "aren't",
        "was not": "wasn't",
        "were not": "weren't",
        "have not": "haven't",
        "has not": "hasn't",
        "had not": "hadn't",
        "would not": "wouldn't",
        "should not": "shouldn't",
        "could not": "couldn't",
        "it is": "it's",
        "that is": "that's",
        "there is": "there's",
        "you are": "you're",
        "we are": "we're",
        "they are": "they're",
        "I am": "I'm",
        "you will": "you'll",
        "we will": "we'll",
        "they will": "they'll",
    };

    // Academic uses fewer contractions
    if (mood === 'academic') {
        return text;
    }

    // Casual and friendly use more
    const intensity = mood === 'casual' ? 0.9 : mood === 'friendly' ? 0.7 : 0.5;

    let result = text;
    Object.entries(contractionRules).forEach(([full, contracted]) => {
        if (Math.random() < intensity) {
            const regex = new RegExp(`\\b${full}\\b`, 'gi');
            result = result.replace(regex, contracted);
        }
    });

    return result;
}

/**
 * Vary sentence structure
 */
function varySentenceStructure(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/);

    const starters = ["And", "But", "So", "Yet", "Still", "However"];

    return sentences.map((sentence, idx) => {
        // Randomly start some sentences with conjunctions
        if (idx > 0 && Math.random() < 0.2) {
            const starter = starters[Math.floor(Math.random() * starters.length)];
            return starter + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
        return sentence;
    }).join(' ');
}

/**
 * Add mood-specific transitions
 */
function addMoodTransitions(text: string, mood: Mood): string {
    const transitions: Record<Mood, string[]> = {
        professional: ["Furthermore", "Moreover", "Additionally", "Consequently"],
        casual: ["You know", "Basically", "Honestly", "Actually"],
        friendly: ["Plus", "Also", "By the way", "On top of that"],
        academic: ["Nevertheless", "Accordingly", "Subsequently", "Therefore"],
        storytelling: ["Meanwhile", "Suddenly", "As it turned out", "In the end"],
    };

    const sentences = text.split(/(?<=[.!?])\s+/);

    return sentences.map((sentence, idx) => {
        if (idx > 0 && idx < sentences.length - 1 && Math.random() < 0.15) {
            const transition = transitions[mood][Math.floor(Math.random() * transitions[mood].length)];
            return transition + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
        return sentence;
    }).join(' ');
}

/**
 * Break long sentences
 */
function breakLongSentences(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/);

    return sentences.map(sentence => {
        const words = sentence.split(/\s+/);

        // If sentence is too long (30+ words), try to break it
        if (words.length > 30) {
            const midpoint = Math.floor(words.length / 2);
            const firstPart = words.slice(0, midpoint).join(' ');
            const secondPart = words.slice(midpoint).join(' ');

            // Capitalize second part
            const capitalizedSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);

            return firstPart + '. ' + capitalizedSecond;
        }

        return sentence;
    }).join(' ');
}

/**
 * Main humanization function with grammar correction and paragraph formatting
 */
export function humanizeText(text: string, mood: Mood): string {
    let humanized = text;

    // Step 1: Replace AI words
    humanized = replaceAIWords(humanized);

    // Step 2: Add contractions
    humanized = addContractions(humanized, mood);

    // Step 3: Vary sentence structure
    humanized = varySentenceStructure(humanized);

    // Step 4: Add mood-specific transitions
    humanized = addMoodTransitions(humanized, mood);

    // Step 5: Break long sentences
    humanized = breakLongSentences(humanized);

    // Step 6: Apply structure-breaking for burstiness (MOOD-BASED)
    humanized = applyMoodBasedBurstiness(humanized, mood);

    // Step 7: Correct grammar
    humanized = correctGrammar(humanized);

    // Step 8: Format into paragraphs
    humanized = formatIntoParagraphs(humanized);

    // Step 9: Add humanized signature for detection bypass
    humanized = addHumanizedSignature(humanized);

    return humanized;
}

/**
 * Apply mood-based burstiness using structure-breaker algorithm
 */
function applyMoodBasedBurstiness(text: string, mood: Mood): string {
    const sentences = text.split(/\.\s+/).filter(s => s.trim());
    if (sentences.length < 2) return text;

    // Mood-based burstiness targets and noise preferences
    const moodConfig = {
        professional: {
            targetFragments: 0,
            targetEmDashes: 1,
            targetInterjections: 0,
            fragmentChance: 0,
            emDashChance: 0.2,
            interjectionChance: 0
        },
        casual: {
            targetFragments: 3,
            targetEmDashes: 2,
            targetInterjections: 2,
            fragmentChance: 0.4,
            emDashChance: 0.3,
            interjectionChance: 0.3
        },
        friendly: {
            targetFragments: 2,
            targetEmDashes: 1,
            targetInterjections: 1,
            fragmentChance: 0.25,
            emDashChance: 0.2,
            interjectionChance: 0.2
        },
        academic: {
            targetFragments: 0,
            targetEmDashes: 0,
            targetInterjections: 0,
            fragmentChance: 0,
            emDashChance: 0.1,
            interjectionChance: 0
        },
        storytelling: {
            targetFragments: 2,
            targetEmDashes: 2,
            targetInterjections: 1,
            fragmentChance: 0.3,
            emDashChance: 0.3,
            interjectionChance: 0.2
        }
    };

    const config = moodConfig[mood];
    let result = text;

    // Add fragments (short dramatic sentences)
    const casualFragments = [
        'Really.', 'Exactly.', 'Not always.', 'Sometimes.', 'Maybe.', 'Who knows?',
        'Hard to say.', 'Definitely.', 'Absolutely.', 'For sure.', 'No doubt.'
    ];

    const friendlyFragments = [
        'Pretty cool.', 'Nice.', 'Makes sense.', 'Good point.', 'Fair enough.',
        'Interesting.', 'True that.', 'Right?', 'You know?'
    ];

    const storytellingFragments = [
        'Then it happened.', 'Suddenly.', 'Without warning.', 'Just like that.',
        'In that moment.', 'Amazing.', 'Unexpected.', 'Remarkable.'
    ];

    const fragments = mood === 'casual' ? casualFragments :
        mood === 'friendly' ? friendlyFragments :
            mood === 'storytelling' ? storytellingFragments : [];

    // Add em-dashes for asides
    const emDashPhrases = [
        'at least in my view', 'or so it seems', 'from what I can tell',
        'based on my experience', 'surprisingly enough', 'believe it or not',
        'to my surprise', 'honestly', 'quite frankly'
    ];

    // Add interjections
    const casualInterjections = ['Look,', 'Listen,', 'Honestly,', 'You know what?', 'I mean,'];
    const friendlyInterjections = ['Hey,', 'So,', 'Actually,', 'By the way,'];
    const storytellingInterjections = ['Picture this:', 'Here\'s the thing:', 'So there I was,'];

    const interjections = mood === 'casual' ? casualInterjections :
        mood === 'friendly' ? friendlyInterjections :
            mood === 'storytelling' ? storytellingInterjections : [];

    // Apply fragments
    if (fragments.length > 0 && Math.random() < config.fragmentChance) {
        const sentencesArray = result.split(/\.\s+/);
        const insertPos = Math.floor(Math.random() * Math.max(1, sentencesArray.length - 1));
        const fragment = fragments[Math.floor(Math.random() * fragments.length)];
        sentencesArray.splice(insertPos + 1, 0, fragment);
        result = sentencesArray.join('. ');
    }

    // Apply em-dashes
    if (Math.random() < config.emDashChance) {
        const sentencesArray = result.split(/\.\s+/);
        const longSentences = sentencesArray
            .map((s, i) => ({ text: s, index: i, length: s.split(' ').length }))
            .filter(s => s.length > 12);

        if (longSentences.length > 0) {
            const target = longSentences[Math.floor(Math.random() * longSentences.length)];
            const words = target.text.split(' ');
            const midpoint = Math.floor(words.length / 2);
            const phrase = emDashPhrases[Math.floor(Math.random() * emDashPhrases.length)];

            const newSentence = [
                ...words.slice(0, midpoint),
                `—${phrase}—`,
                ...words.slice(midpoint)
            ].join(' ');

            sentencesArray[target.index] = newSentence;
            result = sentencesArray.join('. ');
        }
    }

    // Apply interjections
    if (interjections.length > 0 && Math.random() < config.interjectionChance) {
        const interjection = interjections[Math.floor(Math.random() * interjections.length)];
        // Add at start if not already present
        if (!result.toLowerCase().startsWith(interjection.toLowerCase())) {
            result = interjection + ' ' + result;
        }
    }

    return result;
}

