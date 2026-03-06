"use client";

import React from"react";
import { motion} from"framer-motion";
import { Star, Quote, MessageCircle, Heart} from"lucide-react";

const testimonials = [
    {
        name:"Jessica Miller",
        role:"Content Director @ ScaleMedia",
        content:"We tested every tool on the market. Scripthuman is the only one that consistently bypasses detection while keeping the writing actually readable.",
        rating: 5,
        initial:"J",
        color:"bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
   },
    {
        name:"David Park",
        role:"University Researcher",
        content:"The academic tone preset is incredible. It fixed my grammar and stylized my paper without losing the technical accuracy I need.",
        rating: 5,
        initial:"D",
        color:"bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
   },
    {
        name:"Sarah Jenkins",
        role:"Freelance Copywriter",
        content:"I use the Trust Hub to verify everything before I submit. My clients appreciate the 'Certified Human' seal—it's become my competitive advantage.",
        rating: 5,
        initial:"S",
        color:"bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
   }
];

export default function HomeTestimonials() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Haze matching Home Page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-orange-50/50 via-white to-purple-50/50 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{ once: true}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm text-gray-500 dark:text-white font-bold text-xs uppercase tracking-wider mb-6"
                    >
                        <Heart size={14} className="text-red-400 fill-red-400" />
                        Community Favorites
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{ once: true}}
                        transition={{ delay: 0.1}}
                        className="text-5xl md:text-6xl font-bold font-display text-[#111827] dark:text-white mb-6 tracking-tight"
                    >
                        Join 20,000+ creators who <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A6C] to-[#FF6B4A]">vibe check</span> their content.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{ once: true}}
                        transition={{ delay: 0.2}}
                        className="text-xl text-gray-500 dark:text-white font-sans"
                    >
                        From students to enterprise teams, we&apos;re the secret weapon for human-grade content.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20}}
                            whileInView={{ opacity: 1, y: 0}}
                            viewport={{ once: true}}
                            transition={{ delay: 0.2 + (i * 0.1)}}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-10 rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-none border border-white dark:border-slate-700 hover:border-orange-100 dark:hover:border-orange-900/50 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${t.color} flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform`}>
                                    {t.initial}
                                </div>
                                <div className="text-orange-200 dark:text-orange-500/20">
                                    <Quote size={40} />
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, r) => (
                                    <Star key={r} size={18} className="fill-orange-400 text-orange-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-white mb-8 text-lg leading-relaxed font-sans">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="pt-8 border-t border-gray-100 dark:border-slate-700">
                                <div className="font-bold text-gray-900 dark:text-white font-display">{t.name}</div>
                                <div className="text-sm text-gray-400 dark:text-white font-medium uppercase tracking-wide">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
