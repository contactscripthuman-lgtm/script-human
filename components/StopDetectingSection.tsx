"use client";

import { motion} from"framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck} from"lucide-react";
import Link from"next/link";

export default function StopDetectingSection() {
    return (
        <section id="stop-detecting" className="relative py-24 px-6 overflow-hidden bg-white dark:bg-slate-900">
            {/* Background Decor - Gentle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/20 to-orange-50/30 pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Column: Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{ once: true}}
                        transition={{ duration: 0.6}}
                    >
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold tracking-widest uppercase font-display mb-6">
                            The Humanization Engine
                        </span>

                        <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                            Stop <br />Detecting. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Start Humanizing.</span>
                        </h2>

                        <p className="text-lg text-gray-500 dark:text-white leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Reclaim your digital authenticity. We transform sterile AI outputs into resonant human narratives that bypass detectors and connect with readers.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{ once: true}}
                        transition={{ duration: 0.6, delay: 0.2}}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                    >
                        <Link href="/trust-hub" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 bg-[#E86C45] border border-transparent rounded-full hover:bg-[#d65a34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 shadow-lg shadow-orange-500/20">
                            Start Analyze Content
                        </Link>
                        <Link href="/writing-room" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-gray-700 dark:text-white transition-all duration-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 shadow-sm">
                            Humanize
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column: Visual Cards */}
                <div className="relative h-[450px] sm:h-[400px] w-full flex items-center justify-center mt-8 lg:mt-0">

                    {/* Background Blur Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-r from-red-100/50 to-green-100/50 rounded-full blur-[60px] sm:blur-[80px]" />

                    {/* Card 1: Standard AI (Background/Top Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, y: -20, rotate: -6}}
                        whileInView={{ opacity: 1, x: -20, y: -40, rotate: -6}}
                        viewport={{ once: true}}
                        transition={{ duration: 0.8, delay: 0.3}}
                        className="absolute w-full max-w-[280px] sm:max-w-[320px] bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-red-100 dark:border-red-900/40 z-10 left-4 sm:left-auto"
                        style={{ transformOrigin:"bottom right"}}
                    >
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                                <AlertTriangle size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-white uppercase tracking-wider">Status: Standard AI</p>
                                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">99.8% Probability</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width:"0%"}}
                                whileInView={{ width:"99.8%"}}
                                transition={{ duration: 1, delay: 0.6}}
                                className="h-full bg-red-500 rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* Card 2: ScriptHuman (Foreground/Center Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: 20}}
                        whileInView={{ opacity: 1, x: 20, y: 40}}
                        viewport={{ once: true}}
                        transition={{ duration: 0.8, delay: 0.5}}
                        className="absolute w-full max-w-[300px] sm:max-w-[340px] bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-green-100 dark:border-green-900/40 z-20 right-4 sm:right-auto"
                    >
                        <div className="flex items-center gap-4 mb-4 sm:mb-6">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-white uppercase tracking-wider">Status: ScriptHuman</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Verified Authentic</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                                initial={{ width:"0%"}}
                                whileInView={{ width:"100%"}}
                                transition={{ duration: 1, delay: 0.8}}
                                className="h-full bg-green-500 rounded-full"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
