"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function TrustHubPromo() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50 dark:from-emerald-900/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-teal-50 dark:from-teal-900/20 to-transparent opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50 rounded-full mb-6 text-emerald-700 dark:text-emerald-400">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-wide">Official Verification</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white mb-6 leading-tight">
                            Prove Your Content is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Human</span>
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-white mb-8 leading-relaxed font-sans">
                            In an AI-saturated world, human authenticity is the new premium. Verify your content, earn the
                            <span className="font-bold text-gray-900 dark:text-white mx-1">Script Human™ Seal</span>,
                            and build trust with your audience instantly.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "Generate verifiable certificates for your articles",
                                "Embed the Trust Seal on your website",
                                "Showcase your commitment to quality",
                                "Gain access to the exclusive Trust Hub"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="font-bold text-gray-700 dark:text-white font-display">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/trust-hub" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-sm tracking-wide hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group">
                                Get Certified Now
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Certificate Card Mockup */}
                        <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />

                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                                    <Award size={40} className="text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mb-2">Certificate of Authenticity</h3>
                                <p className="text-sm text-gray-500 dark:text-white mb-6 font-mono">ID: SH-2024-8X92-MN</p>

                                <div className="w-full h-px bg-gray-100 dark:bg-slate-700 mb-6" />

                                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                                    <div className="bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-400 dark:text-white font-bold uppercase">Human Score</p>
                                        <p className="text-xl font-black text-emerald-600">99.8%</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-400 dark:text-white font-bold uppercase">Status</p>
                                        <p className="text-xl font-black text-gray-900 dark:text-white">VERIFIED</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white font-sans">
                                    <FileCheck size={14} />
                                    <span>Verified by Script Human Engine</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 flex items-center gap-3 z-20"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 dark:text-white uppercase">Trust Level</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white">MAXIMUM</p>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
