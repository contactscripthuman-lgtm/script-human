"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, FileText, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, XCircle, ChevronDown, Check, X, Award, BrainCircuit, Feather, Quote, PenTool, Palette, Building2, Scan, BookOpen, Lock } from "lucide-react";
import ToolNavbar from "@/components/ToolNavbar";
import TrustHubWhyUs from "@/components/trust-hub/WhyChooseUs";
import TrustHubTestimonials from "@/components/trust-hub/Testimonials";
import FAQ from "@/components/FAQ";

import ConfidenceMeter from "@/components/trust-hub/ConfidenceMeter";
import VerifiedSeal from "@/components/trust-hub/VerifiedSeal";
import VerifyCertificate from "@/components/trust-hub/VerifyCertificate";
import TrustHubSidebar, { TrustHubTool } from "@/components/trust-hub/TrustHubSidebar";
import MediaVerifier from "@/components/trust-hub/MediaVerifier";
import type { ForensicAnalysisResult, ContentMetadata } from "@/lib/trust-hub/types";
import { useFreeTier } from "@/hooks/use-free-tier";
import UpgradeModal from "@/components/UpgradeModal";
import { PRICING, UserTier } from "@/lib/usage-limits";
import QuickTip from "@/components/writing-room/QuickTip";

import { useSearchParams } from "next/navigation";

function TrustHubContent() {
    const searchParams = useSearchParams();
    const initialTool = searchParams.get('tool') as TrustHubTool | null;
    const [activeTool, setActiveTool] = useState<TrustHubTool>(initialTool || 'content');
    const [content, setContent] = useState("");
    const [metadata, setMetadata] = useState<ContentMetadata>({
        author: "",
        title: "",
        source: "",
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<ForensicAnalysisResult | null>(null);
    const [certificateId, setCertificateId] = useState<string | null>(null);
    const { isPremium, hasTrustHubAccess, hasCertificateAccess, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();

    // Custom props for the upgrade modal when triggered from separate features
    const [upgradeModalProps, setUpgradeModalProps] = useState<{
        planTier?: 'certificate' | 'pro' | 'enterprise';
    }>({
        planTier: 'certificate',
    });
    const [showQuickTip, setShowQuickTip] = useState(false);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedText = e.clipboardData.getData('text');
        const currentWordCount = content.split(/\s+/).filter(Boolean).length;
        const pastedWordCount = pastedText.split(/\s+/).filter(Boolean).length;
        const totalWordCount = currentWordCount + pastedWordCount;

        if (totalWordCount < 1000) {
            setShowQuickTip(true);
            setTimeout(() => setShowQuickTip(false), 10000);
        } else {
            setShowQuickTip(false);
        }
    };

    const isLocked = !hasTrustHubAccess;         // Locks entire Trust Hub analysis section
    const isCertificateLocked = !hasCertificateAccess; // Locks only the certificate download (Pro can still analyze)

    const handleUnlockCertificate = () => {
        setUpgradeMessage("Unlock official certificates to prove your content's authenticity.");
        setUpgradeModalProps({ planTier: 'certificate' });
        setShowUpgradeModal(true);
    };

    const handleAnalyze = async () => {
        if (content.length < 50) {
            alert("Please enter at least 50 characters");
            return;
        }

        setIsAnalyzing(true);
        setResult(null);

        try {
            const response = await fetch("/api/trust-hub/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, metadata }),
            });

            if (!response.ok) throw new Error("Analysis failed");
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Analysis error:", error);
            alert("Failed to analyze content.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-purple-100 dark:selection:bg-purple-900 relative">

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                message="Verify your content with ScriptHuman verification certificate. This is the proof your content is organically written."
                planTier={upgradeModalProps.planTier || "certificate"}
            />

            {/* Background gradient ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-200/40 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-200/40 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10">
                {/* Navigation */}
                {/* Navigation */}
                <ToolNavbar />

                {/* Hero Section */}
                <section className="pt-8 pb-8 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Title */}
                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-50/80 border border-orange-100 shadow-sm backdrop-blur-sm">
                                <Sparkles size={16} className="text-orange-500 fill-orange-500" />
                                <span className="text-xs font-extra-bold text-orange-700 tracking-wider uppercase font-display">
                                    Advanced Trust Engine
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-4">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Trust Hub</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-white font-normal">
                            AI Detection · Quality Analysis · Originality Check · Credibility Verification
                        </p>
                    </motion.div>
                </section>

                {/* Main Grid Layout with Sidebar */}
                <section className="px-6 max-w-7xl mx-auto mb-20">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Sidebar */}
                        <aside className="w-full lg:w-80 flex-shrink-0">
                            <div className="lg:sticky top-24">
                                <TrustHubSidebar
                                    activeTool={activeTool}
                                    onSelectTool={setActiveTool}
                                    isPremium={isPremium}
                                    onLockedClick={() => {
                                        setUpgradeMessage("Media Verifier is available on Pro & Enterprise plans. Upgrade to verify images and videos.");
                                        setUpgradeModalProps({ planTier: 'pro' });
                                        setShowUpgradeModal(true);
                                    }}
                                />
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 space-y-8">
                            {activeTool === 'content' ? (
                                <>
                                    {/* Content Verifier: Input & Score */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                                        {/* Left: Content Input */}
                                        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-slate-700 p-8 shadow-xl flex flex-col h-full min-h-[500px]">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                                        <FileText size={20} />
                                                    </div>
                                                    <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Content Analysis</h2>
                                                </div>
                                                <div className="text-xs text-gray-400 dark:text-white font-medium bg-gray-50 dark:bg-slate-900 px-3 py-1 rounded-full">
                                                    Paste Text
                                                </div>
                                            </div>

                                            <div className="relative flex-1">
                                                <QuickTip isVisible={showQuickTip} onClose={() => setShowQuickTip(false)} />
                                                <textarea
                                                    value={content}
                                                    onChange={(e) => setContent(e.target.value)}
                                                    onPaste={handlePaste}
                                                    placeholder="Paste your article or content here for deep forensic analysis..."
                                                    className="w-full h-full p-5 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm mb-6 font-medium leading-relaxed"
                                                    spellCheck={false}
                                                />
                                            </div>

                                            <button
                                                onClick={handleAnalyze}
                                                disabled={isAnalyzing || content.length < 50}
                                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${isAnalyzing || content.length < 50
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                                    : "bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                                    }`}
                                            >
                                                {isAnalyzing ? (
                                                    <>
                                                        <Sparkles className="animate-spin w-5 h-5" />
                                                        Running Analysis...
                                                    </>
                                                ) : (
                                                    <>
                                                        Run Forensic Analysis
                                                        <ArrowRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Right: Score (or Placeholder) */}
                                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-slate-700 p-8 shadow-xl flex flex-col items-center h-full min-h-[500px]">
                                            <AnimatePresence mode="wait">
                                                {result ? (
                                                    <div
                                                        key="score"
                                                        className="w-full h-full flex flex-col items-center"
                                                    >
                                                        <div className="flex-none flex items-center gap-2 mb-4 bg-purple-50 px-4 py-2 rounded-full">
                                                            <ShieldCheck className="text-purple-600" size={20} />
                                                            <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">Trust Score Calculated</span>
                                                        </div>

                                                        <div className="flex-1 flex flex-col items-center justify-center w-full">
                                                            <ConfidenceMeter score={result.overallTrustScore} riskLevel={result.riskLevel} theme="light" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key="placeholder"
                                                        className="text-center h-full flex flex-col items-center justify-center"
                                                    >
                                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
                                                            <ShieldCheck className="text-gray-300 dark:text-white" size={48} />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-400 dark:text-white mb-2">Detailed Scorecard</h3>
                                                        <p className="text-gray-400 dark:text-white text-sm max-w-xs mx-auto">
                                                            Run analysis to view the 4-layer trust breakdown and overall score.
                                                        </p>
                                                    </div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Media Verifier - Protected Visual Lock */}
                                    <MediaVerifier
                                        isPremium={isPremium}
                                        onUpgrade={() => {
                                            setUpgradeMessage("Media Verifier is available on Pro & Enterprise plans.");
                                            setUpgradeModalProps({ planTier: 'pro' });
                                            setShowUpgradeModal(true);
                                        }}
                                    />
                                </>
                            )}

                            {/* Content-specific components only show when content tool is active and has results */}
                            {activeTool === 'content' && result && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">


                                    {/* Left: Certify & Download - Uses VerifiedSeal Component */}
                                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-slate-700 p-8 shadow-xl flex flex-col justify-center h-full relative overflow-hidden">
                                        <VerifiedSeal
                                            textHash={result.contentHash || "pending-hash"}
                                            confidenceScore={Math.round(result.overallTrustScore)}
                                            verdict={result.riskLevel}
                                            content={content}
                                            metadata={metadata}
                                            result={result}
                                            onCertify={(id) => setCertificateId(id)}
                                            theme="light"
                                            isLocked={isCertificateLocked}
                                            onUnlock={handleUnlockCertificate}
                                        />

                                        {result.overallTrustScore < 75 && (
                                            <div className="mt-8 flex gap-4 w-full">
                                                <Link href="/writing-room" className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 text-sm">
                                                    <PenTool size={16} /> Humanize
                                                </Link>
                                                <Link href="/style-studio" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                                                    <Palette size={16} /> Fix Tone
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Detailed Analysis Report */}
                                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-slate-700 p-8 shadow-xl h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-blue-50 dark:bg-slate-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                                                <BrainCircuit size={20} />
                                            </div>
                                            <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Detailed Analysis Report</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-80px)]">
                                            {/* Layer 1: Authenticity */}
                                            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Layer 1</div>
                                                    <BrainCircuit className="text-blue-500" size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{result.layers.authenticity.score}</div>
                                                    <div className="text-sm font-bold text-gray-700 dark:text-white mt-1">Authenticity</div>
                                                    <div className="text-xs text-gray-400 dark:text-white mt-1">AI Pattern Detection</div>
                                                    {/* Detailed Metrics */}
                                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">AI Likelihood</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.authenticity.aiLikelihood}%</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Patterns</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.authenticity.aiPatterns?.length || 0} Found</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-3">
                                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${result.layers.authenticity.score}%` }} />
                                                </div>
                                            </div>

                                            {/* Layer 2: Quality */}
                                            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Layer 2</div>
                                                    <Feather className="text-purple-500" size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{result.layers.quality.score}</div>
                                                    <div className="text-sm font-bold text-gray-700 dark:text-white mt-1">Quality</div>
                                                    <div className="text-xs text-gray-400 dark:text-white mt-1">Grammar & Flow</div>
                                                    {/* Detailed Metrics */}
                                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Readability</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.quality.readabilityScore}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Issues</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.quality.grammarIssues} Detected</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-3">
                                                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${result.layers.quality.score}%` }} />
                                                </div>
                                            </div>

                                            {/* Layer 3: Originality */}
                                            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Layer 3</div>
                                                    <Sparkles className="text-amber-500" size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{result.layers.originality.score}</div>
                                                    <div className="text-sm font-bold text-gray-700 dark:text-white mt-1">Originality</div>
                                                    <div className="text-xs text-gray-400 dark:text-white mt-1">Uniqueness Check</div>
                                                    {/* Detailed Metrics */}
                                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Uniqueness</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.originality.uniquenessScore}%</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Plagiarism</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{100 - result.layers.originality.uniquenessScore}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-3">
                                                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${result.layers.originality.score}%` }} />
                                                </div>
                                            </div>

                                            {/* Layer 4: Credibility */}
                                            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Layer 4</div>
                                                    <Quote className="text-emerald-500" size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{result.layers.credibility.score}</div>
                                                    <div className="text-sm font-bold text-gray-700 dark:text-white mt-1">Credibility</div>
                                                    <div className="text-xs text-gray-400 dark:text-white mt-1">Fact Signals</div>
                                                    {/* Detailed Metrics */}
                                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Citations</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.credibility.citationsPresent ? "Found" : "Missing"}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">Signals</div>
                                                            <div className="text-sm font-bold text-gray-800 dark:text-white">{result.layers.credibility.factCheckSignals} Verified</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-3">
                                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.layers.credibility.score}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Content-specific Recommendations */}
                            {activeTool === 'content' && result && (
                                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-slate-700 p-8 shadow-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-50 rounded-lg text-orange-600">
                                                <AlertTriangle size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">How to Score 75%+ (Improvement Plan)</h2>
                                                <p className="text-xs text-gray-500 dark:text-white font-medium mt-1">Actionable steps to reach Verified status</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-purple-600 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
                                            {result.recommendations?.length || 0} Actions Found
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                                        {/* Show all existing recommendations, but obscure them based on index */}
                                        {result.recommendations?.map((rec, i) => {
                                            const isLocked = !isPremium && i >= 1; // Lock everything after the 1st item for free users

                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        if (isLocked) {
                                                            setUpgradeMessage("Unlock the full Improvement Plan to boost your score!");
                                                            setShowUpgradeModal(true);
                                                        }
                                                    }}
                                                    className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all 
                                                    ${isLocked
                                                            ? 'blur-sm select-none opacity-60 cursor-pointer hover:opacity-80'
                                                            : 'hover:shadow-lg'
                                                        }
                                                    ${rec.type === 'Critical' ? 'bg-red-50/50 border-red-100 hover:border-red-200' :
                                                            rec.type === 'Major' ? 'bg-orange-50/50 border-orange-100 hover:border-orange-200' :
                                                                'bg-blue-50/50 border-blue-100 hover:border-blue-200'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md ${rec.type === 'Critical' ? 'bg-red-100 text-red-700' :
                                                            rec.type === 'Major' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {rec.type} Impact
                                                        </span>
                                                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
                                                            +{rec.impactPoints} pts
                                                        </span>
                                                    </div>

                                                    <div className="text-gray-800 dark:text-white text-sm font-bold leading-snug">
                                                        {rec.text}
                                                    </div>

                                                    <div className="mt-auto pt-3 border-t border-gray-200/50 flex justify-between items-center">
                                                        <span className="text-[10px] text-gray-400 dark:text-white font-bold uppercase">{rec.category}</span>
                                                        {rec.type === 'Critical' && !isLocked && (
                                                            <Link href="/writing-room" className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1">
                                                                Fix Now <ArrowRight size={10} />
                                                            </Link>
                                                        )}
                                                        {isLocked && <div className="text-[10px] font-bold text-gray-400 dark:text-white flex items-center gap-1"><Lock size={10} /> Locked</div>}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* If there are fewer than 3 items, show dummy blurred cards to fill the grid and hint at more value */}
                                        {!isPremium && (result.recommendations?.length || 0) < 3 && (
                                            <>
                                                {Array.from({ length: 3 - (result.recommendations?.length || 0) }).map((_, idx) => (
                                                    <div
                                                        key={`dummy-${idx}`}
                                                        onClick={() => {
                                                            setUpgradeMessage("Unlock the full Improvement Plan to boost your score!");
                                                            setShowUpgradeModal(true);
                                                        }}
                                                        className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50 opacity-60 blur-sm cursor-pointer hover:opacity-80 select-none"
                                                    >
                                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                                        <div className="h-12 w-full bg-gray-200 rounded"></div>
                                                        <div className="mt-auto pt-3 border-t border-gray-200 flex justify-between items-center">
                                                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                                            <div className="text-[10px] font-bold text-gray-400 dark:text-white flex items-center gap-1"><Lock size={10} /> Locked</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            <VerifyCertificate />
                        </div>
                    </div>
                </section>



                <TrustHubWhyUs />

                <FAQ theme="green" items={[
                    {
                        question: "How accurate is the Trust Score?",
                        answer: "Our multi-layered forensic analysis aggregates data from 4 different AI detection models to provide an accuracy rate of over 99%."
                    },
                    {
                        question: "What does the Verified Seal mean?",
                        answer: "It certifies that your content has passed our rigorous checks for Authenticity, Quality, Originality, and Credibility. It serves as a proof of human authorship."
                    },
                    {
                        question: "Do you check for plagiarism?",
                        answer: "Yes, Layer 3 of our analysis checks for uniqueness and potential plagiarism against billions of web pages."
                    }
                ]} />

                <TrustHubTestimonials />

                <div className="max-w-3xl mx-auto text-center mt-12 pb-12 border-t border-gray-200 pt-6">
                    <p className="text-[10px] text-gray-400 dark:text-white leading-relaxed opacity-60">
                        Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases.
                    </p>
                </div>
            </div >
        </main >
    );
}

export default function TrustHubPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F8F9FC]" />}>
            <TrustHubContent />
        </Suspense>
    );
}
