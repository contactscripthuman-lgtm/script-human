"use client";

import { useState, useEffect} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { Scale, CheckCircle, Lock} from"lucide-react";

export default function EthicalOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        // Check localStorage on mount
        if (typeof window !== 'undefined') {
            const agreement = localStorage.getItem("sh-ethical-agreement");
            if (!agreement) {
                // Small delay to ensure smooth entrance animation after hydration
                const timer = setTimeout(() => setIsVisible(true), 500);
                return () => clearTimeout(timer);
           }
       }
   }, []);

    const handleAgree = () => {
        setHasAgreed(true);
        setTimeout(() => {
            localStorage.setItem("sh-ethical-agreement","true");
            setIsVisible(false);
       }, 600); // Wait for exit animation
   };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.5}}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10}}
                        animate={{ scale: 1, opacity: 1, y: 0}}
                        exit={{ scale: 0.95, opacity: 0, y: 10}}
                        transition={{ type:"spring", damping: 30, stiffness: 400}}
                        className="bg-white/65 backdrop-blur-2xl border border-white/50 rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl relative"
                    >
                        {/* Soft Ambient Glow */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative pt-10 px-8 pb-8 text-center">

                            {/* Icon Badge */}
                            <div className="w-16 h-16 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm mx-auto flex items-center justify-center mb-5 relative z-10">
                                <Scale size={32} className="text-indigo-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-display mb-1">
                                Community Standards
                            </h2>

                            <p className="text-sm font-medium text-gray-500 dark:text-white mb-6">
                                A quick check before you start
                            </p>

                            <div className="bg-white/40 border border-white/60 rounded-2xl p-5 mb-8 text-left space-y-3 shadow-sm">
                                <div className="flex gap-3 items-start">
                                    <div className="min-w-[4px] h-4 mt-1 bg-indigo-500 rounded-full" />
                                    <p className="text-sm font-medium text-gray-700 dark:text-white leading-relaxed font-[var(--font-metro)]">
                                        I confirm I am using Script Human for <span className="font-bold text-indigo-700">creative & compliant</span> purposes only.
                                    </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="min-w-[4px] h-4 mt-1 bg-indigo-500 rounded-full" />
                                    <p className="text-sm font-medium text-gray-700 dark:text-white leading-relaxed font-[var(--font-metro)]">
                                        I am not using this tool for academic dishonesty, fraud, or illegal activities.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleAgree}
                                disabled={hasAgreed}
                                className="w-full py-3.5 rounded-xl bg-gray-900/90 hover:bg-black text-white font-semibold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-gray-200/50 flex items-center justify-center gap-2 group backdrop-blur-sm"
                            >
                                {hasAgreed ? (
                                    <>
                                        <CheckCircle size={20} className="animate-bounce" />
                                        Welcome
                                    </>
                                ) : (
                                    <>
                                        <span className="font-medium font-display">I Understand & Agree</span>
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-gray-400 dark:text-white mt-4 uppercase tracking-wider font-semibold">
                                Secure • Private • Client-Side
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
