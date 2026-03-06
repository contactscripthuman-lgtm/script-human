"use client";
import { TONE_PROFILES} from"@/lib/analysis/tones";
import { cn} from"@/lib/utils";
import { motion} from"framer-motion";

export default function ToneSelector({ selected, onSelect}: { selected: string | null; onSelect: (id: string) => void}) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {TONE_PROFILES.map((tone) => (
                <motion.button
                    key={tone.id}
                    onClick={() => onSelect(tone.id)}
                    whileHover={{ y: -5}}
                    whileTap={{ scale: 0.95}}
                    className={cn(
                       "px-6 py-4 rounded-xl border transition-all w-full md:w-auto text-left min-w-[200px]",
                        selected === tone.id
                            ?"bg-accent/10 border-accent shadow-[0_0_30px_-10px_var(--accent)]"
                            :"bg-card border-white/5 hover:border-white/10"
                    )}
                >
                    <div className="font-bold text-lg mb-1">{tone.name}</div>
                    <div className="text-xs text-gray-400 dark:text-white">{tone.description}</div>
                </motion.button>
            ))}
        </div>
    );
}
