import React from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle} from 'lucide-react';

interface Props {
    toolName: string;
    verdict: 'recommended' | 'avoid' | 'caution';
    summary: string;
}

export default function VerdictCard({ toolName, verdict, summary}: Props) {
    const styles = {
        recommended: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            icon: <ThumbsUp className="text-green-600" />,
            title: 'text-green-800',
            badge: 'bg-green-100 text-green-700'
       },
        avoid: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: <ThumbsDown className="text-red-600" />,
            title: 'text-red-800',
            badge: 'bg-red-100 text-red-700'
       },
        caution: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            icon: <AlertTriangle className="text-yellow-600" />,
            title: 'text-yellow-800',
            badge: 'bg-yellow-100 text-yellow-700'
       }
   };

    const style = styles[verdict];

    return (
        <div className={`p-6 rounded-2xl border ${style.bg} ${style.border} my-8 not-prose`}>
            <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg font-bold ${style.title} font-display`}>
                    Verdict: {toolName}
                </h4>
                <div className={`p-2 rounded-full bg-white shadow-sm`}>
                    {style.icon}
                </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-white leading-relaxed font-[family-name:var(--font-metro)]">
                {summary}
            </p>
        </div>
    );
}
