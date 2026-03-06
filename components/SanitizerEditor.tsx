"use client";

import { useState, useEffect} from"react";
import { motion} from"framer-motion";
import { Sparkles} from"lucide-react";
import { useRouter} from"next/navigation";

export default function SanitizerEditor() {
    const [text, setText] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const fullText ="Paste your AI-generated text here...";
    const router = useRouter();

    useEffect(() => {
        if (text) {
            setPlaceholder("");
            return;
       }

        let currentIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const animate = () => {
            if (isDeleting) {
                if (currentIndex > 0) {
                    setPlaceholder(fullText.slice(0, currentIndex - 1));
                    currentIndex--;
                    timeoutId = setTimeout(animate, 20); // Faster delete
               } else {
                    isDeleting = false;
                    timeoutId = setTimeout(animate, 500); // Pause before re-typing
               }
           } else {
                if (currentIndex < fullText.length) {
                    setPlaceholder(fullText.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(animate, 50); // Normal typing speed
               } else {
                    isDeleting = true;
                    timeoutId = setTimeout(animate, 2000); // Pause before deleting
               }
           }
       };

        animate();

        return () => clearTimeout(timeoutId);
   }, [text]);

    return (
        <div className="w-full">
            {/* Editor Card - Increased Height */}
            <div className="relative group rounded-[2rem] bg-white dark:bg-slate-800 shadow-[0_40px_100px_-20px_rgba(50,50,93,0.12)] border border-white/60 dark:border-slate-700/60 overflow-hidden min-h-[220px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-full min-h-[220px] p-6 pb-20 bg-transparent text-[1.1rem] resize-none focus:outline-none z-10 relative font-sans text-gray-600 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-mono leading-relaxed active:border-none focus:ring-0"
                    spellCheck={false}
                />

                {/* Actions Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row gap-4 justify-end items-center z-20 pointer-events-none">

                    {/* Right Action - Gradient Button */}
                    <motion.button
                        whileHover={{ scale: 1.02}}
                        whileTap={{ scale: 0.98}}
                        onClick={() => {
                            if (!text) return;
                            if (typeof window !== 'undefined') {
                                localStorage.setItem("writingRoomInitialContent", text);
                                router.push("/writing-room");
                           }
                       }}
                        className="pointer-events-auto px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl shadow-orange-400/30 bg-gradient-to-r from-[#FF9A6C] to-[#FF6B4A] text-white hover:brightness-105 transition-all"
                    >
                        Humanize Now <Sparkles className="w-4 h-4 text-white/90" fill="currentColor" />
                    </motion.button>
                </div>

                {/* Horizontal Divider Line */}
                <div className="absolute bottom-[90px] left-10 right-10 h-px bg-gray-50 dark:bg-slate-700 z-10" />
            </div>
        </div>
    );
}
