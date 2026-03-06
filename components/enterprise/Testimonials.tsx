"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Building2, TrendingUp } from "lucide-react";

const testimonials = [
    {
        name: "Elena V.",
        role: "CTO, TechFlow",
        content: "API integration was seamless. We process 2M+ words daily with zero latency issues. The scalability is exactly what we needed.",
        rating: 5,
        initial: "E"
    },
    {
        name: "Mark Thompson",
        role: "Head of Content, MediaGrid",
        content: "The brand voice customization at an API level is impressive. We maintain consistency across 50+ writers automatically.",
        rating: 5,
        initial: "M"
    },
    {
        name: "Sarah Jenkins",
        role: "Operations Manager",
        content: "Compliance and security were our top priorities. Their SOC2 readiness and data privacy features sealed the deal.",
        rating: 5,
        initial: "S"
    }
];

export default function EnterpriseTestimonials() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <Building2 size={14} />
                        Enterprise Trusted
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6"
                    >
                        Powering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry Leaders</span>
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
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all relative group"
                        >
                            <div className="absolute top-8 right-8 text-blue-50 group-hover:text-blue-100 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, r) => (
                                    <Star key={r} size={18} className="fill-blue-400 text-blue-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed font-[var(--font-metro)] relative z-10">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-xl">
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
