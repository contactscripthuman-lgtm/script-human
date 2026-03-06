"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Users, Code2, TrendingUp, Zap, FileText } from 'lucide-react';

interface EnterpriseCardProps {
    title: string;
    description: string;
    stats: string;
    icon: React.ReactNode;
    gradient: string;
    href: string;
    comingSoon?: boolean;
}

export default function EnterpriseCard({
    title,
    description,
    stats,
    icon,
    gradient,
    href,
    comingSoon = false
}: EnterpriseCardProps) {
    if (comingSoon) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative group"
            >
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden transition-all duration-300">
                    <div className={`absolute top-0 right-0 w-40 h-40 ${gradient} blur-3xl opacity-20`} />

                    <div className={`relative mb-6 w-16 h-16 rounded-2xl ${gradient} bg-opacity-10 flex items-center justify-center border border-white/10`}>
                        <div className="text-white">
                            {icon}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 font-display">
                        {title}
                    </h3>
                    <p className="text-slate-300 dark:text-white text-sm mb-6 font-[var(--font-metro)] leading-relaxed">
                        {description}
                    </p>

                    <div className="flex justify-between items-end">
                        <div className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {stats}
                        </div>
                        <div className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-400 dark:text-white rounded-xl font-medium text-sm">
                            Coming Soon
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <Link href={href} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer h-full"
            >
                {/* Glassmorphic Card - Light Theme Optimized */}
                <div className="relative h-full flex flex-col p-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:border-orange-200 group-hover:shadow-2xl group-hover:shadow-orange-500/10">

                    {/* Gradient Glow Background */}
                    <div className={`absolute top-0 right-0 w-40 h-40 ${gradient} blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none`} />

                    {/* Icon Container */}
                    <div className={`relative mb-6 w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        <div className="text-white">
                            {icon}
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 font-[var(--font-metro)] leading-relaxed flex-grow">
                        {description}
                    </p>

                    {/* Stats & CTA */}
                    <div className="flex justify-between items-end mt-auto">
                        <div className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {stats}
                        </div>

                        <div className="px-5 py-2.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-700 group-hover:border-orange-200 transition-all font-medium text-sm">
                            Launch Tool →
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
