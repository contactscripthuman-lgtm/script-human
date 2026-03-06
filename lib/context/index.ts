/**
 * Context System - Main Export
 * Consolidates all context-aware analysis tools
 */

export { detectDomain, type Domain, type DomainAnalysis } from './domain-detector';
export { analyzeTone, getToneDescriptor, type ToneAnalysis } from './tone-analyzer';
export { applyContextAwareReplacements, injectDomainVocabulary } from './replacement-engine';
