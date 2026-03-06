"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Palette } from "lucide-react";

const testimonials = [
    {
        name: "Alex Rivera",
        role: "Blog Editor",
        content: "The ability to switch from 'Professional' to 'Witty' instantly is a game changer. It actually understands the nuance of the tone I'm asking for.",
        rating: 5,
        initial: "A"
    },
    {
        name: "Jessica Moth",
        role: "Social Media Manager",
        content: "I use the 'Viral' preset for all our LinkedIn posts. Engagement is up 40% because it sounds like a real person, not a corporate bot.",
        rating: 5,
        initial: "J"
    },
    {
        name: "Dr. Marcus T.",
        role: "Academic Researcher",
        content: "The 'Academic' style creates formal, structured prose without losing the original meaning. It's like having a professional editor on standby.",
        rating: 5,
        initial: "M"
    }
];

export default function StyleStudioTestimonials() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-orange-50/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <Palette size={14} />
                        Creator Stories
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6"
                    >
                        Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Creators & Pros</span>
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
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all relative group"
                        >
                            <div className="absolute top-8 right-8 text-orange-100 group-hover:text-orange-200 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, r) => (
                                    <Star key={r} size={18} className="fill-orange-400 text-orange-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed font-[var(--font-metro)] relative z-10">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-700 font-bold text-xl">
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
