import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionDivider() {
    return (
        <div className="relative flex items-center py-12">
            <div className="flex-grow border-t border-orange-100 dark:border-slate-700/50"></div>
            <span className="flex-shrink-0 mx-4 text-orange-400 bg-orange-50 dark:bg-slate-800 p-2 rounded-full">
                <Sparkles size={20} />
            </span>
            <div className="flex-grow border-t border-orange-100 dark:border-slate-700/50"></div>
        </div>
    );
}
