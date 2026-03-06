"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, CheckCircle, Copy, Check, XCircle } from "lucide-react";
import {
    createDefaultProfile,
    analyzeRealTime,
    sanitizeText,
    type BrandProfile,
    DEFAULT_BLACKLIST,
    DEFAULT_ALTERNATIVES
} from "@/lib/enterprise/brand-guardrails";
import { useFreeTier } from "@/hooks/use-free-tier";
import { PRICING, UserTier } from "@/lib/usage-limits";
import UpgradeModal from "@/components/UpgradeModal";

export default function BrandGuardrailsPage() {
    const [text, setText] = useState("");
    const [profile, setProfile] = useState<BrandProfile>(createDefaultProfile());
    const [sanitized, setSanitized] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { isPremium, trackUsage, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();

    // Real-time analysis - Derived state
    const analysis = useMemo(() => {
        if (!text) return null;
        return analyzeRealTime(text, profile);
    }, [text, profile]);

    // Clear toast when text changes
    useEffect(() => {
        if (showToast) setShowToast(false);
    }, [text, showToast]);

    const handleSanitize = () => {
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        if (!trackUsage('brand-guardrails', wordCount)) return;

        const result = sanitizeText(text, profile);
        setSanitized(result.sanitizedText);
        if (result.violations.length === 0) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleCopy = () => {
        if (!trackUsage('copy-action', 1)) return;

        navigator.clipboard.writeText(sanitized);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const getStatusColor = () => {
        if (!analysis) return 'text-slate-400 dark:text-white';
        if (analysis.status === 'compliant') return 'text-emerald-400';
        if (analysis.status === 'warning') return 'text-yellow-400';
        return 'text-red-400';
    };

    const getStatusIcon = () => {
        if (!analysis) return null;
        if (analysis.status === 'compliant') return <CheckCircle size={20} />;
        return <AlertTriangle size={20} />;
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-purple-100 dark:selection:bg-purple-900">

            {/* Header */}
            <nav className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 relative flex items-center justify-between px-6">

                {/* Left: Site Logo & Name */}
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 relative">
                        <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-bold font-display text-gray-900 dark:text-white">ScriptHuman</span>
                </Link>

                {/* Right: Dashboard Button & Status */}
                <div className="flex items-center gap-4">
                    <Link href="/enterprise" className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-sm shadow-orange-200">
                        ENTERPRISE HUB DASHBOARD
                    </Link>

                    {/* Live Compliance Score */}
                    {analysis && (
                        <div className={`flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-white dark:bg-slate-800 ${analysis.status === 'compliant' ? 'border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400' :
                            analysis.status === 'warning' ? 'border-yellow-200 dark:border-yellow-900/50 text-yellow-600 dark:text-yellow-400' :
                                'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400'
                            }`}>
                            {getStatusIcon()}
                            <span className="font-mono font-bold">{analysis.score.toFixed(1)}%</span>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">



                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full mb-6 text-purple-700">
                        <Sparkles size={16} className="text-purple-500" />
                        <span className="text-sm font-bold uppercase tracking-wide">REAL-TIME VOCABULARY GOVERNOR</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <ShieldCheck className="text-purple-600" size={32} />
                        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Brand Guardrails</h1>
                    </div>

                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        Enforce brand standards by blocking Silicon Smog words and suggesting approved alternatives.
                    </p>
                </motion.div>

                {/* Split View: Blacklist + Editor */}
                <div className="grid lg:grid-cols-12 gap-6 mb-8">

                    {/* LEFT: Blacklist & Brand Dialect */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Blacklist */}
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                Silicon Smog Blacklist
                            </h3>
                            <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto content-start">
                                {DEFAULT_BLACKLIST.map((word) => (
                                    <div key={word} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brand Dialect */}
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                Approved Alternatives
                            </h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {Object.entries(DEFAULT_ALTERNATIVES).slice(0, 5).map(([blocked, approved]) => (
                                    <div key={blocked} className="p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 rounded-xl">
                                        <div className="text-red-400 text-xs font-medium mb-2 line-through decoration-red-400">{blocked}</div>
                                        <div className="flex gap-2 flex-wrap">
                                            {approved.map((alt) => (
                                                <span key={alt} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg shadow-sm">
                                                    {alt}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Editor & Results */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Input Editor */}
                        <div className="relative p-1 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your AI-generated content here for real-time analysis..."
                                className="w-full h-80 p-6 rounded-3xl bg-white dark:bg-slate-800 text-gray-700 dark:text-white placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none text-lg leading-relaxed font-[var(--font-metro)] resize-none"
                            />

                            {/* Status Bar */}
                            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-700/50 rounded-b-3xl">
                                <span className="text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest">
                                    {text.split(/\s+/).filter(Boolean).length} words
                                </span>

                                <button
                                    onClick={() => {
                                        handleSanitize();
                                        // Show a simple toast or notification here if needed
                                        // For now, reliance on sanitized output appearing below is the notification
                                    }}
                                    disabled={!text || !analysis}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2 text-sm"
                                >
                                    <Sparkles size={16} fill="currentColor" className="text-white/80" />
                                    {analysis && analysis.violations.length > 0 ? (
                                        <>Sanitize Text ({analysis.violations.length})</>
                                    ) : (
                                        <>Verify Compliance</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Violations Overlay - Only show if issues exist */}
                        {analysis && analysis.violations.length > 0 && (
                            <div className="space-y-3">
                                <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-yellow-500" />
                                    <span>Detected Violations</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {analysis.violations.slice(0, 4).map((v, i) => (
                                        <div key={i} className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex flex-col justify-between">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-yellow-700 font-bold">{v.word}</span>
                                                <span className="text-yellow-600/50 text-xs">Pos: {v.position}</span>
                                            </div>
                                            {v.suggestions.length > 0 && (
                                                <div className="flex gap-2 flex-wrap mt-auto">
                                                    {v.suggestions.map((sug) => (
                                                        <span key={sug} className="px-2 py-1 bg-white border border-yellow-200 text-yellow-700 text-xs font-bold rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                                                            {sug}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sanitized Output */}
                        {sanitized && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative p-8 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                                        <CheckCircle className="text-emerald-500" size={24} />
                                        Sanitized Output
                                    </h3>
                                    <button
                                        onClick={handleCopy}
                                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
                                    >
                                        {isCopied ? <Check size={16} /> : <Copy size={16} />}
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <div className="p-6 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-2xl text-gray-800 dark:text-white whitespace-pre-wrap leading-relaxed shadow-sm">
                                    {sanitized}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* How It Works Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto space-y-16 py-12 border-t border-gray-100"
                >
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-4 text-xs font-bold text-gray-500 dark:text-white uppercase tracking-widest">
                            Built for Enterprise
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">Why Brand Guardrails Matter</h2>
                        <p className="text-gray-500 dark:text-white max-w-2xl mx-auto">
                            Inconsistent communication dilutes brand authority. Our guardrails ensure every team member speaks with one unified, powerful voice.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Blocks &quot;Silicon Smog&quot;</h3>
                            <p className="text-gray-500 dark:text-white text-sm leading-relaxed">
                                Automatically detects and flags empty corporate jargon like &quot;synergy,&quot; &quot;leverage,&quot; and &quot;deep dive&quot; that weakens your message.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                                <RefreshCw size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Real-Time Guidance</h3>
                            <p className="text-gray-500 dark:text-white text-sm leading-relaxed">
                                Provide instant feedback to writers as they type, suggesting stronger, simpler alternatives approved by your brand team.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Total Consistency</h3>
                            <p className="text-gray-500 dark:text-white text-sm leading-relaxed">
                                Whether it&apos;s marketing copy, internal memos, or legal docs, ensure 100% adherence to your organization&apos;s style guide.
                            </p>
                        </div>
                    </div>

                    {/* Use Case Example */}
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-4">Empower Your Team</h3>
                                <p className="text-indigo-200 mb-6 leading-relaxed">
                                    Stop manually editing every document for tone violations. Let Brand Guardrails train your team on better writing habits automatically.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>Reduce editing time by 40%</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>Prevent off-brand public statements</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>Centralize vocabulary management</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <div className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">Before vs After</div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                                        <div className="flex items-center gap-2 text-red-200 text-xs font-bold mb-1">
                                            <XCircle size={12} /> ORIGINAL
                                        </div>
                                        <p className="text-sm opacity-80">&quot;We aim to <span className="underline decoration-wavy decoration-red-400">leverage synergies</span> to <span className="underline decoration-wavy decoration-red-400">drive</span> growth.&quot;</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <ArrowLeft className="rotate-[-90deg] text-indigo-300" />
                                    </div>
                                    <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                                        <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-1">
                                            <CheckCircle size={12} /> SANITIZED
                                        </div>
                                        <p className="text-sm">&quot;We will <span className="text-emerald-300 font-bold">work together</span> to <span className="text-emerald-300 font-bold">increase</span> growth.&quot;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-500/20"
                >
                    <CheckCircle size={24} className="text-emerald-100" />
                    <div>
                        <div className="font-bold text-sm">Perfectly Compliant!</div>
                        <div className="text-xs text-emerald-100">No brand violations detected.</div>
                    </div>
                </motion.div>
            )}

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                message={upgradeMessage}
                planTier="enterprise"
            />
        </main>
    );
}
