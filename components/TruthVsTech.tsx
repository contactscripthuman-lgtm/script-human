"use client";

import { motion} from"framer-motion";
import { Sparkles, Zap, ShieldCheck} from"lucide-react";

export default function TruthVsTech() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Section Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white">
                        The Truth vs. Tech
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-white font-sans">
                        Standard detectors look for patterns. We look for soul. Experience the shift from clinical binary to human nuance.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Card 1: Comparison Table */}
                    <motion.div
                        initial={{ opacity: 0, x: -20}}
                        whileInView={{ opacity: 1, x: 0}}
                        viewport={{ once: true}}
                        className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-700"
                    >
                        <h3 className="text-xl font-bold font-display mb-8 dark:text-white">Platform Edge</h3>

                        <div className="space-y-6">
                            {/* Header Row */}
                            <div className="grid grid-cols-3 text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-white mb-4">
                                <div>Capability</div>
                                <div className="text-red-300">Detectors</div>
                                <div className="text-emerald-500">Scripthuman</div>
                            </div>

                            {/* Rows */}
                            {[
                                { label:"Logic", bad:"Binary", good:"Nuance"},
                                { label:"Voice", bad:"Optical", good:"Branded"},
                                { label:"Accuracy", bad:"Unstable", good:"Verifiable"},
                                { label:"Outcome", bad:"Sterile", good:"Engaging"},
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-3 items-center py-4 border-b border-gray-50 dark:border-slate-700 last:border-0 font-sans text-sm">
                                    <div className="font-bold text-gray-900 dark:text-white">{row.label}</div>
                                    <div className="text-gray-400 dark:text-white italic">{row.bad}</div>
                                    <div className="text-emerald-600 font-bold bg-emerald-50 w-fit px-3 py-1 rounded-full">{row.good}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card 2: Vibe Shift Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20}}
                        whileInView={{ opacity: 1, x: 0}}
                        viewport={{ once: true}}
                        className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-700 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-orange-500" />
                                <h3 className="text-xl font-bold font-display dark:text-white">Vibe Shift</h3>
                            </div>
                            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Interactive Tool</span>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Robotic Input
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl text-gray-400 dark:text-white text-xs italic leading-relaxed">
                                &quot;The strategic alignment of cross-functional synergies will facilitate an optimized trajectory for the enterprise&apos;s digital transformation roadmap.&quot;
                            </div>

                            <div className="py-2">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-gray-900 dark:text-white">Shift Intensity</span>
                                    <span className="text-orange-500">82% Humanized</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full relative">
                                    <div className="absolute top-0 left-0 h-full w-[82%] bg-gradient-to-r from-orange-300 to-orange-500 rounded-full" />
                                    <div className="absolute top-1/2 -translate-y-1/2 left-[82%] w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-md" />
                                </div>
                            </div>

                            <div className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Human Output
                                </div>
                                <p className="text-gray-800 dark:text-white font-medium text-sm leading-relaxed">
                                    &quot;We&apos;re bringing teams together to make sure our tech works for people, not the other way around. It&apos;s about moving forward with purpose.&quot;
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
