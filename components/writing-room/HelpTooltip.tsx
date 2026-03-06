"use client";

import { HelpCircle} from"lucide-react";
import { useState} from"react";

interface Props {
    text: string;
}

export default function HelpTooltip({ text}: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="text-gray-400 dark:text-white hover:text-gray-600 transition-colors"
                aria-label="Help"
            >
                <HelpCircle size={16} />
            </button>

            {show && (
                <div className="absolute right-0 top-8 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 font-[var(--font-metro)] leading-relaxed">
                    {text}
                    <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
            )}
        </div>
    );
}
