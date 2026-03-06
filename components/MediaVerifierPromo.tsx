"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanSearch, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function MediaVerifierPromo() {
    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Dark Tech Background */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 text-purple-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide">New Beta Feature</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
                            AI Media Verification <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Now in Beta</span>
                        </h2>

                        <p className="text-lg text-gray-400 dark:text-white mb-8 leading-relaxed font-sans">
                            Don't just trust what you see. Our new multi-modal verification engine analyzes images and video for deepfake artifacts, metadata inconsistencies, and generative noise patterns.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/trust-hub?tool=media" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 transition-all shadow-lg shadow-white/10 group">
                                <ScanSearch size={18} className="text-purple-600" />
                                Try Media Verifier
                            </Link>

                            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 dark:text-white font-bold uppercase mb-0.5">Accuracy</p>
                                    <p className="text-sm font-bold text-white">84.8% (Beta)</p>
                                </div>
                                <div className="w-px h-8 bg-white/10" />
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 dark:text-white font-bold uppercase mb-0.5">Speed</p>
                                    <p className="text-sm font-bold text-white">&lt; 2.5s</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Visuals - Scanner Simulation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl"
                    >
                        {/* Scanning Line */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-full h-1 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-20"
                        />

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 h-full">
                            {/* Real Image Side */}
                            <div className="relative h-full bg-gray-900 flex items-center justify-center border-r border-gray-700">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                                        <CheckCircle2 size={32} className="text-green-500" />
                                    </div>
                                    <p className="text-green-400 font-bold text-lg">Authentic</p>
                                </div>
                                <div className="absolute bottom-4 left-4 text-[10px] text-gray-600 dark:text-white font-mono">IMG_8824.RAW</div>
                            </div>

                            {/* Fake Image Side */}
                            <div className="relative h-full bg-gray-900 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
                                        <AlertTriangle size={32} className="text-red-500" />
                                    </div>
                                    <p className="text-red-400 font-bold text-lg">Synthetic</p>
                                </div>
                                <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 dark:text-white font-mono">GEN_V5.PNG</div>
                            </div>
                        </div>

                        {/* Overlay UI */}
                        <div className="absolute top-4 left-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 flex justify-between items-center text-xs text-gray-300 dark:text-white font-mono">
                            <span>SCANNING MODE: DEEPFAKE_DETECTION_V2</span>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                ACTIVE
                            </span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
