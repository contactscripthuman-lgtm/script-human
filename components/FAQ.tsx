"use client";
import React, { useState} from 'react';
import { Plus, Minus, HelpCircle} from 'lucide-react';
import { motion, AnimatePresence} from 'framer-motion';

export type FAQItem = {
    question: string;
    answer: string;
};

export type FAQTheme = 'blue' | 'orange' | 'purple' | 'green';

export default function FAQ({ items, theme = 'blue'}: { items: FAQItem[]; theme?: FAQTheme}) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const getThemeStyles = (t: FAQTheme) => {
        switch (t) {
            case 'orange':
                return {
                    badge: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
                    gradient: 'from-orange-500 to-red-500',
                    activeButton: 'bg-orange-500',
                    questionHover: 'group-hover:text-orange-600',
                    questionActive: 'text-orange-600'
               };
            case 'purple':
                return {
                    badge: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                    gradient: 'from-purple-600 to-pink-600',
                    activeButton: 'bg-purple-600',
                    questionHover: 'group-hover:text-purple-600',
                    questionActive: 'text-purple-600'
               };
            case 'green':
                return {
                    badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                    gradient: 'from-emerald-600 to-teal-500',
                    activeButton: 'bg-emerald-600',
                    questionHover: 'group-hover:text-emerald-600',
                    questionActive: 'text-emerald-600'
               };
            default: // blue
                return {
                    badge: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                    gradient: 'from-blue-600 to-violet-600',
                    activeButton: 'bg-blue-600',
                    questionHover: 'group-hover:text-blue-600',
                    questionActive: 'text-blue-600'
               };
       }
   };

    const styles = getThemeStyles(theme);

    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${styles.badge}`}>
                        <HelpCircle size={14} />
                        <span>Common Questions</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-display">
                        Frequently Asked <span className={`text-transparent bg-clip-text bg-gradient-to-r ${styles.gradient}`}>Questions</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="border border-gray-100 dark:border-slate-700/50 rounded-2xl bg-gray-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors group">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-bold text-lg font-display transition-colors ${openIndex === idx ? styles.questionActive : 'text-gray-900 dark:text-white '} ${styles.questionHover}`}>
                                    {item.question}
                                </span>
                                <span className={`p-2 rounded-full transition-all duration-300 ${openIndex === idx ?`${styles.activeButton} text-white rotate-180` : 'bg-white dark:bg-slate-700 text-gray-400 dark:text-white group-hover:scale-110'}`}>
                                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0}}
                                        animate={{ height: 'auto', opacity: 1}}
                                        exit={{ height: 0, opacity: 0}}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 dark:text-white leading-relaxed font-sans border-t border-gray-100/50 dark:border-slate-700/50 mt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
