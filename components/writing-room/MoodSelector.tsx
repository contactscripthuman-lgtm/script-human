"use client";

import { motion} from"framer-motion";

export type Mood ="professional" |"casual" |"friendly" |"academic" |"storytelling";

interface Props {
    value: Mood;
    onChange: (mood: Mood) => void;
}

const moods: { value: Mood; label: string; emoji: string; description: string}[] = [
    { value:"professional", label:"Professional", emoji:"💼", description:"Formal & authoritative"},
    { value:"casual", label:"Casual", emoji:"😊", description:"Relaxed & conversational"},
    { value:"friendly", label:"Friendly", emoji:"🤝", description:"Warm & engaging"},
    { value:"academic", label:"Academic", emoji:"🎓", description:"Scholarly & precise"},
    { value:"storytelling", label:"Storytelling", emoji:"📖", description:"Narrative & vivid"},
];

export default function MoodSelector({ value, onChange}: Props) {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
                {moods.map((mood) => (
                    <motion.button
                        key={mood.value}
                        onClick={() => onChange(mood.value)}
                        className={`p-3 rounded-xl text-left transition-all border-2 ${value === mood.value
                            ?"border-orange-500 bg-orange-50"
                            :"border-gray-200 bg-white hover:border-gray-300"
                           }`}
                        whileHover={{ scale: 1.02}}
                        whileTap={{ scale: 0.98}}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{mood.emoji}</span>
                            <div className="flex-1">
                                <div className={`font-bold text-sm font-display ${value === mood.value ?"text-orange-600" :"text-gray-900 dark:text-white"
                                   }`}>
                                    {mood.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-white font-[var(--font-metro)]">
                                    {mood.description}
                                </div>
                            </div>
                            {value === mood.value && (
                                <motion.div
                                    initial={{ scale: 0}}
                                    animate={{ scale: 1}}
                                    className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"
                                >
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
