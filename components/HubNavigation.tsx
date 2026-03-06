"use client";

import { motion } from "framer-motion";
import { PenTool, Palette, Building2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HubNavigation() {
    const items = [
        { label: "The Writing Room", icon: PenTool, color: "text-orange-500", bg: "bg-orange-50", href: "/writing-room" },
        { label: "The Style Studio", icon: Palette, color: "text-purple-500", bg: "bg-purple-50", href: "/style-studio" },
        { label: "Enterprise Hub", icon: Building2, color: "text-purple-600", bg: "bg-gradient-to-r from-purple-50 to-pink-50", href: "/enterprise", special: true },
        { label: "The Trust Hub", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", href: "/trust-hub" },
    ];

    return (
        <div className="w-full flex flex-col items-center gap-4 mt-4 mb-0 relative z-30">
            <h3 className="text-gray-500 font-medium font-[var(--font-metro)]">
                Not sure where to start? Try one of these:
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
                {items.map((item, i) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="group relative block z-40"
                    >
                        <div
                            className={`flex items-center gap-3 px-6 py-3 border rounded-full shadow-sm transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:scale-105 group-active:scale-95 cursor-pointer ${item.special
                                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/50 relative overflow-hidden'
                                : 'bg-white border-gray-100 hover:shadow-md'
                                }`}
                        >
                            {/* Special conic gradient glow for Enterprise Hub */}
                            {item.special && (
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#06b6d4,#a855f7,#ec4899,#06b6d4)] opacity-20 blur-xl" />
                                </div>
                            )}

                            <div className={`relative z-10 p-1.5 rounded-full ${item.bg} ${item.color}`}>
                                <item.icon size={16} strokeWidth={2.5} />
                            </div>
                            <span className={`relative z-10 font-bold text-sm font-display group-hover:text-gray-900 ${item.special ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : 'text-gray-700 dark:text-gray-900'
                                }`}>
                                {item.label}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Scroll Down Animation - Modern Mouse Style */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 cursor-pointer group"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="w-[26px] h-[42px] rounded-full border-2 border-orange-400 flex justify-center p-2 relative bg-white/50 backdrop-blur-sm transition-colors">
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                        className="w-1 h-1.5 bg-orange-500 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
