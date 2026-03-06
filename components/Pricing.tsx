"use client";

import { Check, Shield, Award, Zap, Building2 } from "lucide-react";
import { PRICING, UserTier } from "@/lib/usage-limits";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const TIERS = [
    {
        name: "Free",
        price: "0",
        description: "Essential tools for casual users",
        features: [
            "Access to Writing Room (Limited)",
            "Basic Mood Selection",
            "Limited Style Studio Access",
            "Community Support",
        ],
        cta: "Start for Free",
        popular: false,
        icon: <Zap size={20} className="text-gray-400 dark:text-white" />,
    },
    {
        name: "Certificate",
        price: PRICING[UserTier.CERTIFICATE],
        description: "For content creators needing proof",
        features: [
            "Unlimited Certificates",
            "Embeddable Trust Seals",
            "Verify & Download PDFs",
            "No Access to Writing Tools",
        ],
        cta: "Get Certified",
        popular: false,
        icon: <Award size={20} className="text-blue-500" />,
    },
    {
        name: "Pro",
        price: PRICING[UserTier.PRO],
        description: "Power users & professional writers",
        features: [
            "Everything in Certificate",
            "Unlimited Writing Room Access",
            "Advanced Humanization",
            "Multi-layer Analysis",
            "Full Style Studio Access",
            "All Moods Unlocked",
            "Global Region Selection",
        ],
        cta: "Go Pro",
        popular: true,
        icon: <Shield size={20} className="text-orange-500" />,
    },
    {
        name: "Enterprise",
        price: PRICING[UserTier.ENTERPRISE],
        description: "For teams and brands at scale",
        features: [
            "Everything in Pro",
            "Custom Voice Clones",
            "Brand Guardrails API",
            "API Dashboard Access",
            "Unlimited API Generation",
            "Advanced Security",
        ],
        cta: "Go Enterprise",
        popular: false,
        icon: <Building2 size={20} className="text-indigo-500" />,
    },
];

export default function Pricing() {
    const { user } = useAuth();
    return (
        <section id="pricing" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-white max-w-2xl mx-auto font-sans">
                        Choose the plan that fits your creative needs. Upgrade or cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TIERS.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${tier.popular
                                ? "border-orange-500 bg-orange-50/10 shadow-lg scale-105 z-10"
                                : "border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500"
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg ${tier.popular ? 'bg-orange-100 dark:bg-orange-900/40' : 'bg-gray-100 dark:bg-slate-700/50'}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                                <span className="text-gray-500 dark:text-white font-medium">/mo</span>
                                <p className="text-sm text-gray-500 dark:text-white mt-2">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check size={18} className={`mt-0.5 ${tier.popular ? 'text-orange-500' : 'text-green-500'}`} />
                                        <span className="text-sm text-gray-600 dark:text-white font-sans">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {tier.name === "Free" ? (
                                <Link
                                    href="/writing-room"
                                    className="block w-full text-center py-3 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-transform active:scale-95"
                                >
                                    {tier.cta}
                                </Link>
                            ) : (
                                <button
                                    onClick={async () => {
                                        if (tier.name === "Certificate") {
                                            window.location.href = '/compare';
                                            return;
                                        }
                                        if (!user) {
                                            window.location.href = '/signup';
                                            return;
                                        }
                                        try {
                                            const priceMap: Record<string, string> = {
                                                "Pro": process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro',
                                                "Enterprise": process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise'
                                            };
                                            const res = await fetch('/api/stripe/checkout', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ priceId: priceMap[tier.name], uid: user.uid })
                                            });
                                            const data = await res.json();
                                            if (data.url) window.location.href = data.url;
                                        } catch (e) { console.error(e) }
                                    }}
                                    className={`block w-full text-center py-3 rounded-xl font-bold transition-transform active:scale-95 ${tier.popular
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg"
                                        : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
