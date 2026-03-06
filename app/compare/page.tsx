"use client";

import { useAuth } from "@/components/AuthProvider";
import { Check, Shield, Award, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

import { useState } from "react";
import Link from "next/link";
import { PRICING, UserTier } from "@/lib/usage-limits";

export default function ComparePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (planName: "Certificate" | "Pro") => {
        if (!user) {
            window.location.href = '/signup?next=/compare';
            return;
        }
        setLoading(planName);
        try {
            const priceMap: Record<string, string> = {
                "Certificate": process.env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID || 'price_cert',
                "Pro": process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro',
            };
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: priceMap[planName], uid: user.uid })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (e) {
            console.error(e);
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 font-[family-name:var(--font-metro)]">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center">

                <div className="w-full mb-8">
                    <Link href="/#pricing" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Pricing
                    </Link>
                </div>

                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
                        Wait! Get <span className="text-orange-500">More Value</span> with Pro
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        The Certificate plan gives you proof, but the Pro plan gives you the tools to create perfect content every time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                    {/* Certificate Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col transition-transform hover:shadow-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Award className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificate</h2>
                        </div>
                        <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">${PRICING[UserTier.CERTIFICATE]}</span>
                                <span className="text-gray-500 font-medium">/mo</span>
                            </div>
                            <p className="text-gray-500 mt-2">Just the AI-free certificates</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                <span>Unlimited Certificates</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                <span>Embeddable Trust Seals</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                <span>Verify & Download PDFs</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 dark:text-gray-500">
                                <span className="w-5 h-5 flex items-center justify-center shrink-0 text-red-400 font-bold">✕</span>
                                <span>No Access to Writing Tools</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("Certificate")}
                            disabled={loading !== null}
                            className="w-full py-4 px-6 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 transition-colors flex items-center justify-center active:scale-[0.98]"
                        >
                            {loading === "Certificate" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue with Certificate"}
                        </button>
                    </div>

                    {/* Pro Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-orange-500 shadow-xl relative shadow-orange-500/10 flex flex-col transform md:-translate-y-4 transition-transform hover:shadow-2xl hover:shadow-orange-500/20">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-lg uppercase">
                            Best Value
                        </div>
                        <div className="flex items-center gap-3 mb-6 mt-2">
                            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pro Plan</h2>
                        </div>
                        <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">${PRICING[UserTier.PRO]}</span>
                                <span className="text-gray-500 font-medium">/mo</span>
                            </div>
                            <p className="text-gray-500 mt-2">The complete writing toolkit</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200 font-medium">
                                <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <span>Everything in Certificate, plus:</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <span>Unlimited Writing Room Access</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <span>Advanced AI Humanization</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <span>Full Style Studio Access</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <span>All Moods & Regions Unlocked</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("Pro")}
                            disabled={loading !== null}
                            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition-all flex items-center justify-center group active:scale-[0.98] shadow-md hover:shadow-lg"
                        >
                            {loading === "Pro" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Upgrade to Pro
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
