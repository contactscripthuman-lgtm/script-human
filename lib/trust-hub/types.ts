// ScriptHuman Trust Layer - Content Analysis Type Definitions

export type RiskLevel = "minimal" | "low" | "medium" | "high" | "critical";

export type Verdict = RiskLevel;

// Layer 1: Authenticity Analysis (AI vs Human Detection)
export interface AuthenticityLayer {
    score: number; // 0-100
    aiLikelihood: number; // 0-100 (higher = more AI-like)
    sdsl: number; // Standard Deviation of Sentence Length
    burstiness: number; // Sentence length variation
    aiPatterns: string[]; // Detected AI phrases
    metadataScore: number; // Author/source metadata completeness
    confidence: number; // 0-100

    // Advanced Scripthuman Metrics (2026)
    smogDensity: number; // AI phrases per 100 words
    hedgingScore: number; // Safety language count
    rareWordRatio: number; // % of uncommon vocabulary
    stylisticIdiosyncrasies: number; // Human quirks count
}

// Layer 2: Quality Analysis (Readability, Grammar, Structure)
export interface QualityLayer {
    score: number; // 0-100
    readabilityScore: number; // Flesch Reading Ease (0-100)
    gradeLevel: number; // Flesch-Kincaid Grade Level
    grammarIssues: number; // Count of potential grammar issues
    structureScore: number; // Paragraph/sentence structure quality
    engagementScore: number; // Active voice, varied sentences
    confidence: number; // 0-100
}

// Layer 3: Originality Analysis (Plagiarism, Uniqueness)
export interface OriginalityLayer {
    score: number; // 0-100
    uniquenessScore: number; // 0-100
    clicheCount: number; // Common phrases detected
    freshInsights: boolean; // Novel ideas present
    repetitionScore: number; // Word/phrase repetition
    confidence: number; // 0-100
}

// Layer 4: Credibility Analysis (Facts, Sources, Bias)
export interface CredibilityLayer {
    score: number; // 0-100
    citationsPresent: boolean;
    factCheckSignals: number; // Claims requiring verification
    biasIndicators: number; // Loaded language detected
    sourceQuality: number; // 0-100
    confidence: number; // 0-100
}

export interface ContentMetadata {
    author?: string;
    title?: string;
    source?: string;
    publishDate?: string;
    category?: string;
    [key: string]: any;
}

export interface ContentIssue {
    type: string;
    severity: "critical" | "high" | "medium" | "low";
    location: string;
    description: string;
}

export interface ForensicAnalysisResult {
    contentHash: string; // SHA-256
    timestamp: string;
    overallTrustScore: number; // 0-100 weighted average
    riskLevel: RiskLevel;
    layers: {
        authenticity: AuthenticityLayer;
        quality: QualityLayer;
        originality: OriginalityLayer;
        credibility: CredibilityLayer;
    };
    metrics: {
        wordCount: number;
        sentenceCount: number;
        paragraphCount: number;
        avgWordsPerSentence: number;
    };
    issues: ContentIssue[];
    recommendations: Recommendation[];
    humanizationGuide?: HumanizationStep[];
    verificationId?: string;
}

export interface Recommendation {
    text: string;
    type: "Critical" | "Major" | "Minor"; // Impact level
    impactPoints: number; // e.g., 20
    category: "Authenticity" | "Quality" | "Originality" | "Credibility";
}

export interface HumanizationStep {
    priority: "critical" | "high" | "medium";
    action: string;
    explanation: string;
    impact: string; // e.g., "+15-20 points"
}

export interface VerificationCertificate {
    certificateId: string;
    contentHash: string;
    issuedAt: string;
    overallTrustScore: number; // minimum 75 for certification
    riskLevel: RiskLevel;
    qrCodeData: string;
    metadata: {
        wordCount: number;
        analysisVersion: string;
    };
}

export interface VerificationData {
    certificateId: string;
    textHash: string;
    confidenceScore: number;
    verdict: string;
    issuedAt: string;
    layers: ForensicAnalysisResult['layers'];
    metrics: ForensicAnalysisResult['metrics'];
}
