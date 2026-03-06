"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck } from "lucide-react";

const testimonials = [
    {
        name: "Michael K.",
        role: "University Student",
        content: "I wrote my entire thesis myself, but Turnitin flagged it as 40% AI. Using Trust Hub's breakdown helped me prove my authorship to my professor.",
        rating: 5,
        initial: "M"
    },
    {
        name: "Sarah L.",
        role: "Freelance Writer",
        content: "Clients were rejecting my work based on cheap, unreliable detectors. The 'Verified Seal' from Trust Hub gave them the proof they needed to pay my invoice.",
        rating: 5,
        initial: "S"
    },
    {
        name: "James Weston",
        role: "Content Director",
        content: "We use this to audit all incoming guest posts. The detailed report shows exactly *why* something is flagged, which is clearer than just a random score.",
        rating: 5,
        initial: "J"
    }
];

export default function TrustHubTestimonials() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <ShieldCheck size={14} />
                        Success Stories
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6"
                    >
                        Verified by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Experts</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all relative group"
                        >
                            <div className="absolute top-8 right-8 text-emerald-100 group-hover:text-emerald-200 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, r) => (
                                    <Star key={r} size={18} className="fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed font-[var(--font-metro)] relative z-10">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 font-bold text-xl">
                                    {t.initial}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{t.name}</div>
                                    <div className="text-sm text-gray-500 font-medium">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
