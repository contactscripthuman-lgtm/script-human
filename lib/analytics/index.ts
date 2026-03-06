/**
 * Analytics System - Main Export
 */

export { analyticsStore, type HumanizationResult, type AISample } from './database';
export {
    getRecommendedTechniques,
    getAIDetectionInsights,
    getPerformanceMetrics,
    type TechniqueRecommendation
} from './learning-engine';
