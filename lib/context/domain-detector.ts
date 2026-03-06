/**
 * Domain Detection System
 * Auto-detects content type for context-aware transformations
 */

import { ACADEMIC_WORDS, BUSINESS_WORDS, MEDICAL_WORDS, LEGAL_WORDS, TECHNICAL_WORDS, CREATIVE_WORDS } from '../vocabulary/domains';

export type Domain = 'academic' | 'business' | 'medical' | 'legal' | 'technical' | 'creative' | 'general';

export interface DomainAnalysis {
    primary: Domain;
    confidence: number; // 0-100
    scores: Record<Domain, number>;
}

/**
 * Detect the domain of text content
 */
export function detectDomain(text: string): DomainAnalysis {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/).filter(w => w.length > 3);

    const scores: Record<Domain, number> = {
        academic: 0,
        business: 0,
        medical: 0,
        legal: 0,
        technical: 0,
        creative: 0,
        general: 0
    };

    // Count domain-specific words
    words.forEach(word => {
        const cleanWord = word.replace(/[^a-z-]/g, '');

        if (ACADEMIC_WORDS.has(cleanWord)) scores.academic++;
        if (BUSINESS_WORDS.has(cleanWord)) scores.business++;
        if (MEDICAL_WORDS.has(cleanWord)) scores.medical++;
        if (LEGAL_WORDS.has(cleanWord)) scores.legal++;
        if (TECHNICAL_WORDS.has(cleanWord)) scores.technical++;
        if (CREATIVE_WORDS.has(cleanWord)) scores.creative++;
    });

    // Check for code snippets (strong technical indicator)
    if (text.match(/```|function\s+\w+\(|class\s+\w+|import\s+\w+|const\s+\w+\s*=/)) {
        scores.technical += 20;
    }

    // Check for citations (strong academic indicator)
    if (text.match(/\[\d+\]|\(\d{4}\)|et al\.|ibid\./i)) {
        scores.academic += 15;
    }

    // Check for legal markers
    if (text.match(/pursuant to|herein|hereto|whereas|aforementioned/i)) {
        scores.legal += 15;
    }

    // Find highest score
    const entries = Object.entries(scores) as Array<[Domain, number]>;
    const sorted = entries.sort((a, b) => b[1] - a[1]);

    const [primary, primaryScore] = sorted[0];
    const totalWords = words.length;

    // Calculate confidence (percentage of domain words)
    const confidence = Math.min(100, Math.round((primaryScore / totalWords) * 100 * 2));

    // If confidence is low, classify as general
    if (confidence < 10) {
        return {
            primary: 'general',
            confidence: 100 - confidence,
            scores
        };
    }

    return {
        primary,
        confidence,
        scores
    };
}

/**
 * Check if text contains medical terminology
 */
export function containsMedicalTerms(text: string): boolean {
    const medicalPatterns = [
        /diagnosis|prognosis|symptom|treatment|therapy|patient|clinical|medical/i,
        /cardiovascular|respiratory|neurological|gastrointestinal/i,
        /mg|ml|dosage|prescription|medication/i
    ];

    return medicalPatterns.some(pattern => pattern.test(text));
}

/**
 * Check if text contains legal terminology
 */
export function containsLegalTerms(text: string): boolean {
    const legalPatterns = [
        /plaintiff|defendant|statute|jurisdiction|litigation/i,
        /pursuant to|herein|whereas|therefore|aforementioned/i,
        /contract|agreement|party|breach|liability/i
    ];

    return legalPatterns.some(pattern => pattern.test(text));
}

/**
 * Check if text contains code snippets
 */
export function containsCodeSnippets(text: string): boolean {
    const codePatterns = [
        /```[\s\S]*?```/,  // Code blocks
        /function\s+\w+\(/,
        /class\s+\w+/,
        /const\s+\w+\s*=/,
        /import\s+\w+/,
        /=>|===|!==|\|\||&&/
    ];

    return codePatterns.some(pattern => pattern.test(text));
}

/**
 * Check if text contains academic markers
 */
export function containsAcademicMarkers(text: string): boolean {
    const academicPatterns = [
        /\[\d+\]/, // Citations
        /\(\d{4}\)/, // Year citations
        /et al\.|ibid\.|op\. cit\./i,
        /hypothesis|methodology|empirical|paradigm/i,
        /abstract|introduction|methodology|results|conclusion/i
    ];

    return academicPatterns.some(pattern => pattern.test(text));
}

/**
 * Check if text contains business jargon
 */
export function containsBusinessJargon(text: string): boolean {
    const businessPatterns = [
        /synergy|stakeholder|deliverable|ROI|KPI/i,
        /leverage|optimize|streamline|scalability/i,
        /quarter|fiscal|revenue|profit|market share/i
    ];

    return businessPatterns.some(pattern => pattern.test(text));
}
