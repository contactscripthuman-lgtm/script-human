"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Upload, FileText, CheckCircle, TrendingUp, Activity, Sparkles, Lock } from "lucide-react";
import ParticleSphere from "@/components/enterprise/ParticleSphere";
import {
    trainVoiceProfile,
    matchTextToProfile,
    type VoiceProfile,
    type TrainingResult
} from "@/lib/enterprise/voice-clone";

import { useFreeTier } from "@/hooks/use-free-tier";
import { PRICING, UserTier } from "@/lib/usage-limits";
import UpgradeModal from "@/components/UpgradeModal";

export default function VoiceClonePage() {
    const { hasEnterpriseAccess, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState(0);
    const [profile, setProfile] = useState<VoiceProfile | null>(null);
    const [trainingResult, setTrainingResult] = useState<TrainingResult | null>(null);
    const [testText, setTestText] = useState("");
    const [matchResult, setMatchResult] = useState<ReturnType<typeof matchTextToProfile> | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!hasEnterpriseAccess) {
            setUpgradeMessage("Upgrade to Enterprise to train custom voice models.");
            setShowUpgradeModal(true);
            return;
        }

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file => file.type === 'application/pdf' || file.type === 'text/plain'
        );

        setFiles(prev => [...prev, ...droppedFiles].slice(0, 10));
    }, [hasEnterpriseAccess, setShowUpgradeModal, setUpgradeMessage]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!hasEnterpriseAccess) {
            e.preventDefault();
            setUpgradeMessage("Upgrade to Enterprise to train custom voice models.");
            setShowUpgradeModal(true);
            return;
        }

        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles].slice(0, 10));
        }
    }, [hasEnterpriseAccess, setShowUpgradeModal, setUpgradeMessage]);

    const handleTrain = async () => {
        if (!hasEnterpriseAccess) {
            setUpgradeMessage("Upgrade to Enterprise to train custom voice models.");
            setShowUpgradeModal(true);
            return;
        }

        if (files.length === 0) return;

        setIsTraining(true);
        setTrainingProgress(0);

        // Simulate training with progress
        const interval = setInterval(() => {
            setTrainingProgress(prev => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + 5;
            });
        }, 200);

        // Simulated text extraction and training
        const sampleTexts = files.map((file, i) =>
            `Sample text from ${file.name}. This represents the brand's unique voice and style.` +
            `It includes characteristic sentence structures, vocabulary choices, and rhetorical patterns.` +
            `Document ${i + 1} demonstrates consistent tone and messaging across all communications.`
        );

        const result = await trainVoiceProfile("Brand Voice", sampleTexts);

        clearInterval(interval);
        setTrainingProgress(100);

        setTimeout(() => {
            setProfile(result.profile);
            setTrainingResult(result);
            setIsTraining(false);
        }, 1000);
    };

    const handleTestText = () => {
        if (!hasEnterpriseAccess) {
            setUpgradeMessage("Upgrade to Enterprise to test voice matching.");
            setShowUpgradeModal(true);
            return;
        }

        if (!profile || !testText) return;

        const result = matchTextToProfile(testText, profile);
        setMatchResult(result);
    };

    const getMatchColor = (match: string) => {
        switch (match) {
            case 'excellent': return 'text-emerald-400';
            case 'good': return 'text-blue-400';
            case 'fair': return 'text-yellow-400';
            default: return 'text-red-400';
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-purple-100 dark:selection:bg-purple-900">

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                message={upgradeMessage}
                planTier="enterprise"
            />

            {/* Header */}
            <nav className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 relative flex items-center justify-between px-6">

                {/* Left: Site Logo & Name */}
                <Link href="/" className="flex items-center gap-2">
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

                    {trainingResult && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
                            <CheckCircle size={16} className="text-emerald-500" />
                            <span className="text-emerald-700 text-sm font-mono font-bold">
                                {(trainingResult.confidence * 100).toFixed(1)}% Match
                            </span>
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-100 rounded-full mb-6 text-cyan-700">
                        {!hasEnterpriseAccess && <Lock size={12} className="text-cyan-600" />}
                        <Sparkles size={16} className="text-cyan-500" />
                        <span className="text-sm font-bold uppercase tracking-wide">ADAPTIVE AI VOICE CLONING</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Users className="text-cyan-600" size={32} />
                        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Voice-Clone Dictionary</h1>
                    </div>
                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        Train AI on your brand&apos;s unique tone. Upload PDFs to generate a linguistic fingerprint.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* LEFT: Training Section */}
                    <div className="space-y-6">

                        {/* Upload Zone */}
                        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                            {!hasEnterpriseAccess && (
                                <div
                                    className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]"
                                    onClick={() => {
                                        setUpgradeMessage("Upgrade to Enterprise to train custom voice models.");
                                        setShowUpgradeModal(true);
                                    }}
                                >
                                    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100 dark:border-slate-700">
                                        <Lock size={16} className="text-orange-500" />
                                        <span className="text-sm font-bold text-gray-800 dark:text-white">Premium Feature</span>
                                    </div>
                                </div>
                            )}

                            <h3 className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Upload size={18} className="text-orange-600" />
                                Upload Training Documents
                            </h3>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => !hasEnterpriseAccess && setShowUpgradeModal(true)}
                                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${isDragging
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                    : 'border-gray-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600">
                                    <FileText size={32} />
                                </div>
                                <p className="text-gray-900 dark:text-white font-bold text-lg mb-2">
                                    Drag PDFs or Text Files
                                </p>
                                <p className="text-gray-500 dark:text-white text-sm mb-6 max-w-xs mx-auto">
                                    Upload 5-10 documents that represent your brand voice to analyze characteristic patterns.
                                </p>
                                <label className={`inline-block px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 transition-all cursor-pointer shadow-sm ${!hasEnterpriseAccess ? 'pointer-events-none' : ''}`}>
                                    Browse Files
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.txt"
                                        onChange={handleFileInput}
                                        className="hidden"
                                        disabled={!hasEnterpriseAccess}
                                    />
                                </label>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="mt-6 space-y-2">
                                    <div className="text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest mb-2">Selected Files</div>
                                    {files.map((file, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                                <FileText size={14} className="text-orange-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-white flex-1 truncate">{file.name}</span>
                                            <span className="text-xs text-gray-400 dark:text-white font-bold">{(file.size / 1024).toFixed(1)}KB</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Train Button */}
                            <button
                                onClick={handleTrain}
                                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:shadow-none text-lg flex items-center justify-center gap-2"
                            >
                                {!hasEnterpriseAccess && <Lock size={18} />}
                                {isTraining ? 'Scanning Linguistic Patterns...' : `Analyze & Train Pattern ${files.length > 0 ? `(${files.length} files)` : ''}`}
                            </button>
                        </div>

                        {/* Training Results */}
                        {trainingResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-emerald-100 dark:border-slate-700 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                            >
                                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    Voice Profile Generated
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                        <div className="text-3xl font-mono font-bold text-emerald-600 mb-1">
                                            {(trainingResult.confidence * 100).toFixed(1)}%
                                        </div>
                                        <div className="text-xs font-bold text-emerald-800/50 uppercase tracking-tight">Confidence</div>
                                    </div>

                                    <div className="p-4 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                                        <div className="text-3xl font-mono font-bold text-cyan-600 mb-1">
                                            {trainingResult.samplesAnalyzed}
                                        </div>
                                        <div className="text-xs font-bold text-cyan-800/50 uppercase tracking-tight">Samples</div>
                                    </div>

                                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                                        <div className="text-3xl font-mono font-bold text-purple-600 mb-1">
                                            {trainingResult.processingTime}ms
                                        </div>
                                        <div className="text-xs font-bold text-purple-800/50 uppercase tracking-tight">Time</div>
                                    </div>

                                    <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                                        <div className="text-3xl font-mono font-bold text-pink-600 mb-1">
                                            {trainingResult.profile.vector.syntacticVariance.toFixed(2)}
                                        </div>
                                        <div className="text-xs font-bold text-pink-800/50 uppercase tracking-tight">Variance</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT: Visualization & Testing */}
                    <div className="space-y-6">

                        {/* Particle Sphere - Light Green Background */}
                        <div className="aspect-square bg-emerald-50 rounded-3xl overflow-hidden relative shadow-inner ring-1 ring-emerald-100">
                            <div className="absolute top-6 left-6 z-10">
                                <h3 className="text-emerald-900/40 text-xs font-bold uppercase tracking-widest">Neural Visualization</h3>
                            </div>
                            <ParticleSphere
                                isProcessing={isTraining}
                                progress={trainingProgress}
                            />
                        </div>

                        {/* Voice Matching Test */}
                        {(profile || !hasEnterpriseAccess) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden"
                            >
                                {!hasEnterpriseAccess && (
                                    <div
                                        className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]"
                                        onClick={() => {
                                            setUpgradeMessage("Upgrade to Enterprise to test voice matching.");
                                            setShowUpgradeModal(true);
                                        }}
                                    >
                                        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100 dark:border-slate-700">
                                            <Lock size={16} className="text-orange-500" />
                                            <span className="text-sm font-bold text-gray-800 dark:text-white">Premium Feature</span>
                                        </div>
                                    </div>
                                )}

                                <h3 className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Activity size={18} className="text-cyan-600" />
                                    Test Voice Match
                                </h3>

                                <div className="relative">
                                    <textarea
                                        value={testText}
                                        onChange={(e) => setTestText(e.target.value)}
                                        placeholder="Paste AI-generated text to checking against your new voice profile..."
                                        className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none mb-4"
                                    />

                                    <button
                                        onClick={handleTestText}
                                        className="absolute bottom-6 right-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-0"
                                    >
                                        Run Analysis
                                    </button>
                                </div>

                                {/* Match Results */}
                                {matchResult && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="pt-4 border-t border-gray-100"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${matchResult.match === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                                                matchResult.match === 'good' ? 'bg-blue-100 text-blue-700' :
                                                    matchResult.match === 'fair' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {matchResult.match} Match
                                            </div>
                                            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
                                                {(matchResult.similarity * 100).toFixed(1)}%
                                            </span>
                                        </div>

                                        {matchResult.recommendations.length > 0 && (
                                            <div className="bg-orange-50 rounded-xl p-4">
                                                <div className="text-xs font-bold text-orange-800 uppercase mb-2">Improvement Tips</div>
                                                <div className="space-y-1">
                                                    {matchResult.recommendations.map((rec, i) => (
                                                        <div key={i} className="text-sm text-orange-900 flex items-start gap-2">
                                                            <span className="text-orange-500 mt-1.5">•</span>
                                                            <span className="leading-snug">{rec}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* How It Works & Importance Section */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 border-t border-gray-200 pt-16">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">
                            <Activity size={12} />
                            Methodology
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                            How the Voice Engine Works
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-white font-[var(--font-metro)] leading-relaxed">
                            <p>
                                Our proprietary engine goes beyond simple keyword matching. When you upload your training documents, we analyze over <strong>120 linguistic dimensions</strong>—from syntactic variance and rhythmic cadence to vocabulary depth and rhetorical structure.
                            </p>
                            <p>
                                This process creates a high-fidelity &quot;Digital Fingerprint&quot; of your brand&apos;s unique voice. The system then uses this profile to score new content, highlighting deviations and suggesting specific edits to align with your established identity.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-widest">
                            <TrendingUp size={12} />
                            Strategic Value
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                            Why Voice Consistency Matters
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-white font-[var(--font-metro)] leading-relaxed">
                            <p>
                                In an era of generic AI content, a distinct voice is your strongest competitive advantage. Inconsistent branding dilutes trust and confuses your audience.
                            </p>
                            <p>
                                The Voice-Clone Dictionary allows you to <strong>scale your content production</strong> without sacrificing authenticity. Whether you&apos;re a solo creator or an enterprise team, ensure every piece of content feels like it was written by your best copywriter.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
