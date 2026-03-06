"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type Mood = "professional" | "casual" | "friendly" | "academic" | "storytelling";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelectMood: (mood: Mood) => void;
}

const moods: { value: Mood; label: string; emoji: string; description: string }[] = [
    { value: "professional", label: "Professional", emoji: "💼", description: "Formal & authoritative" },
    { value: "casual", label: "Casual", emoji: "😊", description: "Relaxed & conversational" },
    { value: "friendly", label: "Friendly", emoji: "🤝", description: "Warm & engaging" },
    { value: "academic", label: "Academic", emoji: "🎓", description: "Scholarly & precise" },
    { value: "storytelling", label: "Storytelling", emoji: "📖", description: "Narrative & vivid" },
];

export default function MoodModal({ isOpen, onClose, onSelectMood }: Props) {
    const handleMoodClick = (mood: Mood) => {
        onSelectMood(mood);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 font-display">
                                    Select Mood
                                </h2>
                                <p className="text-sm text-gray-500 mt-1 font-[var(--font-metro)]">
                                    Choose the tone for your humanized content
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Mood Options */}
                        <div className="space-y-3">
                            {moods.map((mood) => (
                                <motion.button
                                    key={mood.value}
                                    onClick={() => handleMoodClick(mood.value)}
                                    className="w-full p-4 rounded-2xl text-left transition-all border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">{mood.emoji}</span>
                                        <div className="flex-1">
                                            <div className="font-bold text-lg font-display text-gray-900 group-hover:text-orange-600">
                                                {mood.label}
                                            </div>
                                            <div className="text-sm text-gray-500 font-[var(--font-metro)]">
                                                {mood.description}
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
