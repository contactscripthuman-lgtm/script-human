"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

export default function ComplianceOverlay() {
    // Start with false to avoid hydration mismatch, check in useEffect
    const [isVisible, setIsVisible] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Check if user has already agreed
        const hasAgreed = localStorage.getItem("scripthuman_compliance_agreed");
        if (!hasAgreed) {
            setIsVisible(true);
        }
    }, []);

    const handleAgree = () => {
        // Set local storage
        localStorage.setItem("scripthuman_compliance_agreed", "true");

        // Show welcome message
        setShowWelcome(true);

        // Hide overlay after delay
        setTimeout(() => {
            setIsVisible(false);
        }, 2500);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-none p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-md w-full text-center border border-white/20 relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {!showWelcome ? (
                                <motion.div
                                    key="compliance"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <ShieldAlert className="w-8 h-8 text-blue-500" />
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold font-display text-gray-900">
                                            Ethical Use Policy
                                        </h2>
                                        <div className="text-left bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-gray-600 text-sm font-medium mb-2">By continuing, you agree to not use this tool for:</p>
                                            <ul className="space-y-2 text-sm text-gray-500 list-disc pl-4">
                                                <li>Fraudulent activities or scams</li>
                                                <li>Academic dishonesty or cheating</li>
                                                <li>Creating misleading or illegal content</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={handleAgree}
                                            className="w-full group relative flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                                        >
                                            <span>Agree & Continue</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                                            By clicking above, you agree to our <span className="underline cursor-pointer hover:text-gray-800">Privacy Policy</span>, <span className="underline cursor-pointer hover:text-gray-800">Terms of Service</span>, and accept our use of <span className="underline cursor-pointer hover:text-gray-800">Cookies</span>.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="welcome"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6 py-4"
                                >
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold font-display text-gray-900">
                                            Welcome!
                                        </h2>
                                        <p className="text-gray-500">
                                            You're all set to restore the human vibe.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
