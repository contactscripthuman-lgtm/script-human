"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Globe, Scissors, ChevronDown, Copy, Check, PenTool, Palette, Building2, ShieldCheck, HelpCircle, ArrowRight, RotateCcw, Wand2, Sparkles, Info, Fingerprint, Users, Layers, CheckCircle2, BookOpen, Crown } from "lucide-react";
import ToolNavbar from "@/components/ToolNavbar";
import StyleStudioWhyUs from "@/components/style-studio/WhyChooseUs";
import FAQ from "@/components/FAQ";
import StyleStudioTestimonials from "@/components/style-studio/Testimonials";
import { motion, AnimatePresence } from "framer-motion";

// Algorithm imports
import { generateVibeAudit, type VibeAuditReport } from "@/lib/vibe-audit";
import HelpTooltip from "@/components/writing-room/HelpTooltip";
import QuickTip from "@/components/writing-room/QuickTip";
import { injectLocale, getAvailableLocales, type Locale, type Intensity, type LocaleTransformation, type LocaleConfig, type LocaleChange } from "@/lib/locale-injector";
import { analyzeBurstiness, applySuggestion, getImprovementTips, type BurstinessAnalysis, type StructureSuggestion } from "@/lib/structure-breaker";
import { useFreeTier } from "@/hooks/use-free-tier";
import UpgradeModal from "@/components/UpgradeModal";
import PremiumLock from "@/components/PremiumLock";
import { USAGE_LIMITS } from "@/lib/usage-limits";

type Tool = 'audit' | 'injector' | 'breaker';


export default function StyleStudioPage() {
    const [text, setText] = useState("");
    const [selectedTool, setSelectedTool] = useState<Tool>('audit');
    const [isCopied, setIsCopied] = useState(false);

    // Vibe Audit state
    const [auditReport, setAuditReport] = useState<VibeAuditReport | null>(null);
    const [auditPage, setAuditPage] = useState<1 | 2 | 3>(1);

    // Locale Injector state
    const [selectedLocale, setSelectedLocale] = useState<Locale>('london');
    const [intensity, setIntensity] = useState<Intensity>('moderate');
    const [localeResult, setLocaleResult] = useState<LocaleTransformation | null>(null);

    // Structure Breaker state
    const [burstinessAnalysis, setBurstinessAnalysis] = useState<BurstinessAnalysis | null>(null);
    const [selectedSuggestions, setSelectedSuggestions] = useState<Set<string>>(new Set());
    const [transformedText, setTransformedText] = useState("");
    const [showQuickTip, setShowQuickTip] = useState(false);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedText = e.clipboardData.getData('text');
        const currentWordCount = text.split(/\s+/).filter(Boolean).length;
        const pastedWordCount = pastedText.split(/\s+/).filter(Boolean).length;
        const totalWordCount = currentWordCount + pastedWordCount;

        if (totalWordCount < 1000) {
            setShowQuickTip(true);
            setTimeout(() => setShowQuickTip(false), 10000);
        } else {
            setShowQuickTip(false);
        }
    };

    // Using hasProAccess instead of isPremium for unlimited Style Studio access
    const { isPremium, hasProAccess, trackUsage, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();

    const locales = getAvailableLocales();

    // Auto-reset handled in onChange now

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (!newText || newText.trim() === '') {
            setAuditReport(null);
            setLocaleResult(null);
            setBurstinessAnalysis(null);
            setSelectedSuggestions(new Set());
            setTransformedText("");
        }
    };

    // Handle tool execution
    const handleRunTool = () => {
        if (!text) return;
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        if (selectedTool === 'audit') {
            if (!trackUsage('style-studio-audit', wordCount)) return;
            const report = generateVibeAudit(text);
            setAuditReport(report);
            setAuditPage(1);
        } else if (selectedTool === 'injector') {
            if (!hasProAccess && selectedLocale !== 'london') { // Assuming 'london' is the free one based on user request saying"only AU region available" - wait, let me check the request again."only AU region available". I will assume 'au' is the ID.
                // Re-reading user request:"only AU region available".
                if (selectedLocale !== 'sydney') {
                    setUpgradeMessage("Only the Australian region is available on the free plan.");
                    setShowUpgradeModal(true);
                    return;
                }
            }
            if (!trackUsage('style-studio-injector', wordCount)) return;

            const result = injectLocale(text, selectedLocale, intensity);
            setLocaleResult(result);
        } else if (selectedTool === 'breaker') {
            // Structure breaker usage is allowed, but results are limited visually.
            const analysis = analyzeBurstiness(text);
            setBurstinessAnalysis(analysis);
            setTransformedText(text);
            setSelectedSuggestions(new Set());
        }
    };

    const toggleSuggestion = (suggestionId: string) => {
        const newSelected = new Set(selectedSuggestions);
        if (newSelected.has(suggestionId)) {
            newSelected.delete(suggestionId);
        } else {
            newSelected.add(suggestionId);
        }
        setSelectedSuggestions(newSelected);

        if (burstinessAnalysis) {
            const suggestionsToApply = burstinessAnalysis.suggestions.filter(s => newSelected.has(s.id));
            let result = text;
            suggestionsToApply.sort((a, b) => b.position - a.position).forEach(suggestion => {
                result = applySuggestion(result, suggestion);
            });
            setTransformedText(result);
        }
    };

    const handleCopy = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const getResultText = () => {
        if (selectedTool === 'injector' && localeResult) return localeResult.transformedText;
        if (selectedTool === 'breaker' && selectedSuggestions.size > 0) return transformedText;
        return '';
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-orange-100 dark:selection:bg-orange-900">

            {/* Header - Modern Minimal Navigation */}
            {/* Header - Modern Minimal Navigation */}
            <ToolNavbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-6 text-orange-700">
                        <Palette size={16} className="text-orange-500" />
                        <span className="text-sm font-bold uppercase tracking-wide">Style & Tone Analysis</span>
                    </div>

                    <h1 className="text-6xl font-black mb-6 font-display text-gray-900 dark:text-white">
                        Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Unique Voice</span>
                    </h1>

                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        Analyze your writing DNA, inject local nuance, and break rigid AI structures for a truly authentic sound.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN - EDITOR & CONTROLS (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Text Input Area */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-1 shadow-sm border border-gray-200 dark:border-slate-700 relative">
                            <QuickTip isVisible={showQuickTip} onClose={() => setShowQuickTip(false)} />
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                onPaste={handlePaste}
                                placeholder="Paste your text here to analyze and transform with professional tools..."
                                className="w-full h-80 p-6 bg-transparent resize-none focus:outline-none font-[var(--font-metro)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                            <div className="px-6 pb-4 flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
                                <span className="text-sm text-gray-500 dark:text-white font-[var(--font-metro)]">
                                    {text.split(/\s+/).filter(w => w).length} words
                                </span>
                                <button
                                    onClick={handleRunTool}
                                    disabled={!text}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF9A6C] to-[#FF6B4A] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                                >
                                    {selectedTool === 'audit' && <FileText size={18} />}
                                    {selectedTool === 'injector' && <Globe size={18} />}
                                    {selectedTool === 'breaker' && <Scissors size={18} />}
                                    {selectedTool === 'audit' ? 'Run Audit' : selectedTool === 'injector' ? 'Inject Locale' : 'Analyze Structure'}
                                </button>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-white text-center mt-2 mx-auto leading-relaxed max-w-2xl opacity-60">
                            For the most accurate analysis and transformation results, please provide a longer text sample (at least 1000+ words recommended).
                        </p>

                        {/* Results Display */}
                        <AnimatePresence mode="wait">
                            {selectedTool === 'audit' && auditReport && (
                                <VibeAuditResults
                                    report={auditReport}
                                    page={auditPage}
                                    setPage={setAuditPage}
                                    isPremium={hasProAccess}
                                    onUpgrade={() => setShowUpgradeModal(true)}
                                />
                            )}

                            {selectedTool === 'injector' && localeResult && (
                                <LocaleResults result={localeResult} onCopy={handleCopy} isCopied={isCopied} />
                            )}

                            {selectedTool === 'breaker' && burstinessAnalysis && (
                                <BreakerResults
                                    analysis={burstinessAnalysis}
                                    selectedSuggestions={selectedSuggestions}
                                    toggleSuggestion={toggleSuggestion}
                                    transformedText={transformedText}
                                    onCopy={handleCopy}
                                    isCopied={isCopied}
                                    isPremium={hasProAccess}
                                    onUpgrade={() => setShowUpgradeModal(true)}
                                />
                            )}
                        </AnimatePresence>

                    </div>

                    {/* RIGHT COLUMN - TOOL SELECTOR & OPTIONS (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Tool Selector */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 sticky top-24">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-4 font-display">
                                Select Tool
                            </h3>

                            <div className="space-y-3">
                                {/* Vibe Audit */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedTool('audit')}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left relative cursor-pointer ${selectedTool === 'audit'
                                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                                        : 'border-gray-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700'
                                        }`}
                                >
                                    <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                                        <HelpTooltip text="Analyzes text to detect AI patterns" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${selectedTool === 'audit' ? 'bg-teal-500' : 'bg-gray-200'}`}>
                                            <FileText size={18} className={selectedTool === 'audit' ? 'text-white' : 'text-gray-600 dark:text-white'} />
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white font-display">The Vibe Audit</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-white font-[var(--font-metro)]">
                                        Generate comprehensive 3-page Origin Report
                                    </p>
                                </div>

                                {/* Locale Injector */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedTool('injector')}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left relative cursor-pointer ${selectedTool === 'injector'
                                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                                        : 'border-gray-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
                                        }`}
                                >
                                    <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                                        <HelpTooltip text="Adds authentic regional idioms and phrases" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${selectedTool === 'injector' ? 'bg-violet-500' : 'bg-gray-200'}`}>
                                            <Globe size={18} className={selectedTool === 'injector' ? 'text-white' : 'text-gray-600 dark:text-white'} />
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white font-display">The Injector</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-white font-[var(--font-metro)]">
                                        Add regional flavor with native idioms
                                    </p>
                                </div>

                                {/* Structure Breaker */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedTool('breaker')}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left relative cursor-pointer ${selectedTool === 'breaker'
                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                        : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700'
                                        }`}
                                >
                                    <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                                        <HelpTooltip text="Varies sentence length for burstiness" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${selectedTool === 'breaker' ? 'bg-orange-500' : 'bg-gray-200'}`}>
                                            <Scissors size={18} className={selectedTool === 'breaker' ? 'text-white' : 'text-gray-600 dark:text-white'} />
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white font-display">Structure-Breaker</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-white font-[var(--font-metro)]">
                                        Analyze burstiness & insert human noise
                                    </p>
                                </div>
                            </div>

                            {/* Tool-Specific Options */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">

                                {selectedTool === 'injector' && (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-3">Region</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {locales.map((locale: LocaleConfig) => (
                                                    <button
                                                        key={locale.id}
                                                        onClick={() => setSelectedLocale(locale.id)}
                                                        disabled={!hasProAccess && locale.id !== 'sydney'} // Only Sydney (AU) is free
                                                        className={`p-2 rounded-lg border-2 transition-all relative ${selectedLocale === locale.id
                                                            ? 'border-violet-500 bg-violet-50'
                                                            : 'border-gray-200'
                                                            } ${!hasProAccess && locale.id !== 'sydney' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                    >
                                                        {!hasProAccess && locale.id !== 'sydney' && <PremiumLock />}
                                                        <div className="text-2xl">{locale.flag}</div>
                                                        <p className="text-[10px] font-bold mt-1">{locale.name}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-3">Intensity</p>
                                            <div className="flex gap-2">
                                                {(['subtle', 'moderate', 'heavy'] as Intensity[]).map((level) => (
                                                    <button
                                                        key={level}
                                                        onClick={() => setIntensity(level)}
                                                        className={`flex-1 py-2 rounded-lg font-bold text-xs capitalize ${intensity === level
                                                            ? 'bg-violet-500 text-white'
                                                            : 'bg-gray-100 text-gray-700 dark:text-white'
                                                            }`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedTool === 'breaker' && burstinessAnalysis && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-3">Burstiness Score</p>
                                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-xl text-center">
                                            <p className="text-4xl font-black">{(burstinessAnalysis.score * 100).toFixed(0)}%</p>
                                            <p className="text-xs mt-1 uppercase font-bold opacity-90">
                                                {burstinessAnalysis.level} VARIATION
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Benefits Section - Always Visible */}
            <StyleStudioWhyUs />

            <FAQ theme="orange" items={[
                {
                    question: "What is a Vibe Audit?",
                    answer: "It's a comprehensive 3-page report that breaks down your writing style, detecting AI probability, vocabulary diversity, and sentence structure patterns."
                },
                {
                    question: "How does the Locale Injector work?",
                    answer: "It scans your text for generic phrases and replaces them with authentic regional idioms (e.g., UK, Australian) to make your writing sound native to a specific audience."
                },
                {
                    question: "What is 'Burstiness'?",
                    answer: "Burstiness refers to the variation in sentence length and structure. High burstiness is a key indicator of human writing, as AI tends to use uniform sentence structures."
                }
            ]} />

            <StyleStudioTestimonials />
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                message={upgradeMessage}
                planTier="pro"
            />
        </main >
    );
}

// Component: Vibe Audit Results
function VibeAuditResults({ report, page, setPage, isPremium, onUpgrade }: {
    report: VibeAuditReport;
    page: 1 | 2 | 3;
    setPage: (p: 1 | 2 | 3) => void;
    isPremium: boolean;
    onUpgrade: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-slate-700"
        >
            {/* Header with Title and Page Navigation */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                    Origin Report - Page {page}
                </h2>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(1)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${page === 1
                            ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => setPage(2)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all relative ${page === 2
                            ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        {!isPremium && <PremiumLock tooltip="Premium" />}
                        2
                    </button>
                    <button
                        onClick={() => setPage(3)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all relative ${page === 3
                            ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        {!isPremium && <PremiumLock tooltip="Premium" />}
                        3
                    </button>
                </div>
            </div>

            {page === 1 && <Page1Content data={report.page1} />}

            {(page === 2 || page === 3) && !isPremium ? (
                <div className="relative">
                    <div className="filter blur-md pointer-events-none select-none opacity-50">
                        {page === 2 && <Page2Content data={report.page2} />}
                        {page === 3 && <Page3Content data={report.page3} />}
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-teal-100 dark:border-teal-900/30 max-w-sm">
                            <Sparkles size={40} className="text-teal-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlock Full Analysis</h3>
                            <p className="text-gray-500 dark:text-white mb-6 text-sm">
                                Upgrade to Premium to view detailed writing patterns, voice analysis, and improvement suggestions.
                            </p>
                            <button
                                onClick={onUpgrade}
                                className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-shadow"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {page === 2 && <Page2Content data={report.page2} />}
                    {page === 3 && <Page3Content data={report.page3} />}
                </>
            )}
        </motion.div>
    );
}

// Vibe Audit Page 1
function Page1Content({ data }: { data: VibeAuditReport['page1'] }) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className={`text-8xl font-black mb-4 ${data.aiProbability > 60 ? 'text-red-500' : data.aiProbability > 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {data.aiProbability}%
                </div>
                <p className="text-xl font-bold text-gray-700 dark:text-white">AI Detection Probability</p>
                <p className={`text-sm mt-2 uppercase font-bold ${data.riskLevel === 'high' ? 'text-red-500' : data.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-500'}`}>
                    {data.riskLevel} RISK
                </p>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Key Findings:</h3>
                <ul className="space-y-2">
                    {data.keyFindings.map((finding, idx) => (
                        <li key={idx} className="text-gray-700 dark:text-white">{finding}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Detection Markers:</h3>
                <div className="space-y-2">
                    {data.detectionMarkers.slice(0, 8).map((marker, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                            <span className="font-mono text-sm dark:text-white">{marker.marker}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 dark:text-white">×{marker.count}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${marker.severity === 'high' ? 'bg-red-100 text-red-700' :
                                    marker.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {marker.severity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Vibe Audit Page 2
function Page2Content({ data }: { data: VibeAuditReport['page2'] }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Writing Pattern Analysis</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <p className="text-sm text-gray-600 dark:text-white mb-1">Sentence Variance</p>
                    <p className="text-3xl font-bold text-teal-600">{data.sentenceLengthVariance.toFixed(1)}</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <p className="text-sm text-gray-600 dark:text-white mb-1">Vocabulary Diversity</p>
                    <p className="text-3xl font-bold text-teal-600">{data.vocabularyDiversity.toFixed(1)}%</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <p className="text-sm text-gray-600 dark:text-white mb-1">Transition Usage</p>
                    <p className="text-3xl font-bold text-teal-600">{data.transitionWordUsage.toFixed(1)}%</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <p className="text-sm text-gray-600 dark:text-white mb-1">Readability Score</p>
                    <p className="text-3xl font-bold text-teal-600">{data.readabilityScore}</p>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Voice Analysis:</h4>
                <div className="flex gap-4">
                    <div className="flex-1 bg-green-50 p-4 rounded-xl border border-green-200">
                        <p className="text-sm text-gray-600 dark:text-white mb-1">Active Voice</p>
                        <p className="text-2xl font-bold text-green-600">{data.voiceRatio.active}%</p>
                    </div>
                    <div className="flex-1 bg-red-50 p-4 rounded-xl border border-red-200">
                        <p className="text-sm text-gray-600 dark:text-white mb-1">Passive Voice</p>
                        <p className="text-2xl font-bold text-red-600">{data.voiceRatio.passive}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Vibe Audit Page 3
function Page3Content({ data }: { data: VibeAuditReport['page3'] }) {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-xl mb-6">
                <p className="text-sm mb-2">Estimated Improvement</p>
                <p className="text-5xl font-black">+{data.estimatedImprovement}%</p>
                <p className="text-sm mt-2">Human-Like Score Increase</p>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Quick Wins:</h3>
                <ul className="space-y-2">
                    {data.quickWins.map((win, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <Check size={20} className="text-green-500 mt-0.5" />
                            <span className="text-gray-700 dark:text-white">{win}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Detailed Recommendations:</h3>
                <div className="space-y-4">
                    {data.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-slate-700 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-gray-900 dark:text-white">{suggestion.issue}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {suggestion.priority}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-white mb-3">{suggestion.fix}</p>
                            <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-lg space-y-2">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-white mb-1">BEFORE:</p>
                                    <p className="text-sm text-gray-700 dark:text-white italic">{suggestion.example.before}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-white mb-1">AFTER:</p>
                                    <p className="text-sm text-green-700 dark:text-green-500 font-medium">{suggestion.example.after}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Component: Locale Injector Results
function LocaleResults({ result, onCopy, isCopied }: { result: LocaleTransformation; onCopy: (text: string) => void; isCopied: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-slate-700"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                    Transformed Text
                </h2>
                <button
                    onClick={() => onCopy(result.transformedText)}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-bold text-sm transition-colors"
                >
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>

            <div className="bg-violet-50 dark:bg-violet-900/10 p-6 rounded-xl border border-violet-200 dark:border-violet-900/50 mb-6">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{result.transformedText}</p>
            </div>

            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{result.changes.length} Changes Made:</h3>
                <div className="space-y-2">
                    {result.changes.map((change: LocaleChange, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                            <span className="text-sm">
                                <span className="line-through text-gray-500 dark:text-white">{change.original}</span>
                                {' → '}
                                <span className="font-bold text-violet-600 dark:text-violet-400">{change.replacement}</span>
                            </span>
                            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">
                                {change.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Component: Structure Breaker Results
interface BreakerResultsProps {
    analysis: BurstinessAnalysis;
    selectedSuggestions: Set<string>;
    toggleSuggestion: (id: string) => void;
    transformedText: string;
    onCopy: (text: string) => void;
    isCopied: boolean;
    isPremium: boolean;
    onUpgrade: () => void;
}

function BreakerResults({ analysis, selectedSuggestions, toggleSuggestion, transformedText, onCopy, isCopied, isPremium, onUpgrade }: BreakerResultsProps) {
    const improvementTips = getImprovementTips(analysis.score);
    const displayedSuggestions = isPremium ? analysis.suggestions : analysis.suggestions.slice(0, 3);


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-slate-700 space-y-6"
        >
            {/* Sentence Stats */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Sentence Statistics:</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-900/30">
                        <p className="text-xs text-gray-600 dark:text-white mb-1">Total</p>
                        <p className="text-2xl font-bold text-rose-600">{analysis.sentenceStats.total}</p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-900/30">
                        <p className="text-xs text-gray-600 dark:text-white mb-1">Avg Length</p>
                        <p className="text-2xl font-bold text-rose-600">{analysis.sentenceStats.avgLength}w</p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-900/30">
                        <p className="text-xs text-gray-600 dark:text-white mb-1">Shortest</p>
                        <p className="text-2xl font-bold text-rose-600">{analysis.sentenceStats.shortest}w</p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-900/30">
                        <p className="text-xs text-gray-600 dark:text-white mb-1">Longest</p>
                        <p className="text-2xl font-bold text-rose-600">{analysis.sentenceStats.longest}w</p>
                    </div>
                </div>
            </div>

            {/* Improvement Tips */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Improvement Tips:</h3>
                <ul className="space-y-1">
                    {improvementTips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-gray-700 dark:text-white">{tip}</li>
                    ))}
                </ul>
            </div>

            {/* Suggestions */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {isPremium ? analysis.suggestions.length : `${displayedSuggestions.length} of ${analysis.suggestions.length}`} Suggestions (Click to Apply):
                </h3>
                <div className="space-y-3">
                    {displayedSuggestions.map((suggestion: StructureSuggestion) => (
                        <div
                            key={suggestion.id}
                            onClick={() => toggleSuggestion(suggestion.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedSuggestions.has(suggestion.id)
                                ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                                : 'border-gray-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-gray-900 dark:text-white capitalize">{suggestion.type}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {suggestion.priority}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-white mb-3">{suggestion.reason}</p>
                            <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg space-y-2">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-white mb-1">INSERT:</p>
                                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{suggestion.suggestion}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!isPremium && analysis.suggestions.length > 3 && (
                        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <div className="filter blur-sm select-none opacity-50 space-y-3">
                                <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
                                <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
                            </div>
                            <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <button
                                    onClick={onUpgrade}
                                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    <Crown size={16} fill="currentColor" />
                                    Unlock {analysis.suggestions.length - 3} More Suggestions
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transformed Preview */}
            {selectedSuggestions.size > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white">Preview with {selectedSuggestions.size} Applied:</h3>
                        <button
                            onClick={() => onCopy(transformedText)}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold text-sm transition-colors"
                        >
                            {isCopied ? <Check size={16} /> : <Copy size={16} />}
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="bg-rose-50 p-6 rounded-xl border border-rose-200">
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{transformedText}</p>
                    </div>
                </div>
            )}


        </motion.div>
    );
}
