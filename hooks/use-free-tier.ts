
"use client";

import { useState, useEffect } from 'react';
import { USAGE_LIMITS, UserTier } from '@/lib/usage-limits';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type FeatureType = 'writing-room' | 'style-studio-audit' | 'style-studio-injector' | 'brand-guardrails' | 'copy-action';

export function useFreeTier() {
    const { user, loading: authLoading } = useAuth();
    const [currentTier, setCurrentTier] = useState<UserTier>(UserTier.FREE);
    const [usage, setUsage] = useState<Record<string, number>>({});
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState("");

    // Fetch Tier from Firebase
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setCurrentTier(UserTier.FREE);
            return;
        }

        const fetchTier = async () => {
            try {
                // Background sync with Stripe to enforce truth
                fetch('/api/stripe/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: user.uid }),
                }).catch(err => console.error("Background sync failed:", err));

                const subRef = doc(db, 'users', user.uid, 'subscription', 'current');
                const subSnap = await getDoc(subRef);

                if (subSnap.exists()) {
                    const data = subSnap.data();
                    const tier = data.planType?.toLowerCase();
                    if (Object.values(UserTier).includes(tier as UserTier)) {
                        setCurrentTier(tier as UserTier);
                    }
                }
            } catch (e: any) {
                if (e?.code === 'unavailable' || e?.message?.includes('offline')) {
                    console.warn("Firestore is offline, falling back to cached or default tier");
                } else {
                    console.error("Failed to fetch user tier:", e);
                }
                setCurrentTier(UserTier.FREE);
            }
        };

        fetchTier();
    }, [user, authLoading]);

    // Load usage from localStorage on mount
    useEffect(() => {
        const storedUsage = localStorage.getItem('daily_usage');
        const today = new Date().toISOString().split('T')[0];
        const lastReset = localStorage.getItem('usage_reset_date');

        if (lastReset !== today) {
            // Reset quotas if it's a new day
            localStorage.setItem('usage_reset_date', today);
            localStorage.setItem('daily_usage', JSON.stringify({}));
            setUsage({});
        } else if (storedUsage) {
            setUsage(JSON.parse(storedUsage));
        }
    }, []);

    // Capability Checkers
    const hasTrustHubAccess = [UserTier.CERTIFICATE, UserTier.PRO, UserTier.ENTERPRISE].includes(currentTier);
    const hasProAccess = [UserTier.PRO, UserTier.ENTERPRISE].includes(currentTier);
    const hasEnterpriseAccess = currentTier === UserTier.ENTERPRISE;

    const trackUsage = (feature: FeatureType, amount: number) => {
        // Enterprise has unlimited everything
        if (currentTier === UserTier.ENTERPRISE) return true;

        // Pro has unlimited standard tools
        if (currentTier === UserTier.PRO) {
            if (['writing-room', 'style-studio-audit', 'style-studio-injector'].includes(feature)) {
                return true;
            }
        }

        const currentUsage = usage[feature] || 0;
        let limit = 0;

        switch (feature) {
            case 'writing-room':
                limit = USAGE_LIMITS.WRITING_ROOM.WORDS_PER_DAY;
                break;
            case 'style-studio-audit':
                limit = USAGE_LIMITS.STYLE_STUDIO.AUDIT_WORDS_PER_DAY;
                break;
            case 'style-studio-injector':
                limit = USAGE_LIMITS.STYLE_STUDIO.INJECTOR_WORDS_PER_DAY;
                break;
            case 'brand-guardrails':
                limit = USAGE_LIMITS.BRAND_GUARDRAILS.WORDS_PER_DAY;
                break;
            case 'copy-action':
                limit = USAGE_LIMITS.BRAND_GUARDRAILS.COPY_ACTIONS_PER_DAY;
                break;
        }

        if (currentUsage + amount > limit) {
            setUpgradeMessage(`You've reached your daily limit for this tool. Upgrade to continue!`);
            setShowUpgradeModal(true);
            return false;
        }

        const newUsage = { ...usage, [feature]: currentUsage + amount };
        setUsage(newUsage);
        localStorage.setItem('daily_usage', JSON.stringify(newUsage));
        return true;
    };

    const checkLimit = (feature: FeatureType, amount: number = 0) => {
        // Enterprise has unlimited everything
        if (currentTier === UserTier.ENTERPRISE) return false;

        // Pro has unlimited standard tools
        if (currentTier === UserTier.PRO) {
            if (['writing-room', 'style-studio-audit', 'style-studio-injector'].includes(feature)) {
                return false;
            }
        }

        const currentUsage = usage[feature] || 0;
        let limit = 0;

        switch (feature) {
            case 'writing-room':
                limit = USAGE_LIMITS.WRITING_ROOM.WORDS_PER_DAY;
                break;
            case 'style-studio-audit':
                limit = USAGE_LIMITS.STYLE_STUDIO.AUDIT_WORDS_PER_DAY;
                break;
            case 'style-studio-injector':
                limit = USAGE_LIMITS.STYLE_STUDIO.INJECTOR_WORDS_PER_DAY;
                break;
            case 'brand-guardrails':
                limit = USAGE_LIMITS.BRAND_GUARDRAILS.WORDS_PER_DAY;
                break;
            case 'copy-action':
                limit = USAGE_LIMITS.BRAND_GUARDRAILS.COPY_ACTIONS_PER_DAY;
                break;
        }

        return (currentUsage + amount > limit);
    };

    // Helper to set tier (for Dev UI / Upgrade Modal)
    const setTier = (tier: UserTier) => {
        setCurrentTier(tier);
        localStorage.setItem('user_tier', tier);
    };

    return {
        currentTier,
        setTier,
        isPremium: hasProAccess, // Backwards compatibility alias for simple checks
        hasTrustHubAccess,
        hasProAccess,
        hasEnterpriseAccess,
        trackUsage,
        checkLimit,
        showUpgradeModal,
        setShowUpgradeModal,
        upgradeMessage,
        setUpgradeMessage
    };
}
