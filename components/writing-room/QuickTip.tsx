"use client";

import { useState, useEffect} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { X, Lightbulb} from"lucide-react";

interface QuickTipProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function QuickTip({ isVisible, onClose}: QuickTipProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95}}
                    animate={{ opacity: 1, y: 0, scale: 1}}
                    exit={{ opacity: 0, y: 10, scale: 0.95}}
                    transition={{ duration: 0.3, type:"spring", stiffness: 300, damping: 25}}
                    className="absolute bottom-20 right-6 z-50 max-w-sm"
                >
                    <div className="bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl border border-gray-700 flex items-start gap-3 relative">
                        <div className="bg-orange-500/20 p-2 rounded-lg shrink-0">
                            <Lightbulb className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-sm mb-1 font-display text-orange-100">Quick Tip</h4>
                            <p className="text-xs text-gray-300 dark:text-white leading-relaxed font-[var(--font-metro)]">
                                For the most accurate results, please provide a longer text sample (at least 1000+ words recommended).
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 text-gray-500 dark:text-white hover:text-white transition-colors rounded-full hover:bg-gray-800"
                            aria-label="Close tip"
                        >
                            <X size={14} />
                        </button>

                        {/* Arrow pointing down-left to the text area roughly */}
                        {/* <div className="absolute -bottom-2 right-10 w-4 h-4 bg-gray-900/95 rotate-45 border-b border-r border-gray-700"></div> */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
