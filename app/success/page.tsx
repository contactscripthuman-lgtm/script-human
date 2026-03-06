"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, Feather, ShieldCheck, Building2 } from 'lucide-react';

// Map price IDs to destination routes and display info
const PLAN_REDIRECT_MAP: Record<string, { route: string; label: string; planName: string; icon: React.ReactNode; color: string }> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro']: {
        route: '/writing-room',
        label: 'Go to Writing Room',
        planName: 'Pro',
        icon: <Feather className="w-8 h-8" />,
        color: 'from-purple-500 to-indigo-500',
    },
    [process.env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID || 'price_cert']: {
        route: '/trust-hub',
        label: 'Go to Trust Hub',
        planName: 'Certificate',
        icon: <ShieldCheck className="w-8 h-8" />,
        color: 'from-emerald-500 to-teal-500',
    },
    [process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise']: {
        route: '/enterprise',
        label: 'Go to Enterprise Hub',
        planName: 'Enterprise',
        icon: <Building2 className="w-8 h-8" />,
        color: 'from-orange-500 to-red-500',
    },
};

const DEFAULT_DESTINATION = { route: '/writing-room', label: 'Go to Writing Room', planName: 'Plan', icon: null, color: 'from-gray-600 to-gray-800' };

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const priceId = searchParams.get('price_id') || '';
    const sessionId = searchParams.get('session_id') || '';
    const [countdown, setCountdown] = useState(5);
    const [syncing, setSyncing] = useState(true);

    const destination = PLAN_REDIRECT_MAP[priceId] || DEFAULT_DESTINATION;

    // Step 1: Sync session with backend to unlock features immediately
    useEffect(() => {
        let isMounted = true;
        const syncSession = async () => {
            if (sessionId) {
                try {
                    await fetch('/api/stripe/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId }),
                    });
                } catch (err) {
                    console.error('Failed to sync session on success page:', err);
                }
            }
            // Add a small delay for Firestore to propagate
            setTimeout(() => {
                if (isMounted) setSyncing(false);
            }, 1000);
        };

        syncSession();

        return () => { isMounted = false; };
    }, [sessionId]);

    // Step 2: Start 5s countdown after syncing completes
    useEffect(() => {
        if (syncing) return;
        if (countdown <= 0) {
            router.push(destination.route);
            return;
        }
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [syncing, countdown, router, destination.route]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white text-center px-4 font-[family-name:var(--font-metro)]">
            {syncing ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto" />
                    <h1 className="text-3xl font-display font-bold text-gray-900">
                        Activating your plan...
                    </h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Please wait a moment while we securely update your subscription and unlock your features.
                    </p>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
                    {/* Success icon */}
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${destination.color} flex items-center justify-center mx-auto text-white shadow-2xl`}>
                        {destination.icon || <CheckCircle2 className="w-10 h-10" />}
                    </div>

                    {/* Heading */}
                    <div>
                        <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1 rounded-full mb-4">
                            ✓ Payment Successful
                        </div>
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
                            Welcome to {destination.planName}!
                        </h1>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            Your subscription is active. You now have full access to all {destination.planName} features.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => router.push(destination.route)}
                        className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${destination.color} hover:opacity-90 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg text-lg`}
                    >
                        {destination.label}
                    </button>

                    {/* Countdown */}
                    <p className="text-sm text-gray-400">
                        Redirecting automatically in <span className="font-bold text-gray-600">{countdown}s</span>...
                    </p>
                </div>
            )}
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
