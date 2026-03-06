"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    Fingerprint,
    Palette,
    Layers,
    Users,
    CheckCircle2,
    XCircle,
    Mic2,
    Sparkles,
    Variable
} from "lucide-react";

// Animated Counter Component (Reused logic for consistency)
const AnimatedCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
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
        <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg group hover:border-orange-200 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-orange-900 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-sm font-bold text-orange-500 uppercase tracking-widest font-[var(--font-metro)]">
                {label}
            </div>
        </div>
    );
};

export default function StyleStudioWhyUs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-orange-50/30">
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
                        <Fingerprint size={14} />
                        Identity Engine
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6 leading-tight"
                    >
                        Don&apos;t just rewrite. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Clone your Digital Soul.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 dark:text-white font-[var(--font-metro)]"
                    >
                        Generic AI sounds like... AI. We capture the microscopic linguistic nuances that make you <i>you</i>—preserving your unique voice across every platform.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <AnimatedCounter value={54} label="Linguistic Markers" suffix="+" />
                    <AnimatedCounter value={100} label="Style Consistency" suffix="%" />
                    <AnimatedCounter value={1} label="Click Cloning" suffix="st" />
                </div>

                {/* Comparison Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Visual Comparison */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl transform -rotate-2 opacity-20 blur-xl"></div>
                        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden relative z-10">
                            {/* Header */}
                            <div className="grid grid-cols-2 border-b border-gray-100">
                                <div className="p-4 bg-gray-50 text-center border-r border-gray-100">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Standard AI</div>
                                    <div className="font-bold text-gray-600">Prompt Engineering</div>
                                </div>
                                <div className="p-4 bg-orange-50/50 text-center">
                                    <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Style Studio</div>
                                    <div className="font-bold text-orange-700">Linguistic DNA</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                                {/* Bad Side */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Generic, flat tone</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Inconsistent formatting</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Requires complex prompts</div>
                                    </div>
                                </div>

                                {/* Good Side */}
                                <div className="p-6 space-y-4 bg-orange-50/10">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Exact vocabulary match</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Rhythmic structure cloning</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Zero-shot adaptation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Fingerprint size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">54-Point Identity Mapping</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    We analyze sentence length variance, active vs. passive voice ratios, contraction usage, and 50 other parameters to create a <span className="text-orange-600 font-bold">computational model of your brain</span>.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Voice Synchronization</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Have 10 writers but need 1 voice? Style Studio acts as a <span className="text-amber-600 font-bold">brand governance layer</span>, ensuring every tweet, blog, and email sounds like it came from the same founder.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Omnichannel Adaptation</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Your LinkedIn voice isn&apos;t your Twitter voice. Create unlimited personas and instantly transform a single core idea into <span className="text-amber-600 font-bold">platform-native formats</span> without losing your essence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-orange-900 to-amber-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

                    <h3 className="text-2xl md:text-3xl font-bold font-display mb-4 relative z-10">
                        Stop sounding generic. Start sounding like YOU.
                    </h3>
                    <p className="text-orange-100 mb-8 max-w-xl mx-auto relative z-10">
                        Create your first Digital Soul in less than 30 seconds.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-orange-900 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg shadow-black/20 relative z-10"
                    >
                        Clone My Voice Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
