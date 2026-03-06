
"use client";

import { motion} from"framer-motion";
import { Lock, Sparkles, Check} from"lucide-react";
import Link from"next/link";
import { PRICING} from"@/lib/usage-limits";

interface LockedFeatureViewProps {
    title: string;
    description: string;
    features: string[];
}

export default function LockedFeatureView({ title, description, features}: LockedFeatureViewProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9}}
                animate={{ opacity: 1, scale: 1}}
                className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                            <Lock size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold font-display mb-2">{title}</h1>
                        <p className="text-slate-300 dark:text-white font-[var(--font-metro)]">{description}</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="p-1 bg-green-100 rounded-full mt-1">
                                    <Check size={14} className="text-green-600" />
                                </div>
                                <span className="text-gray-600 dark:text-white font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="block text-sm text-gray-500 dark:text-white font-bold uppercase tracking-wider">Enterprise Plan</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">${PRICING["enterprise"]}</span>
                            <span className="text-sm text-gray-400 dark:text-white">/mo</span>
                        </div>
                        <Link href="/pricing" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                            Unlock Access
                        </Link>
                    </div>

                    <p className="text-xs text-gray-400 dark:text-white">
                        Need a custom solution? <Link href="/contact" className="text-blue-500 hover:underline">Contact Sales</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
