"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    TrendingUp,
    ShieldCheck,
    Zap,
    Users,
    CheckCircle2,
    XCircle,
    BrainCircuit,
    Ghost,
    Target
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
            <div className="text-4xl md:text-5xl font-black text-orange-900 font-display mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm font-bold text-orange-500 uppercase tracking-widest font-[var(--font-metro)]">
                {label}
            </div>
        </div>
    );
};

export default function WritingRoomWhyUs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Decor */}
            {/* Background Decor Removed */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <TrendingUp size={14} />
                        Market Leader
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6 leading-tight"
                    >
                        Why Scripthuman is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">#1 Choice</span> for Humanization
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 dark:text-white font-[var(--font-metro)]"
                    >
                        While other tools just replace synonyms, we rebuild the semantic structure of your content. See the difference that 7-layer forensic analysis makes.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <AnimatedCounter value={99} label="Bypass Rate" suffix="%" />
                    <AnimatedCounter value={250} label="Million Words Processed" suffix="M+" />
                    <AnimatedCounter value={150} label="Active Updates / Year" suffix="+" />
                </div>

                {/* Comparison Section - The"Visual Proof" */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Visual Comparison */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden relative z-10">
                            {/* Header */}
                            <div className="grid grid-cols-2 border-b border-gray-100">
                                <div className="p-4 bg-gray-50 text-center border-r border-gray-100">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Competitors</div>
                                    <div className="font-bold text-gray-600">Basic Spinning</div>
                                </div>
                                <div className="p-4 bg-orange-50/50 text-center">
                                    <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Scripthuman</div>
                                    <div className="font-bold text-orange-700">Forensic Engine</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                                {/* Bad Side */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Robotic flow & weird synonyms</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Fails Turnitin & GPTZero</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Loses original meaning</div>
                                    </div>
                                </div>

                                {/* Good Side */}
                                <div className="p-6 space-y-4 bg-orange-50/10">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Natural, human cadence</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">100% Undetectable Guarantee</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Context-aware preservation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Semantic Structure Analysis</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    We don&apos;t just swap words. Our engine maps the <span className="text-orange-600 font-bold">semantic DNA</span> of your text, understanding context, nuance, and intent before changing a single character. This ensures the output reads like expert human writing, not &quot;spintax&quot;.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Ghost size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Anti-Fingerprinting Technology</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    AI detectors look for statistical patterns (watermarks). We meticulously <span className="text-orange-600 font-bold">scramble these patterns</span> using randomized perplexity and burstiness injection, making your content statistically invisible to detection algorithms.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Precision Tone Matching</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Need it professional? Casual? Academic? Our <span className="text-orange-600 font-bold">adaptive tone engine</span> ensures the output matches your specific audience, increasing engagement and readability scores simultaneously.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                    <h3 className="text-2xl md:text-3xl font-bold font-display mb-4 relative z-10">
                        Ready to experience the best?
                    </h3>
                    <p className="text-orange-200 mb-8 max-w-xl mx-auto relative z-10">
                        Join over 50,000 writers, students, and professionals who trust Scripthuman for their daily workflow.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-orange-900 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg shadow-black/20 relative z-10 inline-block"
                    >
                        Start Humanizing for Free
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
