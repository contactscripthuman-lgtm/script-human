"use client";

import { useState } from "react";
import { CreditCard, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useAuth } from "@/components/AuthProvider";
import { useFreeTier } from "@/hooks/use-free-tier";

export default function AccountPage() {
    const { wordsUsed, wordsLimit, timeUntilReset } = useUsageLimits();
    const { user } = useAuth();
    const { currentTier, isPremium } = useFreeTier();


    const [isManagingSub, setIsManagingSub] = useState(false);
    const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);

    const handleDownloadInvoice = async () => {
        if (!user) return;
        setIsDownloadingInvoice(true);
        try {
            const response = await fetch('/api/stripe/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid: user.uid }),
            });
            const data = await response.json();

            if (response.ok && data.url) {
                window.open(data.url, '_blank');
            } else {
                console.error('Failed to fetch invoice:', data.error);
                alert(data.error || 'Could not download invoice. (Hint: Only active stripe subscriptions have invoices)');
            }
        } catch (error) {
            console.error('Error downloading invoice:', error);
            alert('Could not download invoice. Please try again.');
        } finally {
            setIsDownloadingInvoice(false);
        }
    };

    const handleManageSubscription = async () => {
        if (!user) return;
        setIsManagingSub(true);
        try {
            const response = await fetch('/api/stripe/create-portal-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid: user.uid }),
            });

            const data = await response.json();

            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                console.error('Failed to create portal session:', data.error);
                alert(data.error || 'Could not open subscription portal. (Hint: Only active stripe subscriptions have a portal)');
            }
        } catch (error) {
            console.error('Error opening portal:', error);
            alert('Could not open subscription portal. Please try again.');
        } finally {
            setIsManagingSub(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-metro)]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">My Account</h1>
                    <p className="text-gray-500 dark:text-white">Manage your subscription, billing, and preferences.</p>
                </div>

                <div className="grid gap-8">
                    {/* 1. Subscription & Usage Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                                <CreditCard size={18} className="text-indigo-500" /> Subscription & Usage
                            </h3>
                        </div>
                        <div className="p-6">
                            {/* Plan Details */}
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-indigo-900">Current Plan</h4>
                                        <div className="text-sm text-indigo-600/80 font-medium">{currentTier} Tier</div>
                                    </div>
                                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">Active</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5 font-medium">
                                            <span className="text-gray-600 dark:text-white">Daily Word Usage</span>
                                            {isPremium ? (
                                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                                    <Check size={14} strokeWidth={3} /> Unlimited
                                                </span>
                                            ) : (
                                                <span className="text-indigo-600">{wordsUsed.toLocaleString()} / {wordsLimit.toLocaleString()}</span>
                                            )}
                                        </div>

                                        {!isPremium && (
                                            <div className="w-full bg-indigo-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((wordsUsed / wordsLimit) * 100, 100)}%` }}
                                                />
                                            </div>
                                        )}

                                        {!isPremium ? (
                                            <p className="text-xs text-gray-400 dark:text-white mt-1.5 flex items-center gap-1">
                                                Resets in: <span className="font-semibold text-gray-500 dark:text-white">{timeUntilReset.hours}h {timeUntilReset.minutes}m</span> (Daily Limit)
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-400 dark:text-white mt-1.5 text-emerald-600/80">
                                                You have unlimited access to all tools.
                                            </p>
                                        )}
                                    </div>

                                    {!isPremium ? (
                                        <Link href="/#pricing" className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-200">
                                            Upgrade Plan
                                        </Link>
                                    ) : (
                                        <div className="space-y-3">
                                            <button
                                                onClick={handleManageSubscription}
                                                disabled={isManagingSub || isDownloadingInvoice}
                                                className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50"
                                            >
                                                {isManagingSub ? 'Opening Portal...' : 'Manage Subscription'}
                                            </button>
                                            <button
                                                onClick={handleDownloadInvoice}
                                                disabled={isDownloadingInvoice || isManagingSub}
                                                className="block w-full py-2.5 px-4 bg-white/80 hover:bg-white text-indigo-700 border border-indigo-200 text-center rounded-lg text-sm font-bold transition-colors shadow-sm disabled:opacity-50"
                                            >
                                                {isDownloadingInvoice ? 'Fetching Invoice...' : 'Download Latest Invoice'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>


                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
