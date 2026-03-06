"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, X, ShieldCheck, Zap, Building2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

// ── Plan configuration ────────────────────────────────────────────────────────
const PLAN_CONFIG = {
    certificate: {
        name: "Certificate Plan",
        price: "$6.99",
        priceId: process.env.NEXT_PUBLIC_STRIPE_CERTIFICATE_PRICE_ID || 'price_cert',
        color: "from-emerald-500 to-teal-500",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        icon: ShieldCheck,
        badge: "Certificate",
    },
    pro: {
        name: "Pro Plan",
        price: "$19.99",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro',
        color: "from-purple-500 to-indigo-500",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        icon: Zap,
        badge: "Pro",
    },
    enterprise: {
        name: "Enterprise Plan",
        price: "$39.00",
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise',
        color: "from-orange-500 to-red-500",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        icon: Building2,
        badge: "Enterprise",
    },
};

export type PlanTier = keyof typeof PLAN_CONFIG;

export default function UpgradeModal({
    isOpen,
    onClose,
    title = "Upgrade Required",
    message = "Upgrade your plan to unlock this feature.",
    planTier = "pro",
    // Legacy props - kept for backward compatibility but planTier takes precedence
    customPrice,
    planName,
    features,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    planTier?: PlanTier;
    // Legacy
    customPrice?: number;
    planName?: string;
    features?: string[];
}) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const plan = PLAN_CONFIG[planTier];
    const PlanIcon = plan.icon;

    const handleUpgrade = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: plan.priceId, uid: user.uid }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 24 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 max-w-sm w-full text-center border border-gray-100 dark:border-slate-800 relative overflow-hidden"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Lock icon */}
                        <div className={`w-16 h-16 ${plan.iconBg} dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                            <Lock className="w-8 h-8 text-orange-500" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-3">
                            {title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                            {message}
                        </p>

                        {/* Price badge */}
                        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${plan.color} rounded-2xl px-5 py-3 mb-6 w-full justify-center`}>
                            <PlanIcon className="w-5 h-5 text-white" />
                            <span className="text-white font-black text-xl">{plan.price}<span className="text-white/70 text-sm font-medium">/mo</span></span>
                            <span className="ml-2 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">{plan.badge}</span>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleUpgrade}
                            disabled={loading || !user}
                            className="w-full group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30 disabled:opacity-60"
                        >
                            <span>{loading ? "Redirecting..." : `Unlock ${plan.badge}`}</span>
                            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        {/* Small plan note */}
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
                            Billed monthly · Cancel anytime
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
