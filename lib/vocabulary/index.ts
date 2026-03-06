/**
 * Vocabulary System - Main Export
 * Consolidates all vocabulary databases
 */

export { COMMON_WORDS } from '../trust-hub/common-words'; // Original 1K
export { COMMON_10K_WORDS } from './common-10k'; // Expanded 10K
export {
    ACADEMIC_WORDS,
    BUSINESS_WORDS,
    MEDICAL_WORDS,
    LEGAL_WORDS,
    TECHNICAL_WORDS,
    CREATIVE_WORDS
} from './domains';
