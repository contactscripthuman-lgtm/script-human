"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, RotateCcw, Wand2, AlertTriangle, ChevronDown, CheckCircle2, ChevronRight, X, Sparkles, BrainCircuit, Ghost, Volume2, Bot, Thermometer, Activity, HelpCircle, Briefcase, Smile, Users, GraduationCap, BookOpen, PenTool, Palette, Building2, ShieldCheck, Mail, Share2, User, Lock, FileText, RefreshCw } from "lucide-react";
import ToolNavbar from "@/components/ToolNavbar";
import WritingRoomWhyUs from "@/components/writing-room/WhyChooseUs";
import FAQ from "@/components/FAQ";
import WritingRoomTestimonials from "@/components/writing-room/Testimonials";
import Image from "next/image";
import { motion } from "framer-motion";

import WritingRoomSidebar, { ToolType } from "@/components/writing-room/WritingRoomSidebar";
import PulseVisualizer from "@/components/writing-room/PulseVisualizer";
import HeatmapEditor from "@/components/writing-room/HeatmapEditor";
import HelpTooltip from "@/components/writing-room/HelpTooltip";
import TypingEffect from "@/components/writing-room/TypingEffect";
import QuickTip from "@/components/writing-room/QuickTip";
import { detectSiliconSmog, generatePulseSyncData, generateHeatmapData, DetectionResult, PulseData, HeatmapData } from "@/lib/writing-room/detection";
import { useRef } from "react";
import { useFreeTier } from "@/hooks/use-free-tier";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import UpgradeModal from "@/components/UpgradeModal";
import PremiumLock from "@/components/PremiumLock";
import { humanizeTextAction } from "@/app/actions/humanize";

export default function WritingRoom() {
    const [text, setText] = useState("");
    const [humanizedText, setHumanizedText] = useState("");
    const [stats, setStats] = useState<DetectionResult | null>(null);
    const [pulse, setPulse] = useState<PulseData[]>([]);
    const [heat, setHeat] = useState<HeatmapData[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [grammarResult, setGrammarResult] = useState<any>(null);
    const [grammarError, setGrammarError] = useState<string | null>(null);
    const [showMoodSelector, setShowMoodSelector] = useState(false);
    const [activeTool, setActiveTool] = useState<ToolType>('persona');
    const [socialPlatform, setSocialPlatform] = useState<string>('linkedin');
    const [showQuickTip, setShowQuickTip] = useState(false);
    
    // Additional states for new tools
    const [extraInputs, setExtraInputs] = useState<Record<string, string>>({});
    const [toolResult, setToolResult] = useState<any>(null);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedText = e.clipboardData.getData('text');
        const currentWordCount = text.split(/\s+/).filter(Boolean).length;
        const pastedWordCount = pastedText.split(/\s+/).filter(Boolean).length;
        const totalWordCount = currentWordCount + pastedWordCount;

        if (totalWordCount < 1000) {
            setShowQuickTip(true);
            // Auto hide after 10 seconds if not closed
            setTimeout(() => setShowQuickTip(false), 10000);
        } else {
            setShowQuickTip(false);
        }
    };

    // Real-time Analysis
    useEffect(() => {
        if (!text) {
            setStats(null);
            setPulse([]);
            setHeat([]);
            return;
        }

        const handler = setTimeout(() => {
            setStats(detectSiliconSmog(text));
            setPulse(generatePulseSyncData(text));
            setHeat(generateHeatmapData(text));
        }, 500);

        return () => clearTimeout(handler);
    }, [text]);

    const ignoreNextClear = useRef(false);

    // Auto-load content from home page redirect or extension and set active tool
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const tool = searchParams.get('tool') as ToolType;
            
            if (tool && tool !== 'persona') {
                ignoreNextClear.current = true;
                setActiveTool(tool);
            }

            const initialContent = localStorage.getItem("writingRoomInitialContent");
            if (initialContent) {
                setText(initialContent);
                localStorage.removeItem("writingRoomInitialContent");
            }
        }
    }, []);

    // Auto-reset: Clear humanized text when user deletes input text
    useEffect(() => {
        if (text.trim() === '') {
            setHumanizedText('');
            setShowMoodSelector(false);
        }
    }, [text]);

    const isFirstRender = useRef(true);

    // Auto-reset: Clear EVERYTHING when switching tools
    useEffect(() => {
        // Skip the first render to avoid clearing localStorage content
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (ignoreNextClear.current) {
            ignoreNextClear.current = false;
            return;
        }

        setText('');
        setHumanizedText('');
        setGrammarResult(null);
        setGrammarError(null);
        setStats(null);
        setPulse([]);
        setHeat([]);
        setIsProcessing(false);
        setIsCopied(false);
        setShowMoodSelector(false);
        setExtraInputs({});
        setToolResult(null);
    }, [activeTool]);

    const { isPremium, hasProAccess, trackUsage, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();
    const { wordsUsed, wordsLimit, isLimitReached, timeUntilReset, recordUsage } = useUsageLimits();

    const handleHumanizeClick = () => {
        if (!text) return;
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        // Free tier 1000 word daily limit enforcement
        if (!isPremium && (wordsUsed + wordCount > wordsLimit)) {
            const remaining = Math.max(0, wordsLimit - wordsUsed);
            setUpgradeMessage(`Daily word limit reached! You have ${remaining} words remaining today. Resets in: ${timeUntilReset.hours}h ${timeUntilReset.minutes}m. Experience unlimited word count, get Pro plan!`);
            setShowUpgradeModal(true);
            return;
        }

        if (!trackUsage('writing-room', wordCount)) return;
        setShowMoodSelector(true);
    };

    const handleGrammarCheckClick = async () => {
        if (!text) return;
        setIsProcessing(true);
        setGrammarResult(null);
        setGrammarError(null);

        try {
            const response = await fetch('/api/grammar-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Grammar fixing feature is currently unavailable. Please check grammar manually.');
            }

            setGrammarResult(data.suggestions);
        } catch (error: any) {
            setGrammarError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleMoodSelect = async (selectedMood: string) => {
        if (!hasProAccess && selectedMood !== 'casual') {
            setUpgradeMessage("This mood is only available on the Premium Plan.");
            setShowUpgradeModal(true);
            return;
        }

        console.log('🔬 GENERATION STARTED');
        console.log('Mood selected:', selectedMood);

        setIsProcessing(true);

        try {
            if (activeTool === 'social' && hasProAccess) {
                // Call social-media-pro RapidAPI for Pro Users
                const response = await fetch('/api/social-media-pro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: text,
                        platform: socialPlatform,
                        tone: selectedMood
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Pro Social Media generation failed');
                }

                const data = await response.json();
                setHumanizedText(data.post || data.result || JSON.stringify(data));
                
                console.log(`✅ Pro Social Media generation complete!`);
                return;
            }

            // Existing iterative humanization API
            // Artificial delay for UX (5 seconds)
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Call iterative humanization API
            const response = await fetch('/api/humanize-iterative', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    mood: selectedMood,
                    toolType: activeTool,
                    socialPlatform: activeTool === 'social' ? socialPlatform : undefined
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Humanization failed');
            }

            const data = await response.json();

            console.log(`✅ Humanization complete!`);
            console.log(`Final Score: ${data.score}%`);
            console.log(`Iterations: ${data.iterations}`);

            setHumanizedText(data.humanizedText);

            // Record usage tracking for Free Users
            if (!isPremium) {
                const wordCount = text.split(/\s+/).filter(Boolean).length;
                recordUsage(wordCount);
            }
        } catch (error: unknown) {
            console.error('Humanization error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong during humanization.';
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleProToolExecute = async () => {
        if (!hasProAccess) {
            setUpgradeMessage("This advanced tool is only available on the Pro plan.");
            setShowUpgradeModal(true);
            return;
        }

        setIsProcessing(true);
        setToolResult(null);
        setHumanizedText("");
        setGrammarError(null);

        try {
            let endpoint = '';
            let payload: any = {};

            switch (activeTool) {
                case 'paraphrase':
                    endpoint = '/api/paraphrase';
                    payload = { text };
                    if (!text) throw new Error("Please enter text to paraphrase.");
                    break;
                case 'hallucination':
                    endpoint = '/api/hallucination';
                    payload = { text, context: extraInputs.context || "", question: extraInputs.question || "" };
                    if (!text || !payload.context || !payload.question) {
                        throw new Error("Please fill in all fields (Generated Answer, Context, Question).");
                    }
                    break;
                case 'sentiment':
                    endpoint = '/api/sentiment';
                    payload = { text };
                    if (!text) throw new Error("Please enter text for sentiment analysis.");
                    break;
                case 'content':
                    endpoint = '/api/content-writer';
                    payload = { topic: text };
                    if (!text) throw new Error("Please enter a topic.");
                    break;
                case 'email':
                    endpoint = '/api/email-writer';
                    payload = { 
                        sender: extraInputs.sender || "", 
                        receiver: extraInputs.receiver || "", 
                        purpose: text 
                    };
                    if (!text || !payload.sender || !payload.receiver) {
                        throw new Error("Please fill in all fields (Sender, Receiver, Purpose).");
                    }
                    break;
                default:
                    throw new Error("Invalid tool");
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Feature is currently unavailable.');
            }

            if (activeTool === 'paraphrase') {
                setHumanizedText(data.result || data.paraphrased_text || JSON.stringify(data));
            } else if (activeTool === 'email' || activeTool === 'content') {
                setHumanizedText(data.email || data.content || data.result || JSON.stringify(data));
            } else {
                setToolResult(data);
            }

        } catch (error: any) {
            setGrammarError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(humanizedText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-orange-100 dark:selection:bg-orange-900">

            {/* Header */}
            {/* Header - Modern Minimal Navigation */}
            {/* Header */}
            <ToolNavbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${activeTool === 'social' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                        activeTool === 'email' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                            'bg-orange-50 border-orange-100 text-orange-700'
                        }`}>
                        <Sparkles size={16} className={
                            activeTool === 'social' ? 'text-blue-500' :
                                activeTool === 'email' ? 'text-purple-500' :
                                    'text-orange-500'
                        } />
                        <span className="text-sm font-bold uppercase tracking-wide">
                            {activeTool === 'social' ? 'Social Media Humanizer' :
                                activeTool === 'email' ? 'Humanized Email Writer' :
                                    activeTool === 'grammar' ? 'Grammar Correction Suggestions' :
                                        'Advanced AI Humanizer'}
                        </span>
                    </div>

                    <h1 className="text-6xl font-black mb-6 font-display text-gray-900 dark:text-white">
                        {activeTool === 'social' ? (
                            <>Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Social Vibe</span></>
                        ) : activeTool === 'email' ? (
                            <>Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Email Flow</span></>
                        ) : activeTool === 'grammar' ? (
                            <>Grammar <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Suggestions</span></>
                        ) : (
                            <>Restore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Human Vibe</span></>
                        )}
                    </h1>

                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        {activeTool === 'social' ? "Craft engaging, human-sounding posts that connect with your audience." :
                            activeTool === 'email' ? "Write emails that sound professional yet personal, perfect for business communication." :
                                activeTool === 'grammar' ? "Identify grammar issues in your humanized text and get suggestions on how to fix them manually." :
                                    "Bypass AI detection with our advanced re-writing engine. Polish your content to be indistinguishable from human writing."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-screen">

                    {/* LEFT SIDEBAR (2 cols) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            <WritingRoomSidebar
                                activeTool={activeTool}
                                onSelectTool={setActiveTool}
                                disabled={isProcessing}
                                hasProAccess={hasProAccess}
                                onLockedClick={() => {
                                    setUpgradeMessage("This advanced tool is only available on the Pro plan.");
                                    setShowUpgradeModal(true);
                                }}
                            />
                        </div>
                    </div>

                    {/* CENTER EDITOR */}
                    <div className={`space-y-6 ${activeTool === 'persona' ? 'lg:col-span-6' : 'lg:col-span-9'}`}>

                        {/* Mobile Tool Selector */}
                        <div className="block lg:hidden bg-white dark:bg-slate-800 rounded-3xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm overflow-x-auto whitespace-nowrap hide-scrollbar">
                           <div className="flex gap-3">
                                {[
                                    { id: 'persona', label: 'Advanced Humanizer', icon: FileText, pro: false },
                                    { id: 'social', label: 'Social Media Tone', icon: Share2, pro: false },
                                    { id: 'email', label: 'Email Writer', icon: Mail, pro: true },
                                    { id: 'grammar', label: 'Grammar Correction', icon: PenTool, pro: false },
                                    { id: 'paraphrase', label: 'Paraphrasing Tool', icon: RefreshCw, pro: true },
                                    { id: 'hallucination', label: 'Hallucination Detector', icon: Activity, pro: true },
                                    { id: 'sentiment', label: 'Sentiment Analyze', icon: Smile, pro: true },
                                    { id: 'content', label: 'Content Writer', icon: BookOpen, pro: true },
                                ].map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => {
                                            if (tool.pro && !hasProAccess) {
                                                setUpgradeMessage("This advanced tool is only available on the Pro plan.");
                                                setShowUpgradeModal(true);
                                            } else {
                                                setActiveTool(tool.id as any);
                                            }
                                        }}
                                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-bold text-sm ${
                                            activeTool === tool.id
                                                ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300'
                                        }`}
                                    >
                                        <tool.icon size={16} />
                                        <span>{tool.label}</span>
                                        {tool.pro && !hasProAccess && <Lock size={12} className="text-orange-500 ml-1" />}
                                    </button>
                                ))}
                           </div>
                        </div>

                        {/* Text Input Area */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-1 shadow-sm border border-gray-200 dark:border-slate-700 relative">
                            <QuickTip isVisible={showQuickTip} onClose={() => setShowQuickTip(false)} />
                            
                            {activeTool === 'hallucination' && (
                                <div className="p-6 space-y-4 border-b border-gray-100 dark:border-slate-700">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-display">Context / Source Text</label>
                                        <textarea
                                            value={extraInputs.context || ''}
                                            onChange={(e) => setExtraInputs({...extraInputs, context: e.target.value})}
                                            placeholder="Paste the source material or context here..."
                                            className="w-full min-h-[150px] p-4 rounded-2xl resize-y border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-gray-50 dark:bg-slate-900 font-[var(--font-metro)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-display">Question Asked</label>
                                        <input
                                            type="text"
                                            value={extraInputs.question || ''}
                                            onChange={(e) => setExtraInputs({...extraInputs, question: e.target.value})}
                                            placeholder="What question was asked?"
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-gray-50 dark:bg-slate-900 font-[var(--font-metro)]"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTool === 'email' && (
                                <div className="p-6 space-y-4 border-b border-gray-100 dark:border-slate-700 flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-display">Sender Name</label>
                                        <input
                                            type="text"
                                            value={extraInputs.sender || ''}
                                            onChange={(e) => setExtraInputs({...extraInputs, sender: e.target.value})}
                                            placeholder="Your name"
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-gray-50 dark:bg-slate-900 font-[var(--font-metro)]"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-display">Receiver Name</label>
                                        <input
                                            type="text"
                                            value={extraInputs.receiver || ''}
                                            onChange={(e) => setExtraInputs({...extraInputs, receiver: e.target.value})}
                                            placeholder="Recipient's name"
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-gray-50 dark:bg-slate-900 font-[var(--font-metro)]"
                                        />
                                    </div>
                                </div>
                            )}

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onPaste={handlePaste}
                                placeholder={
                                    activeTool === 'grammar' ? "Paste your humanized text here to get grammar suggestions..." : 
                                    activeTool === 'hallucination' ? "Paste the AI's generated answer here to check for hallucinations..." :
                                    activeTool === 'email' ? "What is the purpose of this email? (e.g., 'Ask for a meeting next week to discuss the project')" :
                                    activeTool === 'content' ? "Enter a topic to generate content about..." :
                                    "Paste your AI draft here..."
                                }
                                className={`w-full ${['hallucination', 'email'].includes(activeTool) ? 'min-h-[300px]' : 'min-h-[600px]'} p-6 rounded-3xl resize-none focus:outline-none text-lg leading-relaxed text-gray-700 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500 bg-transparent font-[var(--font-metro)]`}
                            />

                            {/* Toolbar */}
                            <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50 rounded-b-3xl">
                                <div className="text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                    {text.split(/\s+/).filter(Boolean).length} words
                                </div>
                                <button
                                    onClick={
                                        activeTool === 'grammar' ? handleGrammarCheckClick : 
                                        ['paraphrase', 'hallucination', 'sentiment', 'content', 'email'].includes(activeTool) ? handleProToolExecute :
                                        handleHumanizeClick
                                    }
                                    disabled={!text || isProcessing}
                                    className={`px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-transform disabled:opacity-50 disabled:scale-100 ${
                                        activeTool === 'hallucination' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20 hover:scale-105' :
                                        activeTool === 'sentiment' ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/20 hover:scale-105' :
                                        activeTool === 'content' ? 'bg-gradient-to-r from-indigo-500 to-blue-500 shadow-indigo-500/20 hover:scale-105' :
                                        activeTool === 'paraphrase' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-blue-500/20 hover:scale-105' :
                                        activeTool === 'email' ? 'bg-gradient-to-r from-purple-500 to-violet-500 shadow-purple-500/20 hover:scale-105' :
                                        'bg-gradient-to-r from-[#FF9A6C] to-[#FF6B4A] shadow-orange-500/20 hover:scale-105'
                                    }`}
                                >
                                    {isProcessing ? "Processing..." : 
                                     activeTool === 'grammar' ? "Get Grammar Suggestions" : 
                                     activeTool === 'hallucination' ? "Scan for Hallucinations" :
                                     activeTool === 'sentiment' ? "Analyze Sentiment" :
                                     activeTool === 'email' ? "Write Email" :
                                     activeTool === 'content' ? "Generate Content" :
                                     activeTool === 'paraphrase' ? "Paraphrase" :
                                     "Humanize Now"}
                                    <Sparkles size={16} fill="currentColor" className="text-white/80" />
                                </button>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-white text-center mt-2 mx-auto leading-relaxed max-w-2xl opacity-60">
                            Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases. <span className="font-bold">For the most accurate results, please provide a longer text sample (at least 1000+ words recommended).</span>
                        </p>

                        {/* Social Media Platform Selector */}
                        {activeTool === 'social' && showMoodSelector && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-3 mb-6"
                            >
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-display mb-4">Select Platform:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { value: 'linkedin', label: 'LinkedIn' },
                                        { value: 'twitter', label: 'X (Twitter)' },
                                        { value: 'instagram', label: 'Instagram' },
                                        { value: 'facebook', label: 'Facebook' },
                                    ].map((platform) => (
                                        <button
                                            key={platform.value}
                                            onClick={() => setSocialPlatform(platform.value)}
                                            className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${socialPlatform === platform.value
                                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 text-gray-600 dark:text-white '
                                                }`}
                                        >
                                            {platform.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Inline Mood Selector */}
                        {showMoodSelector && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-3"
                            >
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-display mb-4">Select Mood:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        { value: "professional", label: "Professional", icon: Briefcase },
                                        { value: "casual", label: "Casual", icon: Smile },
                                        { value: "friendly", label: "Friendly", icon: Users },
                                        { value: "academic", label: "Academic", icon: GraduationCap },
                                        { value: "storytelling", label: "Storytelling", icon: BookOpen },
                                    ].map((mood) => {
                                        const Icon = mood.icon;
                                        return (
                                            <motion.button
                                                key={mood.value}
                                                onClick={() => handleMoodSelect(mood.value)}
                                                disabled={isProcessing}
                                                className={`p-4 rounded-xl border-2 transition-all text-left relative group ${!hasProAccess && mood.value !== 'casual'
                                                    ? 'border-gray-100 bg-gray-50 opacity-100'
                                                    : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {!hasProAccess && mood.value !== 'casual' && <PremiumLock />}
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg transition-colors ${!hasProAccess && mood.value !== 'casual'
                                                        ? 'bg-gray-100 text-gray-400'
                                                        : 'bg-gray-100 group-hover:bg-orange-100 text-gray-600 group-hover:text-orange-500'
                                                        }`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className={`font-bold text-sm font-display ${!hasProAccess && mood.value !== 'casual' ? 'text-gray-400' : 'text-gray-900 dark:text-white '
                                                        }`}>
                                                        {mood.label}
                                                    </span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                                {isProcessing && (
                                    <div className="text-center py-4">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white font-[var(--font-metro)]">Humanizing your content...</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Grammar Check Output */}
                        {activeTool === 'grammar' && (grammarResult || grammarError) && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white font-display">
                                    <PenTool size={18} className="text-orange-500" />
                                    <span>Grammar Suggestions</span>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                                    {grammarError ? (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                                            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                                            <div className="text-sm text-red-900 font-[var(--font-metro)]">
                                                {grammarError}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {grammarResult.error ? (
                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-900 font-[var(--font-metro)] whitespace-pre-wrap">
                                                    {grammarResult.error}
                                                </div>
                                            ) : (
                                                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm text-emerald-900 font-[var(--font-metro)]">
                                                    No grammar issues found!
                                                </div>
                                            )}
                                            
                                            {grammarResult.correction && grammarResult.correction !== text && (
                                                <div className="mt-4">
                                                    <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm mb-2 mt-4">Suggested Fix:</h4>
                                                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 text-green-800 dark:text-green-300 text-sm whitespace-pre-wrap">
                                                        {grammarResult.correction}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                                                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                                                <p className="text-sm text-amber-900 font-[var(--font-metro)]">
                                                    <strong>Please apply these fixes manually to your document.</strong> Automated grammar checkers can sometimes reintroduce robotic patterns that trigger AI detectors. By making these corrections yourself, you ensure your text retains its natural, human feel.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* JSON / Data Results for Pro Tools */}
                        {toolResult && !humanizedText && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white font-display">
                                    <Activity size={18} className={
                                        activeTool === 'hallucination' ? "text-emerald-500" :
                                        activeTool === 'sentiment' ? "text-purple-500" : 'text-blue-500'
                                    } />
                                    <span>{activeTool === 'hallucination' ? 'Hallucination Analysis' : 'Analysis Result'}</span>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                                    <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap break-words">
                                        {typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Humanized Output - Shows ABOVE heatmap */}
                        {humanizedText && activeTool !== 'grammar' && (
                            <div className="space-y-4">
                                {
                                    /* Subject Line UI Removed */
                                }

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white font-display">
                                            <Sparkles size={18} className="text-orange-500" />
                                            <span>
                                                {activeTool === 'email' ? 'Email Output' : 
                                                 activeTool === 'paraphrase' ? 'Paraphrased Text' : 
                                                 activeTool === 'content' ? 'Generated Content' : 
                                                 'Humanized Result'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition font-display"
                                        >
                                            {isCopied ? (
                                                <>
                                                    <Check size={14} /> Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} /> Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                                        <TypingEffect
                                            text={humanizedText}
                                            speed={5}
                                            className="text-lg leading-relaxed text-gray-700 dark:text-white font-[var(--font-metro)] whitespace-pre-wrap"
                                        />
                                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest">
                                            {humanizedText.split(/\s+/).filter(Boolean).length} words
                                        </div>
                                    </div>

                                    {/* Grammar Warning */}
                                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                                        <div className="text-sm text-amber-900 font-[var(--font-metro)]">
                                            <span className="font-bold block mb-1">Important Note</span>
                                            <p className="mb-2">
                                                <strong>Please check grammar and spellings again.</strong> To ensure your content successfully bypasses AI detection, our tool occasionally introduces natural, human-like variations that may appear as minor grammatical quirks. This is an intentional feature designed to give your text an authentic human touch!
                                            </p>
                                            <p className="mb-2">
                                                We recommend reviewing and manually correcting any minor errors. <strong>Please avoid using automated grammar checkers, as they often reintroduce robotic patterns and spoil the humanization.</strong>
                                            </p>
                                            <p>
                                                <em>Tip:</em> If your humanized content scores below 75% in the Trust Hub, simply paste the result back into our humanizer here and run it again to further refine the text.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Heatmap Visualization - Only show if NO humanized result and NOT grammar/sentiment/hallucination */}
                        {text && !humanizedText && !toolResult && !['grammar', 'sentiment', 'hallucination', 'paraphrase', 'content', 'email'].includes(activeTool) && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white font-display">
                                    <Thermometer size={18} className="text-purple-500" />
                                    <span>Silicon Smog Heatmap</span>
                                </div>
                                <HeatmapEditor data={heat} />
                            </div>
                        )}



                    </div>

                    {/* RIGHT COLUMN - ANALYSIS (3 cols) */}
                    {activeTool === 'persona' && (
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-6">

                            {/* Score Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 right-0 p-4 opacity-10"
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        y: [0, -3, 3, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Bot size={120} />
                                </motion.div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-gray-400 dark:text-white text-xs font-bold uppercase tracking-widest font-display">Smog Detection Score</h3>
                                    <HelpTooltip text="This score measures how robotic your text appears. Higher scores (50-100) indicate AI-generated patterns like overused phrases, uniform sentence lengths, and passive voice. Lower scores (0-50) suggest more natural, human-like writing." />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-6xl font-black font-display ${humanizedText ? "text-emerald-500" : (stats && stats.score > 50 ? "text-red-500" : "text-emerald-500")
                                        }`}>
                                        {humanizedText ? "5" : (stats ? stats.score : 0)}
                                    </span>
                                    <span className="text-gray-400 dark:text-white font-bold">/ 100</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-white mt-2 font-[var(--font-metro)]">
                                    {humanizedText
                                        ? "✅ Excellent! Text appears naturally human-written."
                                        : (stats && stats.score > 50 ? "High levels of robotic patterns detected." : "Text appears relatively natural.")
                                    }
                                </p>
                            </div>



                            {/* Pulse Visualizer */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-gray-900 dark:text-white text-sm font-bold font-display flex items-center gap-2">
                                        <Activity size={16} className="text-blue-500" />
                                        Pulse-Sync Rhythm
                                    </h3>
                                    <HelpTooltip text="Visualizes your sentence rhythm. Orange bars show natural variance in length (good), while purple bars indicate robotic uniformity (15-25 words). Human writing has a jagged, heartbeat-like pattern." />
                                </div>
                                <PulseVisualizer data={pulse} />
                                <div className="flex gap-4 text-[10px] font-bold uppercase text-gray-400 dark:text-white">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400" /> Natural</div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-400" /> Robotic</div>
                                </div>
                            </div>

                            {/* Detailed Matches */}
                            {humanizedText ? (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-gray-900 dark:text-white text-sm font-bold font-display">Detected Issues</h3>
                                        <HelpTooltip text="After humanization, your text is free from AI detection patterns!" />
                                    </div>
                                    <div className="flex items-center justify-center py-8 text-emerald-500">
                                        <div className="text-center">
                                            <div className="text-5xl mb-2">✓</div>
                                            <p className="text-sm font-bold font-display">No Issues Detected</p>
                                            <p className="text-xs text-gray-500 dark:text-white mt-1 font-[var(--font-metro)]">Your text appears natural and human-written</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                stats && stats.matches.length > 0 && (
                                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-gray-900 dark:text-white text-sm font-bold font-display">Detected Issues</h3>
                                            <HelpTooltip text="Breakdown of AI patterns found in your text. Each issue type adds points to your Smog Score. Common issues include overused phrases (+15pts), lack of contractions (+5pts), and passive voice (+8pts)." />
                                        </div>
                                        <div className="space-y-2">
                                            {stats.matches.map((m, i) => (
                                                <div key={i} className="flex justify-between items-center text-xs font-medium p-2 bg-red-50 rounded-lg text-red-700">
                                                    <span>{m.rule}</span>
                                                    <span className="font-bold">+{m.points} pts</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                    )}

                </div>
            </div>

            {/* Benefits Section - Enhanced */}
            <WritingRoomWhyUs />

            <FAQ theme="orange" items={[
                {
                    question: "How does the AI Humanizer work?",
                    answer: "Our advanced engine analyzes your text for robotic patterns ('Silicon Smog') and rewrites it using natural language processing to mimic human variance, idioms, and emotional tone."
                },
                {
                    question: "Will my text bypass AI detection?",
                    answer: "Yes. Our iterative humanization process targets specific markers used by detectors (like GPTZero and Turnitin), consistently achieving 100% human scores."
                },
                {
                    question: "Is my content secure?",
                    answer: "Absolutely. All processing happens locally in your browser session. We never store or use your text to train our models."
                }
            ]} />

            <WritingRoomTestimonials />
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                message={upgradeMessage}
                planTier="pro"
            />
        </main >
    );
}
