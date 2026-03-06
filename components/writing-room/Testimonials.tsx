"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Freelance Copywriter",
        content: "I was skeptical at first, but this tool is a lifesaver. It doesn't just spin content; it genuinely rewrites it with a human voice. My clients can't tell the difference.",
        rating: 5,
        initial: "S"
    },
    {
        name: "David Chen",
        role: "SEO Specialist",
        content: "Finally, a humanizer that bypasses Turnitin and GPTZero consistently. The 'Forensic Engine' mode is worth every penny for the peace of mind.",
        rating: 5,
        initial: "D"
    },
    {
        name: "Emily R.",
        role: "Content Manager",
        content: "The output quality is surprisingly high. It preserves the original meaning perfectly while fixing the robotic tone. Essential for our batch workflows.",
        rating: 5,
        initial: "E"
    }
];

export default function WritingRoomTestimonials() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-orange-50/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200 text-orange-700 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <User size={14} />
                        Community Love
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6"
                    >
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">50,000+ Writers</span>
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
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all relative group"
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
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-orange-700 font-bold text-xl">
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
