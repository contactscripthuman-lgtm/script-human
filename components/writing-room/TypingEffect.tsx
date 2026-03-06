"use client";

import { useEffect, useState} from"react";

interface TypingEffectProps {
    text: string;
    speed?: number; // ms per character
    onComplete?: () => void;
    className?: string;
}

export default function TypingEffect({ text, speed = 10, onComplete, className}: TypingEffectProps) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText(""); // Reset when text changes
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
           } else {
                clearInterval(timer);
                if (onComplete) onComplete();
           }
       }, speed);

        return () => clearInterval(timer);
   }, [text, speed, onComplete]);

    return (
        <p className={className}>
            {displayedText}
        </p>
    );
}
