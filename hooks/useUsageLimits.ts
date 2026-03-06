"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useFreeTier } from "@/hooks/use-free-tier";

export function useUsageLimits() {
    const { user, loading } = useAuth();
    const { isPremium } = useFreeTier();
    const [wordsUsed, setWordsUsed] = useState(0);
    const [timeUntilReset, setTimeUntilReset] = useState({ hours: 0, minutes: 0 });

    const WORDS_LIMIT = isPremium ? Infinity : 1000;

    useEffect(() => {
        if (loading || !user) return;

        const syncUsage = () => {
            if (isPremium) {
                setWordsUsed(0); // Reset for premium users to avoid UI clutter
                return;
            }

            const today = new Date().toDateString();
            const storageKey = `usage_${user.uid}_${today}`;
            const storedUsage = localStorage.getItem(storageKey);

            if (storedUsage) {
                setWordsUsed(parseInt(storedUsage, 10));
            } else {
                setWordsUsed(0);
            }

            // Calculate time until next reset (Midnight local time)
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const msUntilReset = tomorrow.getTime() - now.getTime();

            setTimeUntilReset({
                hours: Math.floor(msUntilReset / (1000 * 60 * 60)),
                minutes: Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60))
            });
        };

        syncUsage();

        // Update countdown every minute if left open
        const interval = setInterval(syncUsage, 60000);
        return () => clearInterval(interval);

    }, [user, loading, isPremium]);

    const recordUsage = (wordCount: number) => {
        if (!user || isPremium) return true;

        const today = new Date().toDateString();
        const storageKey = `usage_${user.uid}_${today}`;
        const newTotal = wordsUsed + wordCount;

        localStorage.setItem(storageKey, newTotal.toString());
        setWordsUsed(newTotal);
        return true;
    };

    return {
        wordsUsed,
        wordsLimit: WORDS_LIMIT,
        remainingWords: Math.max(0, WORDS_LIMIT - wordsUsed),
        isLimitReached: wordsUsed >= WORDS_LIMIT,
        timeUntilReset,
        recordUsage
    };
}
