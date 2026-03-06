
// Defines the available subscription tiers
export enum UserTier {
    FREE = 'free',
    CERTIFICATE = 'certificate', // $6.99
    PRO = 'pro', // $19.99
    ENTERPRISE = 'enterprise' // $39.00
}

export const USAGE_LIMITS = {
    WRITING_ROOM: {
        WORDS_PER_DAY: 1000,
        ALLOWED_MOODS: ['casual'], // Only 'casual' is free
    },
    STYLE_STUDIO: {
        AUDIT_WORDS_PER_DAY: 1000,
        INJECTOR_WORDS_PER_DAY: 1000,
        ALLOWED_REGIONS: ['au'], // Only 'AU' is free
        STRUCTURE_BREAKER_SUGGESTIONS: 3,
    },
    BRAND_GUARDRAILS: {
        WORDS_PER_DAY: 200,
        COPY_ACTIONS_PER_DAY: 1,
    }
};

export const PRICING = {
    [UserTier.FREE]: 0,
    [UserTier.CERTIFICATE]: 6.99,
    [UserTier.PRO]: 19.99,
    [UserTier.ENTERPRISE]: 39.00,
};
