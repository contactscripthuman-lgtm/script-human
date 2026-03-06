"use client";

import { motion} from"framer-motion";

export default function ReadyCta() {
    return (
        <section className="py-20 px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20}}
                    whileInView={{ opacity: 1, y: 0}}
                    transition={{ duration: 0.6}}
                    className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white leading-tight"
                >
                    Ready to humanize your <br />
                    digital footprint?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20}}
                    whileInView={{ opacity: 1, y: 0}}
                    transition={{ duration: 0.6, delay: 0.1}}
                    className="text-lg text-gray-500 dark:text-white font-[var(--font-metro)] max-w-xl mx-auto"
                >
                    Join 5,000+ creators and brands who trust Scripthuman to preserve their authentic voice in the age of AI.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9}}
                    whileInView={{ opacity: 1, scale: 1}}
                    transition={{ duration: 0.6, delay: 0.2}}
                    className="flex gap-4 justify-center items-center"
                >
                    <button className="px-8 py-3.5 rounded-full font-bold text-sm bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform font-display">
                        Start Your Audit Now
                    </button>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-white uppercase">No Credit Card Required</span>
                </motion.div>
            </div>
        </section>
    );
}
