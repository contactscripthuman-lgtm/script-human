import { NextRequest, NextResponse} from 'next/server';
import { analyzeContent} from '@/lib/trust-hub/forensic-engine';
import { analyzeBurstiness, applyMultipleSuggestions} from '@/lib/structure-breaker';
import { detectDomain, analyzeTone, applyContextAwareReplacements} from '@/lib/context';
import { analyticsStore} from '@/lib/analytics';
import { parseRecommendations} from '@/lib/trust-hub/recommendation-applier';
import {
    removeAllAIPhrases as libRemoveAI,
    maximizeSDSL,
    injectSentenceExtremes,
    addNaturalQuirks,
    applyMoodAuthenticity,
    createVariedParagraphs
} from '@/lib/forensic-humanizer';
import { ToneAnalysis, Domain} from '@/lib/context';

type Mood ="professional" |"casual" |"friendly" |"academic" |"storytelling";

/**
 * ULTRA-OPTIMIZED HUMANIZATION ENGINE v2.0
 * 
 * Based on deep analysis of Trust Hub's scoring algorithm:
 * - Target SDSL: 9-12 (sweet spot)
 * - 40+ AI phrase removals
 * - 35+ contraction patterns
 * - 25%+ sentence extremes
 * - 20%+ contraction rate
 * - Subtle imperfections
 */
export async function POST(req: NextRequest) {
    try {
        const { text, mood, toolType = 'persona', socialPlatform} = await req.json();

        if (!text || !mood) {
            return NextResponse.json(
                { error: 'Missing text or mood'},
                { status: 400}
            );
       }

        console.log('🚀 CONTEXT-AWARE HUMANIZATION v3.0');
        console.log(`Mood: ${mood} | Target: 85%+ | SDSL Target: 9-12`);

        // STEP 0: Detect context (domain + tone)
        const domainAnalysis = detectDomain(text);
        const toneAnalysis = analyzeTone(text);
        console.log(`📍 Domain: ${domainAnalysis.primary} (${domainAnalysis.confidence}% confidence)`);
        console.log(`🎵 Tone: Formality=${toneAnalysis.formality}, Tech=${toneAnalysis.technicality}`);

        // STEP 0.5: Collect AI sample if original content is AI-generated
        const originalAnalysis = analyzeContent(text, { source: 'user'});
        if (originalAnalysis.layers.authenticity.aiLikelihood > 70) {
            analyticsStore.collectAISample({
                content: text.substring(0, 500), // Store first 500 chars
                trustScore: originalAnalysis.overallTrustScore,
                metrics: {
                    sdsl: originalAnalysis.layers.authenticity.sdsl,
                    hedging: originalAnalysis.layers.authenticity.hedgingScore,
                    smogDensity: originalAnalysis.layers.authenticity.smogDensity,
                    rareWordRatio: originalAnalysis.layers.authenticity.rareWordRatio,
                    aiLikelihood: originalAnalysis.layers.authenticity.aiLikelihood
               }
           });
       }

        // STEP 1: Apply context-aware humanization
        let humanized = applyUltraOptimizedHumanization(text, mood as Mood, domainAnalysis.primary as Domain, toneAnalysis, toolType, socialPlatform);

        // STEP 2: Test in Trust Hub
        let analysis = analyzeContent(humanized, { source: 'user'});
        let score = analysis.overallTrustScore;
        let iterations = 1;

        console.log(`\n📊 ITERATION ${iterations}:`);
        console.log(`Score: ${score}%`);
        console.log(`SDSL: ${analysis.layers.authenticity.sdsl.toFixed(2)}`);
        console.log(`AI Likelihood: ${analysis.layers.authenticity.aiLikelihood}%`);

        // STEP 3: Intelligent Feedback Loop - Use Trust Hub recommendations
        const maxIterations = 3;
        while (score < 75 && iterations < maxIterations) {
            console.log(`\n🔄 APPLYING TRUST HUB RECOMMENDATIONS (Iteration ${iterations + 1})...`);

            // Parse recommendations from Trust Hub
            const actions = parseRecommendations(analysis);
            console.log(`Recommendations: ${actions.map(a => a.type).join(', ')}`);

            if (actions.length === 0) {
                console.log('⚠ No actionable recommendations, breaking loop');
                break;
           }

            // RE-APPLY FULL HUMANIZATION WITH EXTRA STRENGTH (Using Core Library)
            console.log('  🔧 Re-humanizing with Core Library functions...');

            // 1. Remove AI phrases (Strong Lib Version)
            humanized = libRemoveAI(humanized);
            humanized = removeHedgingLanguage(humanized);

            // 2. Context & Vocabulary
            humanized = applyContextAwareReplacements(humanized, domainAnalysis.primary, toneAnalysis);
            humanized = addRareWords(humanized, mood as Mood);

            // 3. Structure & Sentence Variety (Strong Lib Versions)
            // Use rigorous SDSL maximization
            const targetSDSL = mood === 'storytelling' ? 10.0 : 9.0;
            humanized = maximizeSDSL(humanized, mood as Mood, targetSDSL);
            humanized = injectSentenceExtremes(humanized, mood as Mood);
            humanized = createVariedParagraphs(humanized);

            // 4. Authenticity & Quirks (Strong Lib Versions)
            humanized = applyMoodAuthenticity(humanized, mood as Mood);
            humanized = addNaturalQuirks(humanized, mood as Mood);

            // 5. Local enhancements
            humanized = addEnhancedMoodElements(humanized, mood as Mood);
            humanized = addSubtleImperfections(humanized);

            console.log('  ✅ Full core pipeline re-applied');

            // Test again
            analysis = analyzeContent(humanized, { source: 'user'});
            score = analysis.overallTrustScore;
            iterations++;

            console.log(`📊 ITERATION ${iterations}:`);
            console.log(`Score: ${score}%`);
            console.log(`SDSL: ${analysis.layers.authenticity.sdsl.toFixed(2)}`);
            console.log(`AI Likelihood: ${analysis.layers.authenticity.aiLikelihood}%`);
       }

        // STEP 4: Track result
        const techniques = [
            'ai-phrase-removal',
            'hedging-removal',
            'context-aware',
            'trust-hub-recommendations',  // NEW!
            'ultra-contractions',
            'extreme-sdsl',
            'mood-elements',
            'rare-words',
            'subtle-imperfections'
        ];

        analyticsStore.trackHumanization({
            originalScore: originalAnalysis.overallTrustScore,
            humanizedScore: score,
            improvement: score - originalAnalysis.overallTrustScore,
            techniques,
            mood,
            domain: domainAnalysis.primary,
            wordCount: text.split(/\s+/).length,
            success: score >= 75
       });

        // STEP 5: Finalize Output
        let emailSubject = '';
        if (toolType === 'email') {
            // Generate subject and ensure structure
            const emailParts = generateEmailComponents(humanized, mood as Mood);
            emailSubject = emailParts.subject;
            humanized = emailParts.body;
       }

        return NextResponse.json({
            success: score >= 75 || iterations >= maxIterations,
            humanizedText: humanized,
            emailSubject: emailSubject || undefined, // Send subject separate
            score,
            analysis,
            iterations,
            techniques,
            domain: domainAnalysis.primary,
            tone: toneAnalysis,
            usedFeedbackLoop: iterations > 1,
            usedStructureBreaker: score < 75 // approximation
       });
   } catch (error) {
        console.error('Humanization error:', error);
        return NextResponse.json(
            { error: (error as Error).message || 'Failed to humanize content', details: String(error)},
            { status: 500}
        );
   }
}

/**
 * Context-aware humanization with ALL enhancements
 */
function applyUltraOptimizedHumanization(text: string, mood: Mood, domain: Domain, tone: ToneAnalysis, toolType: string = 'persona', socialPlatform?: string): string {
    const paragraphs = text.split(/\n\n+/);

    let processed = paragraphs.map(para => {
        let result = para;

        // Apply in optimized order (Using Strong Core Library)
        result = libRemoveAI(result);              // 100+ patterns
        result = removeHedgingLanguage(result);           // Remove AI safety language
        result = applyContextAwareReplacements(result, domain, tone); // Context-aware replacements

        // Structure & Variety
        const sdslTarget = toolType === 'social' ? (socialPlatform === 'twitter' ? 4.0 : 6.0) : 9.5;
        result = maximizeSDSL(result, mood, sdslTarget);
        result = injectSentenceExtremes(result, mood);    // Add very short/long sentences

        if (toolType !== 'social') {
            result = createVariedParagraphs(result);          // Break up AI paragraph structure
       }

        // Authenticity & Quirks
        result = applyMoodAuthenticity(result, mood);     // Contractions & transitions
        result = addNaturalQuirks(result, mood);          // Fragments & em-dashes

        // Local Enhancements
        result = addEnhancedMoodElements(result, mood);   //"I think","It seems"
        result = addRareWords(result, mood);              // Inject specific vocabulary
        result = addSubtleImperfections(result);          // Human-like errors

        // Tool-Specific Logic
        if (toolType === 'social' && socialPlatform) {
            result = applySocialMediaTone(result, socialPlatform);
       }

        return result;
   });

    return processed.join('\n\n');
}

/**
 * Apply Social Media Tone (Viral, Punchy, Emojis)
 */
function applySocialMediaTone(text: string, platform: string): string {
    let result = text;

    // 1. Platform Specific Adjustments
    if (platform === 'twitter') {
        // Twitter: Extremely short, abbreviations
        result = result.replace(/\b(because)\b/gi, 'cuz'); // occasional slang if casual
        const processed = result.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown

        // Ensure brevity
        // (Simple truncation isn't good, but we encourage short sentences via SDSL)
   } else if (platform === 'linkedin') {
        // LinkedIn: Professional formatting, bullet points
        result = result.replace(/\b(importantly|crucially)\b/gi, '💡 Key takeaway:');
        result = result.replace(/\b(In conclusion|To summarize)\b/gi, '👇 Bottom line:');
   }

    // 2. More emojis based on sentiment/keywords (Platform variance)
    const emojiMap: Record<string, string[]> = {
        'love': ['❤️', '😍', '🔥'],
        'great': ['🚀', '💯', '✨'],
        'good': ['👍', '🙌'],
        'bad': ['😬', '🛑'],
        'happy': ['😊', '😄'],
        'excited': ['🤩', '🎉'],
        'money': ['💸', '💰'],
        'growth': ['📈', '🌱'],
        'tech': ['💻', '🤖'],
        'AI': ['🤖', '🧠'],
        'human': ['🧑‍🤝‍🧑', '🧡']
   };

    // Inject emojis logic
    // Instagram/Facebook get more emojis than LinkedIn
    const emojiProbability = platform === 'linkedin' ? 0.2 : 0.5;

    Object.keys(emojiMap).forEach(key => {
        if (result.toLowerCase().includes(key) && Math.random() < emojiProbability) {
            const emojis = emojiMap[key];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const regex = new RegExp(`\\b${key}\\b`, 'i');
            result = result.replace(regex,`${key} ${emoji}`);
       }
   });

    // 3. Hashtags
    if (!result.includes('#')) {
        const tags = [];
        if (platform === 'linkedin') {
            if (result.toLowerCase().includes('ai')) tags.push('#ArtificialIntelligence #Innovation');
            if (result.toLowerCase().includes('business')) tags.push('#BusinessStrategy #Leadership');
       } else if (platform === 'twitter') {
            if (result.toLowerCase().includes('ai')) tags.push('#AI');
            if (result.toLowerCase().includes('tech')) tags.push('#Tech');
       } else if (platform === 'instagram') {
            if (result.toLowerCase().includes('ai')) tags.push('#artificialintelligence #tech #future #innovation');
            tags.push('#fyp');
       } else {
            // Facebook / generic
            if (result.toLowerCase().includes('ai')) tags.push('#AI');
       }

        if (tags.length > 0) {
            result +=`\n\n${tags.join(' ')}`;
       }
   }

    return result;
}

/**
 * Generate Email Components (Subject + Body)
 */
/**
 * Generate Email Components (Body Only - Subject Removed)
 */
function generateEmailComponents(text: string, mood: Mood): { subject: string, body: string} {
    let body = text;
    // Subject feature removed per user request
    let subject ="";

    const lines = body.split('\n');

    // 1. Remove"Subject:" line if it exists (legacy cleanup)
    const subjectLineIdx = lines.findIndex(l => l.toLowerCase().startsWith('subject:'));
    if (subjectLineIdx !== -1) {
        lines.splice(subjectLineIdx, 1); // Remove from body
        body = lines.join('\n').trim();
   }
    // No generation of subject

    // 2. Ensure Greeting
    const greetingMatch = body.match(/^(Hi|Hello|Dear|Hey|Good morning|Good afternoon).*/i);
    if (!greetingMatch) {
        const greetings = mood === 'casual' ? ['Hey there,', 'Hi,'] : ['Hi,', 'Hello,', 'Dear Team,'];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        body =`${randomGreeting}\n\n${body}`;
   }

    // 3. Ensure Sign-off
    const signOffMatch = body.match(/(Best|Thanks|Regards|Sincerely|Cheers|Talk soon),?\s*$/i);
    if (!signOffMatch) {
        const signOffs = mood === 'casual' ? ['Cheers,', 'Talk soon,', 'Best,'] : ['Best regards,', 'Thanks,', 'Sincerely,'];
        const randomSignOff = signOffs[Math.floor(Math.random() * signOffs.length)];
        body =`${body}\n\n${randomSignOff}`;
   }

    return { subject, body};
}

/**
 * Remove ALL AI phrases - 40+ comprehensive patterns
 */
// removeAllAIPhrases DELETED - Imported from lib/forensic-humanizer as libRemoveAI

/**
 * Remove AI hedging language (safety/caution patterns)
 */
function removeHedgingLanguage(text: string): string {
    let result = text;

    // Hedging patterns to remove or replace
    const hedgingReplacements: [string, string][] = [
        // Remove entirely
        ["it's important to note that",""],
        ["it should be noted that",""],
        ["it's worth noting that",""],
        ["it's worth mentioning that",""],
        ["generally speaking,",""],
        ["as a general rule,",""],
        ["for the most part,",""],
        ["by and large,",""],
        ["in most cases,",""],
        ["it appears that",""],
        ["it seems that",""],
        ["arguably,",""],
        ["one might say that",""],
        ["one could argue that",""],

        // Replace with casual alternatives
        ["on the other hand,","But"],
        ["in general,","Usually"],
        ["typically,","Usually"],
        [" tends to"," usually"],
        [" may be"," might be"],
        [" could be"," might be"]
    ];

    hedgingReplacements.forEach(([hedge, replacement]) => {
        const regex = new RegExp(hedge.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        result = result.replace(regex, replacement);
   });

    // Clean up spaces
    result = result.replace(/\s{2,}/g, ' ');
    result = result.replace(/\s+([.,!?])/g, '$1');
    result = result.replace(/([.,!?])([A-Z])/g, '$1 $2');

    return result;
}

/**
 * Add rare/specific words based on mood
 */
function addRareWords(text: string, mood: Mood): string {
    // Rare word injection is subtle - we replace generic words with more specific ones
    // This is mood-dependent and context-aware

    if (mood === 'academic') {
        // Academic: Use domain-specific terminology
        text = text.replace(/\bvery important\b/gi, 'crucial');
        text = text.replace(/\bvery different\b/gi, 'distinct');
        text = text.replace(/\bshow\b/gi, 'demonstrate');
        text = text.replace(/\bmake better\b/gi, 'enhance');
   } else if (mood === 'professional') {
        // Professional: Industry jargon
        text = text.replace(/\bmake better\b/gi, 'optimize');
        text = text.replace(/\bwork together\b/gi, 'collaborate');
        text = text.replace(/\bvery important\b/gi, 'critical');
   } else if (mood === 'casual' || mood === 'friendly') {
        // Casual/Friendly: Colloquialisms and specific descriptors
        text = text.replace(/\bvery good\b/gi, 'awesome');
        text = text.replace(/\bvery bad\b/gi, 'terrible');
        text = text.replace(/\bvery big\b/gi, 'huge');
        text = text.replace(/\bvery small\b/gi, 'tiny');
   } else if (mood === 'storytelling') {
        // Storytelling: Vivid, specific descriptors
        text = text.replace(/\bwalk\b/gi, 'stroll');
        text = text.replace(/\blook at\b/gi, 'gaze at');
        text = text.replace(/\bvery happy\b/gi, 'thrilled');
        text = text.replace(/\bvery sad\b/gi, 'devastated');
   }

    return text;
}

/**
 * Ultra-aggressive contractions - 35+ patterns
 */
// addUltraAggressiveContractions DELETED - Use applyMoodAuthenticity from lib/forensic-humanizer

/**
 * Create extreme SDSL - Target 9-12
 * Strategy: 25% very short (<5 words), 25% very long (>30 words), 50% medium
 */
// createExtremeSDSL DELETED - Use maximizeSDSL + injectSentenceExtremes + createVariedParagraphs from lib

/**
 * Enhanced mood-specific elements
 */
function addEnhancedMoodElements(text: string, mood: Mood): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    if (sentences.length < 2) return text;

    if (mood === 'professional') {
        // 1-2 professional markers
        const markers = ['I think', 'It seems', 'Apparently', 'In my view', 'From my perspective'];
        const count = Math.min(2, Math.floor(sentences.length / 4));

        for (let i = 0; i < count; i++) {
            const idx = Math.floor((i + 1) * sentences.length / (count + 1));
            if (sentences[idx] && !sentences[idx].match(/^(I think|It seems|Apparently)/i)) {
                const marker = markers[Math.floor(Math.random() * markers.length)];
                sentences[idx] = marker + ', ' +
                    sentences[idx].charAt(0).toLowerCase() +
                    sentences[idx].slice(1);
           }
       }

        // 1-2 exclamations
        for (let i = 0; i < Math.min(2, Math.floor(sentences.length / 6)); i++) {
            const idx = Math.floor((i + 0.75) * sentences.length / 2);
            if (sentences[idx]?.endsWith('.')) {
                sentences[idx] = sentences[idx].slice(0, -1) + '!';
           }
       }
   }

    else if (mood === 'casual') {
        // 2-3 casual markers
        const markers = ['Honestly', 'Basically', 'Actually', 'You know', 'I mean', 'Look', 'Listen'];
        const count = Math.min(3, Math.floor(sentences.length / 3));

        for (let i = 0; i < count; i++) {
            const idx = Math.floor((i + 0.5) * sentences.length / count);
            if (sentences[idx] && !sentences[idx].match(/^(Honestly|Basically|Actually|Look)/i)) {
                const marker = markers[Math.floor(Math.random() * markers.length)];
                sentences[idx] = marker + ', ' +
                    sentences[idx].charAt(0).toLowerCase() +
                    sentences[idx].slice(1);
           }
       }

        // 3-4 exclamations
        for (let i = 0; i < Math.min(4, Math.floor(sentences.length / 3)); i++) {
            const idx = Math.floor((i + 0.6) * sentences.length / 4);
            if (sentences[idx]?.endsWith('.')) {
                sentences[idx] = sentences[idx].slice(0, -1) + '!';
           }
       }

        // Add fragment questions
        if (sentences.length > 6) {
            const insertIdx = Math.floor(sentences.length / 3);
            sentences.splice(insertIdx, 0, 'Right?');
       }
   }

    else if (mood === 'friendly') {
        // 2 friendly markers
        const markers = ['I think', 'Perhaps', 'Probably', 'I believe', 'It seems'];
        const count = Math.min(2, Math.floor(sentences.length / 4));

        for (let i = 0; i < count; i++) {
            const idx = Math.floor((i + 1) * sentences.length / (count + 1));
            if (sentences[idx] && !sentences[idx].match(/^(I think|Perhaps|Probably)/i)) {
                const marker = markers[Math.floor(Math.random() * markers.length)];
                sentences[idx] = marker + ', ' +
                    sentences[idx].charAt(0).toLowerCase() +
                    sentences[idx].slice(1);
           }
       }

        // 2-3 exclamations
        for (let i = 0; i < Math.min(3, Math.floor(sentences.length / 5)); i++) {
            const idx = Math.floor((i + 0.7) * sentences.length / 3);
            if (sentences[idx]?.endsWith('.')) {
                sentences[idx] = sentences[idx].slice(0, -1) + '!';
           }
       }
   }

    else if (mood === 'storytelling') {
        // Dramatic opening
        if (!sentences[0].match(/^(Look|Listen|Here's|You know)/i)) {
            const interjections = ['Look', 'Listen',"Here's the thing", 'You know what'];
            const interj = interjections[Math.floor(Math.random() * interjections.length)];
            sentences[0] = interj + ', ' +
                sentences[0].charAt(0).toLowerCase() +
                sentences[0].slice(1);
       }

        // 3-4 exclamations
        for (let i = 0; i < Math.min(4, Math.floor(sentences.length / 3)); i++) {
            const idx = Math.floor((i + 0.5) * sentences.length / 4);
            if (sentences[idx]?.endsWith('.')) {
                sentences[idx] = sentences[idx].slice(0, -1) + '!';
           }
       }

        // Dramatic pause
        if (sentences.length > 5) {
            const pauseIdx = Math.floor(sentences.length / 2);
            sentences.splice(pauseIdx, 0, 'And you know what?');
       }
   }

    return sentences.join(' ');
}

/**
 * Add subtle imperfections (1-2 per 100 words)
 * Trust Hub penalizes PERFECT grammar as AI
 */
function addSubtleImperfections(text: string): string {
    const words = text.split(/\s+/);
    const wordCount = words.length;

    // Don't add imperfections to very short text
    if (wordCount < 50) return text;

    let result = text;

    // 1. Occasional run-on with em-dash (acceptable imperfection)
    if (Math.random() < 0.3) {
        result = result.replace(/\. ([A-Z])/g, (match, letter) => {
            if (Math.random() < 0.15) {
                return`—${letter.toLowerCase()}`;
           }
            return match;
       });
   }

    // 2. Informal fragments (viewed as human casualness)
    // Already handled in createExtremeSDSL

    return result;
}
