"use client";

import React from"react";
import { Sparkles, MessageSquare, Mail} from"lucide-react";
import { motion} from"framer-motion";

export default function SpecializedToolsPromo() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800/50 overflow-hidden relative border-t border-gray-100 dark:border-slate-800 font-[family-name:var(--font-metro)]">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-50/40 via-purple-50/40 dark:from-indigo-900/20 dark:via-purple-900/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-50/40 via-red-50/40 dark:from-orange-900/20 dark:via-red-900/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 mb-6 font-bold text-sm tracking-wide">
                        <Sparkles size={16} fill="currentColor" />
                        <span>Specialized Writing Tools</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 font-display leading-tight">
                        Tailor Your Tone for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Every Platform</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-white leading-relaxed">
                        Whether you are crafting a viral social media post or a professional business email, our targeted tools ensure your message lands perfectly every time.
                    </p>
                </div>

                {/* Unified Semantic Feature Card */}
                <motion.article
                    initial={{ opacity: 0, scale: 0.95}}
                    whileInView={{ opacity: 1, scale: 1}}
                    viewport={{ once: true}}
                    transition={{ duration: 0.5, ease:"easeOut"}}
                    className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-slate-700 relative group overflow-hidden"
                    aria-labelledby="promo-tools-title"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-purple-50/30 dark:from-orange-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                    {/* Dual Column Content */}
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 mb-12">

                        {/* Social Media Column */}
                        <motion.div
                            whileHover={{ y: -8}}
                            transition={{ duration: 0.3, type:"spring", stiffness: 300}}
                            className="flex flex-col h-full bg-transparent relative z-20 group/col"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0]}}
                                transition={{ duration: 4, repeat: Infinity, ease:"easeInOut"}}
                                className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm border border-blue-100 dark:border-blue-800/50 group-hover/col:bg-blue-100 dark:group-hover/col:bg-blue-900/50 transition-colors"
                            >
                                <MessageSquare size={32} />
                            </motion.div>

                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 font-display">
                                Social Media Tone Editor
                            </h3>

                            <p className="text-gray-600 dark:text-white mb-6 leading-relaxed flex-grow text-lg">
                                Transform robotic AI drafts into engaging, platform-specific posts. Select from LinkedIn, Twitter (X), Instagram, or Facebook to nail the exact vibe and format your audience expects.
                            </p>

                            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700 mt-auto">
                                <div className="flex gap-2 flex-wrap">
                                    {['LinkedIn', 'Twitter', 'Instagram', 'Facebook'].map((platform) => (
                                        <motion.span
                                            key={platform}
                                            whileHover={{ scale: 1.05, y: -2}}
                                            className="px-3 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full text-xs font-bold text-gray-500 dark:text-white shadow-sm cursor-default hover:border-blue-300 hover:text-blue-600 transition-colors"
                                        >
                                            {platform}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Email Column */}
                        <motion.div
                            whileHover={{ y: -8}}
                            transition={{ duration: 0.3, type:"spring", stiffness: 300}}
                            className="flex flex-col h-full bg-transparent relative z-20 group/col"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0]}}
                                transition={{ duration: 4.5, repeat: Infinity, ease:"easeInOut", delay: 0.5}}
                                className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 shadow-sm border border-purple-100 dark:border-purple-800/50 group-hover/col:bg-purple-100 dark:group-hover/col:bg-purple-900/50 transition-colors"
                            >
                                <Mail size={32} />
                            </motion.div>

                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 font-display">
                                Humanized Email Writer
                            </h3>

                            <p className="text-gray-600 dark:text-white mb-6 leading-relaxed flex-grow text-lg">
                                Never send a stiff, AI-sounding email again. Ensure your professional communications sound genuine, thoughtful, and human—perfect for networking, sales, or team updates.
                            </p>

                            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5 border border-gray-100 dark:border-slate-700 mt-auto">
                                <div className="flex items-center justify-between text-sm">
                                    <strong className="text-gray-700 dark:text-white">Tone Options:</strong>
                                    <span className="text-purple-600 font-medium tracking-wide">Professional • Friendly • Casual</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>


                </motion.article>

            </div>
        </section>
    );
}
