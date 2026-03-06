"use client";
// Force rebuild
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Activity, CheckCircle2, AlertTriangle, PenTool, Palette, Building2, ShieldCheck, Sun } from "lucide-react";
import Link from "next/link";
import SanitizerEditor from "@/components/SanitizerEditor";
import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";

function WelcomeBackBanner() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (user) {
            setShow(true);
            const t = setTimeout(() => setShow(false), 4000);
            return () => clearTimeout(t);
        }
    }, [user]);

    const firstName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "back";

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full shadow-sm shadow-orange-100 mb-2"
                >
                    <span className="text-lg">👋</span>
                    <span className="text-sm font-bold text-orange-700 font-display">
                        Welcome back, <span className="capitalize">{firstName}</span>!
                    </span>
                    <Sun size={14} className="text-amber-500 animate-spin" style={{ animationDuration: "4s" }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Hero() {
    return (
        <section className="relative pt-8 pb-12 md:pb-4 px-4 md:px-6 min-h-[90dvh] md:min-h-[calc(100dvh-100px)] flex flex-col justify-center items-center overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-10 space-y-5 text-center flex-grow flex flex-col justify-center">

                {/* Header Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-3"
                >
                    {/* Welcome back banner — fades above the badge */}
                    <div className="flex justify-center">
                        <WelcomeBackBanner />
                    </div>

                    <div className="inline-block">
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-orange-100 text-orange-600 rounded-full text-[10px] font-bold tracking-widest uppercase font-display shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block mr-2 mb-0.5 animate-pulse" />
                            AI Sanitization Engine
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-[#111827] dark:text-white tracking-tight leading-[1.1]">
                        Restore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Human Vibe</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-500 dark:text-white max-w-2xl mx-auto font-sans leading-relaxed">
                        Your AI content, stripped of its robotic edge. Sanitized, humanized, and ready to resonate.
                    </p>
                </motion.div>

                {/* Editor Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <SanitizerEditor />
                </motion.div>

                {/* Navigation Pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="space-y-3"
                >
                    <p className="text-xs font-bold text-gray-400 dark:text-white font-sans tracking-wide uppercase">
                        Not sure where to start? Try one of these:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/writing-room" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-aurora bg-[length:300%_300%]" />
                            <div className="relative px-6 py-2.5 bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-full shadow-sm flex items-center gap-2">
                                <PenTool className="w-4 h-4 text-gray-500 dark:text-white group-hover:text-amber-600 transition-colors" />
                                <span className="font-medium text-gray-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-500 font-display text-xs md:text-sm">Writing Room</span>
                            </div>
                        </Link>
                        <Link href="/style-studio" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-amber-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-aurora bg-[length:300%_300%]" />
                            <div className="relative px-6 py-2.5 bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-full shadow-sm flex items-center gap-2">
                                <Palette className="w-4 h-4 text-gray-500 dark:text-white group-hover:text-orange-600 transition-colors" />
                                <span className="font-medium text-gray-800 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-500 font-display text-xs md:text-sm">Style Studio</span>
                            </div>
                        </Link>
                        <Link href="/enterprise" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-aurora bg-[length:300%_300%]" />
                            <div className="relative px-6 py-2.5 bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-full shadow-sm flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-gray-500 dark:text-white group-hover:text-blue-600 transition-colors" />
                                <span className="font-medium text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500 font-display text-xs md:text-sm">Enterprise</span>
                            </div>
                        </Link>
                        <Link href="/trust-hub" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-aurora bg-[length:300%_300%]" />
                            <div className="relative px-6 py-2.5 bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-full shadow-sm flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-gray-500 dark:text-white group-hover:text-emerald-600 transition-colors" />
                                <span className="font-medium text-gray-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-500 font-display text-xs md:text-sm">Trust Hub</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator - Modern Mouse Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={() => {
                    document.getElementById('stop-detecting')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity z-20"
            >
                <div className="w-[26px] h-[44px] rounded-full border-2 border-orange-500/50 flex justify-center p-1.5 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-1 h-1 rounded-full bg-orange-500"
                    />
                </div>
            </motion.div>
        </section>
    );
}
