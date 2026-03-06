"use client";

import Link from"next/link";
import { motion} from"framer-motion";
import { Sparkles, Check} from"lucide-react";

export default function WebToolPromo() {
    return (
        <section className="py-20 bg-orange-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-white/60 dark:bg-slate-800/60 rounded-full blur-3xl mix-blend-overlay" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20}}
                    whileInView={{ opacity: 1, y: 0}}
                    viewport={{ once: true}}
                    transition={{ duration: 0.6}}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white leading-tight">
                        Experience the Power of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">ScriptHuman WebTool</span>
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-white font-sans max-w-2xl mx-auto">
                        Instantly humanize your AI text, check for detection, and polish your writing—all in one place.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <Link href="/writing-room" className="group relative inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg tracking-wide hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Try Web Tool Free <Sparkles size={18} />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <p className="text-sm text-gray-500 dark:text-white font-medium flex items-center gap-2">
                            <Check size={14} className="text-green-500" />
                            No credit card required
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
