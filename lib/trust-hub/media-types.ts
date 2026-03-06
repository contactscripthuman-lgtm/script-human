/**
 * Type definitions for Media Verifier
 */

export type MediaVerdict = 'LIKELY REAL' | 'LIKELY AI-GENERATED' | 'UNCERTAIN';
export type ConfidenceLevel = 'HIGH' | 'MODERATE' | 'LOW';

export interface LayerScores {
    frequency_analysis: number;
    artifact_detection: number;
    noise_analysis: number;
    texture_analysis: number;
    statistical_analysis: number;
    edge_consistency: number;
    color_distribution: number;
}

export interface MediaAnalysisResult {
    score: number;
    verdict: MediaVerdict;
    confidence: ConfidenceLevel;
    layerScores: LayerScores;
    interpretation: string[];
    timestamp?: string;
}

export interface VideoAnalysisResult extends MediaAnalysisResult {
    frameScores: number[];
    temporalScore: number;
    framesAnalyzed: number;
}

export const LAYER_WEIGHTS: Record<keyof LayerScores, number> = {
    frequency_analysis: 0.20,
    artifact_detection: 0.25,
    noise_analysis: 0.15,
    texture_analysis: 0.15,
    statistical_analysis: 0.10,
    edge_consistency: 0.10,
    color_distribution: 0.05
};

export const SCORE_RANGES = {
    VERY_LIKELY_AI: { min: 0, max: 24, confidence: 'HIGH' as ConfidenceLevel },
    LIKELY_AI: { min: 25, max: 39, confidence: 'MODERATE' as ConfidenceLevel },
    UNCERTAIN: { min: 40, max: 69, confidence: 'LOW' as ConfidenceLevel },
    LIKELY_REAL: { min: 70, max: 84, confidence: 'MODERATE' as ConfidenceLevel },
    VERY_LIKELY_REAL: { min: 85, max: 100, confidence: 'HIGH' as ConfidenceLevel }
};
