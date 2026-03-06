import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

export type FeatureName = 'humanize' | 'bypass' | 'forensicAnalysis';

export async function checkAccess(uid: string, featureName: FeatureName): Promise<{ allowed: boolean, reason?: string, currentUsage?: number, limit?: number }> {
    try {
        const subDocRef = doc(db, 'users', uid, 'subscription', 'current');
        const subDoc = await getDoc(subDocRef);

        const defaultFeatures = { humanizeLimit: 5, bypassesLimit: 10, forensicAnalysis: false };
        let planType = 'Free';
        let features = defaultFeatures;
        let isActive = true;

        if (subDoc.exists()) {
            const data = subDoc.data();
            features = data?.features || defaultFeatures;
            planType = data?.planType || 'Free';
            const currentPeriodEnd = data?.currentPeriodEnd as Timestamp;

            if (currentPeriodEnd && Date.now() > currentPeriodEnd.toMillis() && planType !== 'Free') {
                isActive = false; // Subscription expired, fallback to free limits or deny completely
            }
        }

        if (!isActive) {
            planType = 'Free';
            features = defaultFeatures;
        }

        // Logic for boolean feature flags
        if (featureName === 'forensicAnalysis') {
            if (!features.forensicAnalysis) {
                return { allowed: false, reason: `The ${planType} plan does not include Forensic Analysis.` };
            }
            return { allowed: true };
        }

        // Logic for quantitative features (e.g. humanize limit, bypasses limit)
        const limit = featureName === 'humanize' ? features.humanizeLimit : features.bypassesLimit;

        if (limit === -1) {
            return { allowed: true, limit }; // Unlimited
        }

        // Retrieve current usage
        // Note: For structural completeness, this assumes you track usage in users/{uid}/usage/currentMonth
        const usageRef = doc(db, 'users', uid, 'usage', 'currentMonth');
        const usageDoc = await getDoc(usageRef);
        const currentUsage = usageDoc.exists() ? (usageDoc.data()?.[featureName] || 0) : 0;

        if (currentUsage >= limit) {
            return { allowed: false, reason: `You have reached your limit of ${limit} ${featureName} actions for this billing cycle.`, currentUsage, limit };
        }

        return { allowed: true, currentUsage, limit };

    } catch (e) {
        console.error('Error checking access:', e);
        return { allowed: false, reason: 'Error verifying subscription status.' };
    }
}
