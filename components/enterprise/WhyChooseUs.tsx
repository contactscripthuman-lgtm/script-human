"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    Lock,
    Zap,
    Scale,
    CheckCircle2,
    XCircle,
    Server,
    Shield,
    Globe
} from "lucide-react";
import Link from "next/link";

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
        <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg group hover:border-purple-200 transition-colors">
            <div className="text-4xl md:text-5xl font-black text-purple-900 font-display mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-sm font-bold text-purple-500 uppercase tracking-widest font-[var(--font-metro)]">
                {label}
            </div>
        </div>
    );
};

export default function EnterpriseWhyUs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-purple-50/30">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[140px] mix-blend-multiply" />
                <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[140px] mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <Lock size={14} />
                        Enterprise Grade
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6 leading-tight"
                    >
                        Security isn&apos;t a feature. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">It&apos;s the foundation.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 dark:text-white font-[var(--font-metro)]"
                    >
                        Built for organizations that can&apos;t afford data leaks. We process everything locally in your browser or your private VPC—never on shared public servers.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <AnimatedCounter value={200} label="Latency (ms)" suffix="<" />
                    <AnimatedCounter value={0} label="Data Retention" suffix="%" />
                    <AnimatedCounter value={99} label="Uptime SLA" suffix=".9%" />
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
                        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-purple-500/20 overflow-hidden relative z-10">
                            {/* Header */}
                            <div className="grid grid-cols-2 border-b border-gray-100">
                                <div className="p-4 bg-gray-50 text-center border-r border-gray-100">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Standard SaaS</div>
                                    <div className="font-bold text-gray-600">Cloud Processing</div>
                                </div>
                                <div className="p-4 bg-purple-50/50 text-center">
                                    <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Enterprise Hub</div>
                                    <div className="font-bold text-purple-700">Local-First</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                                {/* Bad Side */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Data leaves your device</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Shared API limits</div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <XCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-500 font-medium">Compliance risks</div>
                                    </div>
                                </div>

                                {/* Good Side */}
                                <div className="p-6 space-y-4 bg-purple-50/10">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Client-side sanitization</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">Unlimited throughput</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-gray-800 font-bold">GDPR/CCPA Ready</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Zero-Retention Architecture</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Our engine runs via WebAssembly directly in your browser or through a private container in your cloud. No text ever logs to our servers, making us the <span className="text-purple-600 font-bold">safest choice</span> for legal, medical, and financial data.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-Time Latency</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Need to sanitize live chat support or dynamic content? Our localized processing removes network overhead, delivering results in <span className="text-indigo-600 font-bold">under 200 milliseconds</span> at any scale.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                <Scale size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Brand Compliance Guardrails</h3>
                                <p className="text-gray-500 dark:text-white leading-relaxed text-sm">
                                    Upload your style guide and banned word lists. We automatically enforce <span className="text-violet-600 font-bold">terminology consistency</span> across your entire organization, preventing off-brand communication before it happens.
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
                    className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                    <h3 className="text-2xl md:text-3xl font-bold font-display mb-4 relative z-10">
                        Secure your workflow today.
                    </h3>
                    <p className="text-purple-200 mb-8 max-w-xl mx-auto relative z-10">
                        The integrity of local processing with the power of cloud AI.
                    </p>

                    <Link
                        href="/payment?plan=enterprise"
                        className="inline-block bg-white text-purple-900 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-black/20 relative z-10"
                    >
                        Scale Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
