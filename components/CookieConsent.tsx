"use client";

import { useState, useEffect} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { Cookie, X, Check} from"lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        if (typeof window === 'undefined') return;

        // Check if we should show the banner
        // We poll briefly to catch if the user JUST accepted the ethical overlay
        const interval = setInterval(() => {
            const ethicalAgreed = localStorage.getItem("sh-ethical-agreement");
            const cookieConsent = localStorage.getItem("sh-cookie-consent");

            // Only show if Ethical Overlay is agreed AND Cookie Consent is NOT set
            if (ethicalAgreed ==="true" && !cookieConsent) {
                setIsVisible(true);
                clearInterval(interval);
           }
            // If cookie consent is already set, stop checking
            if (cookieConsent) {
                clearInterval(interval);
           }
       }, 1000);

        return () => clearInterval(interval);
   }, []);

    const handleAccept = () => {
        localStorage.setItem("sh-cookie-consent","true");
        setIsVisible(false);
   };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0}}
                    animate={{ y: 0, opacity: 1}}
                    exit={{ y: 100, opacity: 0}}
                    transition={{ type:"spring", stiffness: 300, damping: 30}}
                    className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-sm z-[90]"
                >
                    <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative overflow-hidden group">

                        {/* Subtle gradient blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-white/60 rounded-xl shadow-sm border border-white/50 text-indigo-600">
                                    <Cookie size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white font-display text-sm mb-1">
                                        We use cookies
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-white font-[var(--font-metro)] leading-relaxed">
                                        To ensure you get the best experience on our website.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-2 px-4 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-gray-200/50 flex items-center justify-center gap-2"
                                >
                                    <Check size={14} />
                                    Accept
                                </button>
                                <button
                                    onClick={handleAccept} // For now, close behaves like accept or we can just hide it for the session
                                    className="px-3 py-2 bg-transparent hover:bg-gray-100/50 text-gray-400 dark:text-white hover:text-gray-600 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
