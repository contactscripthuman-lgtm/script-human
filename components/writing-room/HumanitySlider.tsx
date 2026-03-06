"use client";

import { motion} from"framer-motion";

interface Props {
    value: number;
    onChange: (val: number) => void;
}

export default function HumanitySlider({ value, onChange}: Props) {
    const getLabel = () => {
        if (value < 30) return"Safe / Academic";
        if (value < 70) return"Conversational";
        return"Chaotic / Human";
   };

    const getColor = () => {
        if (value < 30) return"text-blue-500";
        if (value < 70) return"text-orange-500";
        return"text-purple-500";
   };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center font-display">
                <span className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest">Humanity Level</span>
                <span className={`text-lg font-black ${getColor()}`}>{getLabel()}</span>
            </div>

            <div className="relative w-full h-8 flex items-center">
                {/* Track */}
                <div className="absolute w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 via-orange-400 to-purple-500"
                        style={{ width:`${value}%`}}
                    />
                </div>

                {/* Thumb */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Visible Thumb */}
                <motion.div
                    className="absolute w-6 h-6 bg-white border-2 border-gray-900 rounded-full shadow-lg pointer-events-none"
                    style={{ left:`calc(${value}% - 12px)`}}
                />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 dark:text-white font-bold uppercase tracking-wider font-[var(--font-metro)]">
                <span>0% (Safe)</span>
                <span>50% (Natural)</span>
                <span>100% (Chaotic)</span>
            </div>
        </div>
    );
}
