"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    ShieldCheck,
    Scan,
    Award,
    CheckCircle2,
    XCircle,
    BrainCircuit,
    FileText,
    Search,
    Users,
    FileCheck
} from "lucide-react";

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
        <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg group hover:border-emerald-200 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-emerald-900 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-sm font-bold text-emerald-500 uppercase tracking-widest font-[var(--font-metro)]">
                {label}
            </div>
        </div>
    );
};

export default function TrustHubWhyUs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-emerald-50/30">
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <ShieldCheck size={14} />
                        Forensic Standard
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6 leading-tight"
                    >
                        Guesswork gets you flagged. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Proof gets you verified.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 dark:text-white font-[var(--font-metro)]"
                    >
                        Don&apos;t rely on free detectors that flip-flop on every refresh. Our 4-layer audit provides the forensic proof you need to submit with confidence.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24 text-left">
                    {/* Card 1: AI Samples */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-red-100 transition-all group"
                    >
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                            <BrainCircuit size={28} />
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2 tracking-tight">100k+</div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">AI Samples</div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Outputs from GPT-4, Claude 3, Gemini, and Llama 3, capturing every watermark pattern.
                        </p>
                    </motion.div>

                    {/* Card 2: Human Samples */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-emerald-100 transition-all group"
                    >
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                            <Users size={28} />
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2 tracking-tight">100k+</div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Human Samples</div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Verified academic papers, professional articles, and creative writing for a zero-bias baseline.
                        </p>
                    </motion.div>

                    {/* Card 3: Accuracy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-emerald-900 to-teal-900 p-8 rounded-3xl shadow-xl text-white hover:shadow-2xl hover:shadow-emerald-900/20 transition-all group"
                    >
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-300 mb-6 group-hover:scale-110 transition-transform border border-white/10">
                            <FileCheck size={28} />
                        </div>
                        <div className="text-5xl font-black text-white mb-2 tracking-tight">99.8%</div>
                        <div className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-4">Accuracy</div>
                        <p className="text-sm text-emerald-100/80 leading-relaxed">
                            Our &quot;Triangulation Method&quot; cross-references 4 distinct forensic layers to eliminate false positives.
                        </p>
                    </motion.div>
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl transform rotate-1 opacity-20 blur-xl"></div>
                        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden relative z-10">
                            {/* Header */}
                            <div className="grid grid-cols-2 border-b border-gray-100">
                                <div className="p-4 bg-gray-50 text-center border-r border-gray-100">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Free Detectors</div>
                                    <div className="font-bold text-gray-600">Black Box Guess</div>
                                </div>
                                <div className="p-4 bg-emerald-50/50 text-center">
                                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Trust Hub</div>
                                    <div className="font-bold text-emerald-700">Detailed Audit</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                                {/* Bad Side */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Single % Score</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">No actionable feedback</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Flags own work as AI</div>
                                    </div>
                                </div>

                                {/* Good Side */}
                                <div className="p-6 space-y-4 bg-emerald-50/10">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">4-Layer Breakdown</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Line-by-line Highlighter</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Downloadable Report</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <Scan size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multi-Vector Analysis</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    We cross-reference perplexity (randomness), bursting (variance), linguistic syntax, and fact-checking signals. This <span className="text-emerald-600 font-bold">triangulation method</span> eliminates the &quot;false positives&quot; that plague single-algorithm detectors.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                                <Search size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">False Positive Eraser</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Did Grammarly trigger an AI flag? Our engine specifically identifies <span className="text-teal-600 font-bold">innocent editing patterns</span> and distinguishes them from generative AI artifacts, saving your reputation from unfair accusations.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verified Content Seal</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    When your content passes our audit, generate a cryptographic <span className="text-emerald-600 font-bold">Verified Seal</span>. Embed this on your blog or attach it to your essay to prove human authorship beyond a doubt.
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
                    className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                    <h3 className="text-2xl md:text-3xl font-bold font-display mb-4 relative z-10">
                        Stop worrying. Start verifying.
                    </h3>
                    <p className="text-emerald-200 mb-8 max-w-xl mx-auto relative z-10">
                        Join 20,000+ students and professionals who protect their work with Scripthuman.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-black/20 relative z-10"
                    >
                        Run Free Audit
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
