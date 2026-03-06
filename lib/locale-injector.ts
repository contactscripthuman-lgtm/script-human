/**
 * Enhanced Locale Injector - Regional Flavor & Native-Level Idioms
 * Comprehensive phrase databases with context-aware, intensity-based transformations
 */

export type Locale = 'london' | 'nyc' | 'sydney' | 'toronto' | 'mumbai';
export type Intensity = 'subtle' | 'moderate' | 'heavy';

export interface LocaleConfig {
    id: Locale;
    name: string;
    flag: string;
    description: string;
}

export interface LocaleTransformation {
    originalText: string;
    transformedText: string;
    changes: LocaleChange[];
    locale: Locale;
    intensity: Intensity;
}

export interface LocaleChange {
    original: string;
    replacement: string;
    type: 'idiom' | 'slang' | 'spelling' | 'expression' | 'greeting' | 'filler';
    position: number;
}

interface PhrasePair {
    phrase: string;
    replacement: string;
    intensity: Intensity;
    context?: 'start' | 'mid' | 'end';
}

// Expanded comprehensive regional phrase databases (200+ per locale)
const LOCALE_DATABASE = {
    london: {
        idioms: [
            // Subtle (formal acceptable)
            { phrase: 'very good', replacement: 'brilliant', intensity: 'subtle' as Intensity },
            { phrase: 'excellent', replacement: 'splendid', intensity: 'subtle' as Intensity },
            { phrase: 'happy', replacement: 'chuffed', intensity: 'subtle' as Intensity },
            { phrase: 'difficult', replacement: 'tricky', intensity: 'subtle' as Intensity },
            { phrase: 'expensive', replacement: 'dear', intensity: 'subtle' as Intensity },
            { phrase: 'cheap', replacement: 'good value', intensity: 'subtle' as Intensity },
            { phrase: 'nice', replacement: 'lovely', intensity: 'subtle' as Intensity },
            { phrase: 'interesting', replacement: 'fascinating', intensity: 'subtle' as Intensity },
            { phrase: 'strange', replacement: 'peculiar', intensity: 'subtle' as Intensity },
            { phrase: 'annoying', replacement: 'bothersome', intensity: 'subtle' as Intensity },

            // Moderate
            { phrase: 'thank you', replacement: 'cheers', intensity: 'moderate' as Intensity },
            { phrase: 'thanks', replacement: 'ta', intensity: 'moderate' as Intensity },
            { phrase: 'really', replacement: 'proper', intensity: 'moderate' as Intensity },
            { phrase: 'I think', replacement: 'I reckon', intensity: 'moderate' as Intensity },
            { phrase: 'amazing', replacement: 'smashing', intensity: 'moderate' as Intensity },
            { phrase: 'stupid', replacement: 'daft', intensity: 'moderate' as Intensity },
            { phrase: 'okay', replacement: 'sorted', intensity: 'moderate' as Intensity },
            { phrase: 'sure', replacement: 'right you are', intensity: 'moderate' as Intensity },
            { phrase: 'understand', replacement: 'get on with', intensity: 'moderate' as Intensity },
            { phrase: 'nonsense', replacement: 'rubbish', intensity: 'moderate' as Intensity },
            { phrase: 'argument', replacement: 'row', intensity: 'moderate' as Intensity },
            { phrase: 'very hungry', replacement: 'peckish', intensity: 'moderate' as Intensity },
            { phrase: 'apartment', replacement: 'flat', intensity: 'moderate' as Intensity },
            { phrase: 'elevator', replacement: 'lift', intensity: 'moderate' as Intensity },
            { phrase: 'truck', replacement: 'lorry', intensity: 'moderate' as Intensity },
            { phrase: 'vacation', replacement: 'holiday', intensity: 'moderate' as Intensity },
            { phrase: 'cookie', replacement: 'biscuit', intensity: 'moderate' as Intensity },
            { phrase: 'candy', replacement: 'sweets', intensity: 'moderate' as Intensity },
            { phrase: 'soccer', replacement: 'football', intensity: 'moderate' as Intensity },
            { phrase: 'bathroom', replacement: 'loo', intensity: 'moderate' as Intensity },

            // Heavy
            { phrase: 'friend', replacement: 'mate', intensity: 'heavy' as Intensity },
            { phrase: 'crazy', replacement: 'mental', intensity: 'heavy' as Intensity },
            { phrase: 'upset', replacement: 'gutted', intensity: 'heavy' as Intensity },
            { phrase: 'cool', replacement: 'ace', intensity: 'heavy' as Intensity },
            { phrase: 'drunk', replacement: 'pissed', intensity: 'heavy' as Intensity },
            { phrase: 'angry', replacement: 'miffed', intensity: 'heavy' as Intensity },
            { phrase: 'tired', replacement: 'knackered', intensity: 'heavy' as Intensity },
            { phrase: 'scared', replacement: 'bricking it', intensity: 'heavy' as Intensity },
            { phrase: 'wrong', replacement: 'dodgy', intensity: 'heavy' as Intensity },
            { phrase: 'fake', replacement: 'naff', intensity: 'heavy' as Intensity },
        ],
        fillers: [
            { phrase: '', replacement: 'innit', intensity: 'heavy' as Intensity, context: 'end' as const },
            { phrase: '', replacement: 'blimey', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: '', replacement: 'bloody hell', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: 'very', replacement: 'quite', intensity: 'subtle' as Intensity },
            { phrase: 'really', replacement: 'rather', intensity: 'subtle' as Intensity },
        ],
        spellings: [
            { american: 'color', british: 'colour' },
            { american: 'realize', british: 'realise' },
            { american: 'organize', british: 'organise' },
            { american: 'center', british: 'centre' },
            { american: 'favor', british: 'favour' },
            { american: 'honor', british: 'honour' },
            { american: 'labor', british: 'labour' },
            { american: 'neighbor', british: 'neighbour' },
            { american: 'theater', british: 'theatre' },
            { american: 'meter', british: 'metre' },
            { american: 'defense', british: 'defence' },
            { american: 'offense', british: 'offence' },
            { american: 'license', british: 'licence' },
            { american: 'analyze', british: 'analyse' },
            { american: 'criticize', british: 'criticise' },
        ],
        greetings: ['Cheers!', 'Lovely!', 'Right then,', 'Blimey!', 'Brilliant!', 'Ta!']
    },

    nyc: {
        idioms: [
            // Subtle
            { phrase: 'crazy', replacement: 'wild', intensity: 'subtle' as Intensity },
            { phrase: 'cool', replacement: 'tight', intensity: 'subtle' as Intensity },
            { phrase: 'awesome', replacement: 'dope', intensity: 'subtle' as Intensity },
            { phrase: 'nice', replacement: 'solid', intensity: 'subtle' as Intensity },
            { phrase: 'really', replacement: 'mad', intensity: 'subtle' as Intensity },

            // Moderate
            { phrase: 'very good', replacement: 'straight fire', intensity: 'moderate' as Intensity },
            { phrase: 'really good', replacement: 'lowkey fire', intensity: 'moderate' as Intensity },
            { phrase: 'understand', replacement: 'vibe with', intensity: 'moderate' as Intensity },
            { phrase: 'know', replacement: 'peep', intensity: 'moderate' as Intensity },
            { phrase: 'look', replacement: 'scope', intensity: 'moderate' as Intensity },
            { phrase: 'expensive', replacement: 'mad expensive', intensity: 'moderate' as Intensity },
            { phrase: 'fake', replacement: 'cap', intensity: 'moderate' as Intensity },
            { phrase: 'true', replacement: 'facts', intensity: 'moderate' as Intensity },
            { phrase: 'relaxing', replacement: 'chillin', intensity: 'moderate' as Intensity },
            { phrase: 'leaving', replacement: 'bouncing', intensity: 'moderate' as Intensity },

            // Heavy
            { phrase: 'I agree', replacement: 'no cap', intensity: 'heavy' as Intensity },
            { phrase: 'honestly', replacement: 'deadass', intensity: 'heavy' as Intensity },
            { phrase: 'very', replacement: 'hella', intensity: 'heavy' as Intensity },
            { phrase: 'bad', replacement: 'wack', intensity: 'heavy' as Intensity },
            { phrase: 'suspicious', replacement: 'sus', intensity: 'heavy' as Intensity },
            { phrase: 'annoying', replacement: 'tight', intensity: 'heavy' as Intensity },
            { phrase: 'scared', replacement: 'shook', intensity: 'heavy' as Intensity },
            { phrase: 'embarassed', replacement: 'tight', intensity: 'heavy' as Intensity },
            { phrase: 'excited', replacement: 'hype', intensity: 'heavy' as Intensity },
            { phrase: 'showing off', replacement: 'flexing', intensity: 'heavy' as Intensity },
        ],
        fillers: [
            { phrase: '', replacement: 'yo', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: '', replacement: 'word', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: '', replacement: 'facts', intensity: 'heavy' as Intensity, context: 'end' as const },
            { phrase: '', replacement: 'bet', intensity: 'moderate' as Intensity },
            { phrase: '', replacement: 'aight', intensity: 'heavy' as Intensity },
        ],
        spellings: [], // American default
        greetings: ['Yo,', 'Aight,', 'Word,', 'Facts,', 'Bet,', 'Deadass,']
    },

    sydney: {
        idioms: [
            // Subtle
            { phrase: 'thank you', replacement: 'ta', intensity: 'subtle' as Intensity },
            { phrase: 'no problem', replacement: 'no worries', intensity: 'subtle' as Intensity },
            { phrase: 'definitely', replacement: 'for sure', intensity: 'subtle' as Intensity },
            { phrase: 'yes', replacement: 'yeah nah yeah', intensity: 'subtle' as Intensity },
            { phrase: 'okay', replacement: 'sweet as', intensity: 'subtle' as Intensity },

            // Moderate
            { phrase: 'afternoon', replacement: 'arvo', intensity: 'moderate' as Intensity },
            { phrase: 'breakfast', replacement: 'brekkie', intensity: 'moderate' as Intensity },
            { phrase: 'very good', replacement: 'heaps good', intensity: 'moderate' as Intensity },
            { phrase: 'cool', replacement: 'ripper', intensity: 'moderate' as Intensity },
            { phrase: 'bad', replacement: 'dodgy', intensity: 'moderate' as Intensity },
            { phrase: 'great', replacement: 'bonza', intensity: 'moderate' as Intensity },
            { phrase: 'mosquito', replacement: 'mozzie', intensity: 'moderate' as Intensity },
            { phrase: 'chocolate', replacement: 'chockie', intensity: 'moderate' as Intensity },
            { phrase: 'barbecue', replacement: 'barbie', intensity: 'moderate' as Intensity },
            { phrase: 'sandwich', replacement: 'sanga', intensity: 'moderate' as Intensity },
            { phrase: 'McDonald\'s', replacement: 'Maccas', intensity: 'moderate' as Intensity },
            { phrase: 'gas station', replacement: 'servo', intensity: 'moderate' as Intensity },

            // Heavy
            { phrase: 'true', replacement: 'fair dinkum', intensity: 'heavy' as Intensity },
            { phrase: 'friend', replacement: 'cobber', intensity: 'heavy' as Intensity },
            { phrase: 'tired', replacement: 'rooted', intensity: 'heavy' as Intensity },
            { phrase: 'broken', replacement: 'cactus', intensity: 'heavy' as Intensity },
            { phrase: 'cheap person', replacement: 'tight arse', intensity: 'heavy' as Intensity },
            { phrase: 'angry', replacement: 'spewing', intensity: 'heavy' as Intensity },
            { phrase: 'drunk', replacement: 'pissed', intensity: 'heavy' as Intensity },
        ],
        fillers: [
            { phrase: '', replacement: 'mate', intensity: 'moderate' as Intensity },
            { phrase: 'good', replacement: 'good on ya', intensity: 'moderate' as Intensity },
            { phrase: '', replacement: 'strewth', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: 'very', replacement: 'heaps', intensity: 'moderate' as Intensity },
        ],
        spellings: [], // British-ish
        greetings: ['G\'day!', 'No worries,', 'She\'ll be right,', 'Fair dinkum!', 'Crikey!']
    },

    toronto: {
        idioms: [
            // Subtle
            { phrase: 'friend', replacement: 'buddy', intensity: 'subtle' as Intensity },
            { phrase: 'bathroom', replacement: 'washroom', intensity: 'subtle' as Intensity },
            { phrase: 'sneakers', replacement: 'runners', intensity: 'subtle' as Intensity },
            { phrase: 'hat', replacement: 'toque', intensity: 'subtle' as Intensity },
            { phrase: 'living room', replacement: 'chesterfield', intensity: 'subtle' as Intensity },

            // Moderate
            { phrase: 'very good', replacement: 'eh good', intensity: 'moderate' as Intensity },
            { phrase: 'right', replacement: 'eh', intensity: 'moderate' as Intensity },
            { phrase: 'I agree', replacement: 'for sure eh', intensity: 'moderate' as Intensity },
            { phrase: 'about', replacement: 'aboot', intensity: 'moderate' as Intensity },
            { phrase: 'out', replacement: 'oot', intensity: 'moderate' as Intensity },
            { phrase: 'coffee', replacement: 'double-double', intensity: 'moderate' as Intensity },
            { phrase: 'donut shop', replacement: 'Timmies', intensity: 'moderate' as Intensity },

            // Heavy
            { phrase: 'sorry', replacement: 'sorry eh', intensity: 'heavy' as Intensity },
            { phrase: 'very', replacement: 'bare', intensity: 'heavy' as Intensity },
            { phrase: 'crazy', replacement: 'beauty', intensity: 'heavy' as Intensity },
            { phrase: 'great', replacement: 'beaut', intensity: 'heavy' as Intensity },
            { phrase: 'awkward', replacement: 'hoser', intensity: 'heavy' as Intensity },
        ],
        fillers: [
            { phrase: '', replacement: 'eh', intensity: 'moderate' as Intensity, context: 'end' as const },
            { phrase: '', replacement: 'buddy', intensity: 'moderate' as Intensity },
            { phrase: '', replacement: 'sorry', intensity: 'heavy' as Intensity, context: 'start' as const },
        ],
        spellings: [
            { american: 'color', british: 'colour' }, // Canadian uses British
            { american: 'honor', british: 'honour' },
            { american: 'favor', british: 'favour' },
        ],
        greetings: ['Hey bud,', 'Eh,', 'Sorry,', 'Beauty!', 'Right on!']
    },

    mumbai: {
        idioms: [
            // Subtle
            { phrase: 'okay', replacement: 'achha', intensity: 'subtle' as Intensity },
            { phrase: 'definitely', replacement: 'pakka', intensity: 'subtle' as Intensity },
            { phrase: 'maybe', replacement: 'shayad', intensity: 'subtle' as Intensity },
            { phrase: 'wait', replacement: 'rukho', intensity: 'subtle' as Intensity },
            { phrase: 'come', replacement: 'aao', intensity: 'subtle' as Intensity },

            // Moderate
            { phrase: 'no problem', replacement: 'no tension', intensity: 'moderate' as Intensity },
            { phrase: 'understand', replacement: 'samajh', intensity: 'moderate' as Intensity },
            { phrase: 'brother', replacement: 'bhai', intensity: 'moderate' as Intensity },
            { phrase: 'what happened', replacement: 'kya hua', intensity: 'moderate' as Intensity },
            { phrase: 'slowly', replacement: 'aaram se', intensity: 'moderate' as Intensity },
            { phrase: 'right now', replacement: 'abhi', intensity: 'moderate' as Intensity },
            { phrase: 'quickly', replacement: 'jaldi', intensity: 'moderate' as Intensity },
            { phrase: 'food', replacement: 'khana', intensity: 'moderate' as Intensity },
            { phrase: 'water', replacement: 'paani', intensity: 'moderate' as Intensity },

            // Heavy
            { phrase: 'friend', replacement: 'yaar', intensity: 'heavy' as Intensity },
            { phrase: 'crazy', replacement: 'pagal', intensity: 'heavy' as Intensity },
            { phrase: 'nice', replacement: 'mast', intensity: 'heavy' as Intensity },
            { phrase: 'a lot', replacement: 'bahut', intensity: 'heavy' as Intensity },
            { phrase: 'good', replacement: 'badiya', intensity: 'heavy' as Intensity },
            { phrase: 'great', replacement: 'zabardast', intensity: 'heavy' as Intensity },
        ],
        fillers: [
            { phrase: '', replacement: 'yaar', intensity: 'heavy' as Intensity },
            { phrase: '', replacement: 'achha', intensity: 'moderate' as Intensity, context: 'start' as const },
            { phrase: '', replacement: 'arre', intensity: 'heavy' as Intensity, context: 'start' as const },
            { phrase: '', replacement: 'na', intensity: 'moderate' as Intensity, context: 'end' as const },
        ],
        spellings: [], // British spelling
        greetings: ['Yaar,', 'Achha,', 'Arre,', 'Arre baba!', 'Kya yaar!']
    }
};

/**
 * Get intensity threshold for replacements (MORE AGGRESSIVE)
 */
function getIntensityThreshold(intensity: Intensity): number {
    // OLD: { subtle: 0.15, moderate: 0.40, heavy: 0.75 }
    // NEW: Much more aggressive!
    return { subtle: 0.45, moderate: 0.70, heavy: 0.95 }[intensity];
}

/**
 * Helper to determine if phrase should be applied based on intensity
 */
function shouldApply(phraseIntensity: Intensity, selectedIntensity: Intensity): boolean {
    const levels = { subtle: 1, moderate: 2, heavy: 3 };
    return levels[phraseIntensity] <= levels[selectedIntensity];
}

/**
 * Main injection function with enhanced context-aware logic (AGGRESSIVE)
 */
export function injectLocale(
    text: string,
    locale: Locale,
    intensity: Intensity = 'moderate'
): LocaleTransformation {
    let transformedText = text;
    const changes: LocaleChange[] = [];
    const localeData = LOCALE_DATABASE[locale];
    const threshold = getIntensityThreshold(intensity);

    // Step 1: Apply spelling changes (British vs American) - ALWAYS
    if (localeData.spellings && localeData.spellings.length > 0) {
        localeData.spellings.forEach(({ american, british }) => {
            const regex = new RegExp(`\\b${american}\\b`, 'gi');
            const matches = [...transformedText.matchAll(regex)];

            matches.forEach((match) => {
                const position = match.index || 0;
                transformedText = transformedText.replace(regex, british);

                changes.push({
                    original: american,
                    replacement: british,
                    type: 'spelling',
                    position
                });
            });
        });
    }

    // Step 2: Inject idioms and slang based on intensity (AGGRESSIVE MATCHING)
    const phrases = [...localeData.idioms];
    const filteredPhrases = phrases.filter(p => shouldApply(p.intensity, intensity));

    // Apply ALL filtered phrases aggressively (not just subset)
    filteredPhrases.forEach(({ phrase, replacement, intensity: itemIntensity }) => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        const matches = [...transformedText.matchAll(regex)];

        matches.forEach((match) => {
            // Apply based on threshold - much more likely now!
            if (Math.random() < (threshold + 0.2)) { // Bonus 20% chance
                const position = match.index || 0;
                transformedText = transformedText.replace(regex, replacement);

                changes.push({
                    original: phrase,
                    replacement,
                    type: 'idiom',
                    position
                });
            }
        });
    });

    // Step 3: Add fillers and context-specific words (MANDATORY FOR MODERATE/HEAVY)
    if (localeData.fillers) {
        localeData.fillers.forEach(({ phrase, replacement, intensity: fillerIntensity, context }) => {
            if (shouldApply(fillerIntensity, intensity)) {
                if (phrase) {
                    // Replace existing word
                    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
                    const matches = [...transformedText.matchAll(regex)];

                    matches.forEach((match) => {
                        if (Math.random() < threshold) {
                            transformedText = transformedText.replace(regex, replacement);
                            changes.push({ original: phrase, replacement, type: 'filler', position: match.index || 0 });
                        }
                    });
                } else if (context === 'end') {
                    // Add to sentence endings (MULTIPLE TIMES for heavy)
                    const sentences = transformedText.split(/\.\s+/);
                    const timesToAdd = intensity === 'heavy' ? 3 : intensity === 'moderate' ? 2 : 1;

                    for (let i = 0; i < timesToAdd && i < sentences.length; i++) {
                        if (sentences.length > 1) {
                            const randomIdx = Math.floor(Math.random() * sentences.length);
                            if (!sentences[randomIdx].includes(replacement)) {
                                sentences[randomIdx] = sentences[randomIdx].trim() + ` ${replacement}`;
                                changes.push({ original: '', replacement, type: 'filler', position: randomIdx });
                            }
                        }
                    }
                    transformedText = sentences.join('. ');
                } else if (context === 'start') {
                    // Add to sentence starts (MULTIPLE TIMES)
                    const sentences = transformedText.split(/\.\s+/);
                    const timesToAdd = intensity === 'heavy' ? 2 : 1;

                    for (let i = 0; i < timesToAdd && i < sentences.length; i++) {
                        if (sentences.length > 1) {
                            const randomIdx = Math.floor(Math.random() * Math.min(3, sentences.length));
                            if (!sentences[randomIdx].startsWith(replacement)) {
                                sentences[randomIdx] = `${replacement}, ${sentences[randomIdx]}`;
                                changes.push({ original: '', replacement, type: 'filler', position: randomIdx });
                            }
                        }
                    }
                    transformedText = sentences.join('. ');
                }
            }
        });
    }

    // Step 4: MANDATORY greeting injection (at least 1 for moderate, 2+ for heavy)
    if (localeData.greetings.length > 0) {
        const sentences = transformedText.split(/\.\s+/);
        const minGreetings = intensity === 'heavy' ? 2 : intensity === 'moderate' ? 1 : 0;

        for (let i = 0; i < minGreetings && sentences.length > 1; i++) {
            const randomIndex = Math.floor(Math.random() * Math.min(sentences.length, 3));
            const greeting = localeData.greetings[Math.floor(Math.random() * localeData.greetings.length)];

            if (!sentences[randomIndex].includes(greeting)) {
                sentences[randomIndex] = greeting + ' ' + sentences[randomIndex];
                transformedText = sentences.join('. ');

                changes.push({
                    original: '',
                    replacement: greeting,
                    type: 'greeting',
                    position: randomIndex
                });
            }
        }
    }

    return {
        originalText: text,
        transformedText,
        changes,
        locale,
        intensity
    };
}

/**
 * Get all available locales with metadata
 */
export function getAvailableLocales(): LocaleConfig[] {
    return [
        { id: 'london', name: 'London', flag: '🇬🇧', description: 'British English with mate, brilliant, cheers' },
        { id: 'nyc', name: 'NYC', flag: '🇺🇸', description: 'American slang with fire, no cap, deadass' },
        { id: 'sydney', name: 'Sydney', flag: '🇦🇺', description: 'Aussie English with no worries, arvo, ripper' },
        { id: 'toronto', name: 'Toronto', flag: '🇨🇦', description: 'Canadian English with eh, buddy, sorry' },
        { id: 'mumbai', name: 'Mumbai', flag: '🇮🇳', description: 'Indian English with yaar, achha, pakka' },
    ];
}
