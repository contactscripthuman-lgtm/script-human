/**
 * Context-Aware Replacement Engine
 * Different transformations based on domain and tone
 */

import type { Domain } from './domain-detector';
import type { ToneAnalysis } from './tone-analyzer';
import { ACADEMIC_WORDS, BUSINESS_WORDS, MEDICAL_WORDS, LEGAL_WORDS, TECHNICAL_WORDS, CREATIVE_WORDS } from '../vocabulary/domains';

export interface ReplacementRule {
    pattern: RegExp;
    replacements: Record<Domain, string[]>;
}

/**
 * Context-aware replacement rules
 * Different replacements for different domains
 */
const CONTEXT_RULES: ReplacementRule[] = [
    // "very good" -> context-specific
    {
        pattern: /\bvery good\b/gi,
        replacements: {
            academic: ['excellent', 'robust', 'rigorous'],
            business: ['strong', 'solid', 'effective'],
            medical: ['favorable', 'positive', 'beneficial'],
            legal: ['sound', 'valid', 'well-founded'],
            technical: ['optimal', 'efficient', 'performant'],
            creative: ['brilliant', 'stunning', 'magnificent'],
            general: ['awesome', 'great', 'fantastic']
        }
    },

    // "very bad" -> context-specific
    {
        pattern: /\bvery bad\b/gi,
        replacements: {
            academic: ['inadequate', 'insufficient', 'flawed'],
            business: ['poor', 'weak', 'suboptimal'],
            medical: ['adverse', 'unfavorable', 'detrimental'],
            legal: ['invalid', 'unsound', 'defective'],
            technical: ['inefficient', 'suboptimal', 'problematic'],
            creative: ['terrible', 'atrocious', 'dreadful'],
            general: ['awful', 'horrible', 'bad']
        }
    },

    // "important" -> context-specific
    {
        pattern: /\bimportant\b/gi,
        replacements: {
            academic: ['significant', 'crucial', 'pivotal'],
            business: ['critical', 'key', 'essential'],
            medical: ['vital', 'critical', 'necessary'],
            legal: ['material', 'substantive', 'pertinent'],
            technical: ['critical', 'core', 'fundamental'],
            creative: ['pivotal', 'central', 'defining'],
            general: ['key', 'crucial', 'vital']
        }
    },

    // "show" -> context-specific
    {
        pattern: /\bshow\b/gi,
        replacements: {
            academic: ['demonstrate', 'illustrate', 'elucidate'],
            business: ['present', 'display', 'highlight'],
            medical: ['indicate', 'reveal', 'manifest'],
            legal: ['establish', 'prove', 'evidence'],
            technical: ['render', 'display', 'output'],
            creative: ['reveal', 'unveil', 'disclose'],
            general: ['show', 'display', 'present']
        }
    },

    // "use" -> context-specific  
    {
        pattern: /\buse\b/gi,
        replacements: {
            academic: ['employ', 'utilize', 'apply'],
            business: ['leverage', 'deploy', 'implement'],
            medical: ['administer', 'prescribe', 'apply'],
            legal: ['exercise', 'employ', 'invoke'],
            technical: ['implement', 'deploy', 'execute'],
            creative: ['wield', 'harness', 'employ'],
            general: ['use', 'apply', 'try']
        }
    },

    // "big" -> context-specific
    {
        pattern: /\bbig\b/gi,
        replacements: {
            academic: ['substantial', 'considerable', 'significant'],
            business: ['major', 'substantial', 'sizeable'],
            medical: ['significant', 'large', 'substantial'],
            legal: ['substantial', 'material', 'significant'],
            technical: ['large-scale', 'significant', 'major'],
            creative: ['vast', 'immense', 'enormous'],
            general: ['huge', 'large', 'massive']
        }
    },

    // "make" -> context-specific
    {
        pattern: /\bmake\b/gi,
        replacements: {
            academic: ['construct', 'generate', 'produce'],
            business: ['create', 'develop', 'generate'],
            medical: ['induce', 'cause', 'produce'],
            legal: ['render', 'constitute', 'form'],
            technical: ['generate', 'create', 'build'],
            creative: ['craft', 'forge', 'create'],
            general: ['create', 'build', 'produce']
        }
    }
];

/**
 * Apply context-aware replacements
 */
export function applyContextAwareReplacements(
    text: string,
    domain: Domain,
    tone: ToneAnalysis
): string {
    let result = text;

    // Apply each replacement rule
    for (const rule of CONTEXT_RULES) {
        const replacements = rule.replacements[domain];

        // Skip if no replacements for this domain
        if (!replacements || replacements.length === 0) continue;

        // Choose replacement based on formality
        let replacement: string;
        if (tone.formality > 70) {
            // High formality: use first (most formal) option
            replacement = replacements[0];
        } else if (tone.formality < 40) {
            // Low formality: use last (most casual) option
            replacement = replacements[replacements.length - 1];
        } else {
            // Medium formality: use middle option
            replacement = replacements[Math.floor(replacements.length / 2)];
        }

        // Apply replacement
        result = result.replace(rule.pattern, replacement);
    }

    return result;
}

/**
 * Inject domain-specific vocabulary
 */
export function injectDomainVocabulary(
    text: string,
    domain: Domain
): string {
    let result = text;

    // Get vocabulary for domain
    const vocab = getDomainVocabulary(domain);
    if (!vocab || vocab.size === 0) return result;

    // Convert to array for random access
    const words = Array.from(vocab);

    // Identify opportunities for replacement (generic words)
    const genericWords = ['thing', 'stuff', 'way', 'part', 'aspect', 'factor'];

    genericWords.forEach(generic => {
        const regex = new RegExp(`\\b${generic}s?\\b`, 'gi');
        const matches = result.match(regex);

        if (matches && matches.length > 0) {
            // Replace first occurrence with domain-specific term
            const randomWord = words[Math.floor(Math.random() * words.length)];
            result = result.replace(regex, randomWord);
        }
    });

    return result;
}

/**
 * Get vocabulary set for domain
 */
function getDomainVocabulary(domain: Domain): Set<string> | null {
    switch (domain) {
        case 'academic': return ACADEMIC_WORDS;
        case 'business': return BUSINESS_WORDS;
        case 'medical': return MEDICAL_WORDS;
        case 'legal': return LEGAL_WORDS;
        case 'technical': return TECHNICAL_WORDS;
        case 'creative': return CREATIVE_WORDS;
        default: return null;
    }
}
