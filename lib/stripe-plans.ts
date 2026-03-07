/**
 * Single source of truth for mapping Stripe price IDs → plan types and feature sets.
 * Used by both the webhook and sync API routes to ensure consistency.
 */

export type PlanType = 'Free' | 'Certificate' | 'Pro' | 'Enterprise';

export interface PlanFeatures {
    humanizeLimit: number;    // -1 = unlimited
    bypassesLimit: number;    // -1 = unlimited
    forensicAnalysis: boolean; // Trust Hub access
    certificateDownload: boolean; // Certificate generation access
}

export interface PlanDetails {
    planType: PlanType;
    features: PlanFeatures;
}

export function getPlanDetails(priceId: string): PlanDetails {
    switch (priceId) {
        case process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID:
        case 'price_enterprise':
            return {
                planType: 'Enterprise',
                features: {
                    humanizeLimit: -1,
                    bypassesLimit: -1,
                    forensicAnalysis: true,
                    certificateDownload: true,
                }
            };
        case process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID:
        case 'price_pro':
            return {
                planType: 'Pro',
                features: {
                    humanizeLimit: -1,
                    bypassesLimit: -1,
                    forensicAnalysis: true,
                    certificateDownload: false, // Pro gets analysis but NOT certificate download
                }
            };
        case process.env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID:
        case 'price_cert':
            return {
                planType: 'Certificate',
                features: {
                    humanizeLimit: -1,
                    bypassesLimit: -1,
                    forensicAnalysis: true,
                    certificateDownload: true,
                }
            };
        default:
            return {
                planType: 'Free',
                features: {
                    humanizeLimit: 5,
                    bypassesLimit: 10,
                    forensicAnalysis: false,
                    certificateDownload: false,
                }
            };
    }
}

export const FREE_PLAN = getPlanDetails('free');
