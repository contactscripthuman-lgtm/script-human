import React from 'react';
import { LucideIcon, CheckCircle2} from 'lucide-react';

interface BenefitItem {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ToolBenefitsProps {
    title: string;
    subtitle: string;
    benefits: BenefitItem[];
    theme:"indigo" |"rose" |"emerald" |"purple"; // Matches tool themes
}

export default function ToolBenefits({ title, subtitle, benefits, theme}: ToolBenefitsProps) {
    const themeColors = {
        indigo: { bg:"bg-indigo-50", text:"text-indigo-900", accent:"text-indigo-600", border:"border-indigo-100", iconBg:"bg-indigo-100"},
        rose: { bg:"bg-rose-50", text:"text-rose-900", accent:"text-rose-600", border:"border-rose-100", iconBg:"bg-rose-100"},
        emerald: { bg:"bg-emerald-50", text:"text-emerald-900", accent:"text-emerald-600", border:"border-emerald-100", iconBg:"bg-emerald-100"},
        purple: { bg:"bg-purple-50", text:"text-purple-900", accent:"text-purple-600", border:"border-purple-100", iconBg:"bg-purple-100"},
   };

    const colors = themeColors[theme];

    return (
        <div className="w-full py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-white max-w-2xl mx-auto font-[var(--font-metro)]">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 text-${theme}-600`}>
                                <benefit.icon size={28} className={colors.accent} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-display">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-500 dark:text-white leading-relaxed text-sm font-[var(--font-metro)]">
                                {benefit.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
                                <CheckCircle2 size={14} className={colors.accent} />
                                <span className={colors.accent}>Proven Advantage</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
