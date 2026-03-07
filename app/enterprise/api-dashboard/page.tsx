"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Code2, Key, Copy, Check, Terminal as TerminalIcon,
    TrendingUp, Zap, Activity, Eye, Plus, Trash2, CheckCircle, Sparkles, Lock
} from "lucide-react";
import {
    createAPIKey,
    getAPIKeys,
    saveAPIKeys,
    getTransparencyLog,
    addToTransparencyLog,
    calculateRPS,
    calculateAvgLatency,
    type APIKey,
    type APIRequest
} from "@/lib/enterprise/api-manager";

import { useFreeTier } from "@/hooks/use-free-tier";
import UpgradeModal from "@/components/UpgradeModal";

export default function APIDashboardPage() {
    const { hasEnterpriseAccess, showUpgradeModal, setShowUpgradeModal, upgradeMessage, setUpgradeMessage } = useFreeTier();

    const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
    const [transparencyLog, setTransparencyLog] = useState<APIRequest[]>([]);
    const [showNewKeyModal, setShowNewKeyModal] = useState(false);
    const [newKeyName, setNewKeyName] = useState("");
    const [copiedKey, setCopiedKey] = useState("");
    const [testText, setTestText] = useState("");
    const [selectedKey, setSelectedKey] = useState("");
    const [isTestingAPI, setIsTestingAPI] = useState(false);
    const [testResult, setTestResult] = useState<{
        processingTime: number;
        complianceScore: number;
        changes?: unknown[];
        sanitizedText?: string;
    } | null>(null);

    // Live metrics
    const [rps, setRps] = useState(0);
    const [avgLatency, setAvgLatency] = useState(0);

    const terminalRef = useRef<HTMLDivElement>(null);

    // Load data on mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setApiKeys(getAPIKeys());
        setTransparencyLog(getTransparencyLog());
    }, []);

    // Update live metrics every second
    useEffect(() => {
        const interval = setInterval(() => {
            setRps(calculateRPS());
            setAvgLatency(calculateAvgLatency());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleCreateKey = () => {
        if (!hasEnterpriseAccess) {
            setUpgradeMessage("Upgrade to Enterprise to generate API keys.");
            setShowUpgradeModal(true);
            return;
        }

        if (!newKeyName.trim()) return;

        const newKey = createAPIKey(newKeyName);
        const updated = [...apiKeys, newKey];
        setApiKeys(updated);
        saveAPIKeys(updated);
        setShowNewKeyModal(false);
        setNewKeyName("");

        // Auto-copy new key
        navigator.clipboard.writeText(newKey.key);
        setCopiedKey(newKey.key);
        setTimeout(() => setCopiedKey(""), 3000);
    };

    const handleCopyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(""), 2000);
    };

    const handleDeleteKey = (id: string) => {
        if (!hasEnterpriseAccess) return; // Should not happen if delete btn is hidden/disabled logically, but safety check
        const updated = apiKeys.filter(k => k.id !== id);
        setApiKeys(updated);
        saveAPIKeys(updated);
    };

    const handleTestAPI = async () => {
        if (!hasEnterpriseAccess) {
            setUpgradeMessage("Upgrade to Enterprise to test the API.");
            setShowUpgradeModal(true);
            return;
        }

        if (!testText || !selectedKey) return;

        setIsTestingAPI(true);

        // Simulate API call
        const startTime = Date.now();

        try {
            const response = await fetch('/api/enterprise/sanitize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: testText,
                    apiKey: selectedKey
                })
            });

            const result = await response.json();
            const processingTime = Date.now() - startTime;

            setTestResult(result);

            // Add to transparency log
            const request: APIRequest = {
                id: `req-${Date.now()}`,
                timestamp: new Date(),
                text: testText,
                sanitizedText: result.sanitizedText,
                changes: result.changes || [],
                complianceScore: result.complianceScore,
                processingTime: result.processingTime || processingTime,
                apiKey: selectedKey.slice(0, 12) + '...'
            };

            addToTransparencyLog(request);
            setTransparencyLog(getTransparencyLog());

            // Update key usage
            const keyToUpdate = apiKeys.find(k => k.key === selectedKey);
            if (keyToUpdate) {
                keyToUpdate.lastUsed = new Date();
                keyToUpdate.requestCount++;
                saveAPIKeys(apiKeys);
                setApiKeys([...apiKeys]);
            }

        } catch (error) {
            console.error('API test failed:', error);
        }

        setIsTestingAPI(false);
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


                {/* Right: Dashboard Button & Metrics */}
                <div className="flex items-center gap-4">
                    <Link href="/enterprise" className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-sm shadow-orange-200">
                        ENTERPRISE HUB DASHBOARD
                    </Link>

                    {/* Live Metrics */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm">
                            <Zap size={14} className="text-emerald-600" />
                            <span className="text-emerald-800 text-sm font-mono font-bold">{avgLatency}ms</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-100 rounded-full shadow-sm">
                            <Activity size={14} className="text-cyan-600" />
                            <span className="text-cyan-800 text-sm font-mono font-bold">{rps} RPS</span>
                        </div>
                    </div>
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6 text-emerald-700">
                        {!hasEnterpriseAccess && <Lock size={12} className="text-emerald-600" />}
                        <Sparkles size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold uppercase tracking-wide">HIGH-THROUGHPUT SANITIZATION</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Code2 className="text-emerald-600" size={32} />
                        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Agency API Dashboard</h1>
                    </div>
                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        Process 100k words/day with ultra-low latency. Enterprise-grade security and uptime.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">

                    {/* API Keys Management */}
                    <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                        {!hasEnterpriseAccess && (
                            <div
                                className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]"
                                onClick={() => {
                                    setUpgradeMessage("Upgrade to Enterprise to generate API keys.");
                                    setShowUpgradeModal(true);
                                }}
                            >
                                <div className="bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                                    <Lock size={16} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-gray-800 dark:text-white">Premium Feature</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                <Key size={20} className="text-emerald-500" />
                                API Keys
                            </h3>
                            <button
                                onClick={() => {
                                    if (!hasEnterpriseAccess) {
                                        setUpgradeMessage("Upgrade to Enterprise to generate API keys.");
                                        setShowUpgradeModal(true);
                                    } else {
                                        setShowNewKeyModal(true);
                                    }
                                }}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm font-bold shadow-sm hover:shadow-emerald-500/30"
                            >
                                {!hasEnterpriseAccess ? <Lock size={16} /> : <Plus size={16} />}
                                Generate Key
                            </button>
                        </div>

                        {apiKeys.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-600">
                                <Key className="mx-auto text-gray-300 dark:text-white mb-2" size={32} />
                                <div className="text-gray-400 dark:text-white font-medium">No API keys yet. Generate one to get started.</div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {apiKeys.map((apiKey) => (
                                    <div key={apiKey.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all">
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white mb-1">{apiKey.name}</div>
                                            <div className="flex items-center gap-2">
                                                <code className="text-xs text-gray-500 dark:text-white font-mono bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-2 py-1 rounded">
                                                    {apiKey.key.slice(0, 24)}...
                                                </code>
                                                <button
                                                    onClick={() => handleCopyKey(apiKey.key)}
                                                    className="p-1 hover:bg-emerald-50 rounded text-gray-400 dark:text-white hover:text-emerald-600 transition-colors"
                                                >
                                                    {copiedKey === apiKey.key ? (
                                                        <Check size={14} className="text-emerald-500" />
                                                    ) : (
                                                        <Copy size={14} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{apiKey.requestCount} reqs</span>
                                                <span className="text-[10px] text-gray-400 dark:text-white mt-1">
                                                    Last used: {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteKey(apiKey.id)}
                                                className="p-2 hover:bg-red-50 text-gray-300 dark:text-white hover:text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Live Stats */}
                    <div className="space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm h-full flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-white">
                                <TrendingUp size={18} className="text-emerald-500" />
                                <h3 className="font-bold text-sm uppercase tracking-widest">Global Throughput</h3>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <div className="text-4xl font-mono font-bold text-emerald-600 mb-1 tracking-tighter">
                                        {transparencyLog.length}
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 dark:text-white uppercase">Total Logged Requests</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-mono font-bold text-cyan-600 mb-1 tracking-tighter">
                                        {avgLatency}<span className="text-xl text-cyan-400">ms</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 dark:text-white uppercase">Average Latency</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-mono font-bold text-purple-600 mb-1 tracking-tighter">
                                        {rps}
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 dark:text-white uppercase">Requests / Second</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Tester */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                        {!hasEnterpriseAccess && (
                            <div
                                className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]"
                                onClick={() => {
                                    setUpgradeMessage("Upgrade to Enterprise to use the API Playground.");
                                    setShowUpgradeModal(true);
                                }}
                            >
                                <div className="bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                                    <Lock size={16} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-gray-800 dark:text-white">Premium Feature</span>
                                </div>
                            </div>
                        )}
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            <TerminalIcon size={20} className="text-emerald-500" />
                            API Playground
                        </h3>

                        <select
                            value={selectedKey}
                            onChange={(e) => setSelectedKey(e.target.value)}
                            className="w-full mb-4 px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select API Key...</option>
                            {apiKeys.map(k => (
                                <option key={k.id} value={k.key}>{k.name}</option>
                            ))}
                        </select>

                        <textarea
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            placeholder="Enter text payload to sanitize..."
                            className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none mb-4 font-mono text-sm"
                        />

                        <button
                            onClick={handleTestAPI}
                            disabled={!hasEnterpriseAccess && (!testText || !selectedKey || isTestingAPI)} // Actually, disable logic is handled by onclick logic mostly, but good to keep UI consistent
                            className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                        >
                            {!hasEnterpriseAccess && <Lock size={16} />}
                            {isTestingAPI ? 'Sending Request...' : '🚀 Test Endpoint'}
                        </button>

                        {testResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl"
                            >
                                <div className="text-sm text-emerald-700 mb-2 font-bold flex items-center gap-2">
                                    <CheckCircle size={14} /> 200 OK
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-white mb-2">
                                    <div>Latency: <span className="font-mono text-emerald-600">{testResult.processingTime}ms</span></div>
                                    <div>Score: <span className="font-mono text-emerald-600">{(testResult.complianceScore * 100).toFixed(1)}%</span></div>
                                </div>
                                <div className="text-xs text-gray-400 dark:text-white font-mono">
                                    Changes applied: {testResult.changes?.length || 0}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Transparency Log */}
                    <div className="p-8 bg-gray-900 rounded-3xl border border-gray-700 shadow-inner overflow-hidden flex flex-col">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                            <Eye size={20} className="text-emerald-400" />
                            Live Transparency Log
                        </h3>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-2" ref={terminalRef}>
                            {transparencyLog.slice(0, 20).map((req) => (
                                <div key={req.id} className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs font-mono">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-emerald-400">{new Date(req.timestamp).toLocaleTimeString()}</span>
                                        <span className="text-gray-500 dark:text-white">{req.processingTime}ms</span>
                                    </div>
                                    <div className="text-gray-400 dark:text-white truncate mb-1">
                                        {req.text.slice(0, 40)}...
                                    </div>
                                    <div className="text-cyan-400 text-[10px] flex gap-2">
                                        <span>Key: {req.apiKey}</span>
                                        <span className="text-gray-600 dark:text-white">|</span>
                                        <span>Score: {(req.complianceScore * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* API Information Section */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 border-t border-gray-200 pt-16">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
                            <Zap size={12} />
                            Integration Guide
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                            Seamless CMS Integration
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-white font-[var(--font-metro)] leading-relaxed">
                            <p>
                                The Agency API is built for high-volume environments. With a simple RESTful architecture, you can integrate our humanization engine directly into your WordPress, Drupal, or custom CMS workflows.
                            </p>
                            <p>
                                Authenticated requests are processed in parallel with <strong>99.9% uptime Service Level SLAs</strong>. Our intelligent routing ensures that even peak loads of 100k+ words per minute are handled with sub-200ms latency.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-widest">
                            <Activity size={12} />
                            Operational Efficiency
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                            Automate Your Workflow
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-white font-[var(--font-metro)] leading-relaxed">
                            <p>
                                Manual copy-pasting is a bottleneck for growth. By automating the humanization process, agencies can reduce editorial time by up to <strong>70%</strong> while maintaining highest quality standards.
                            </p>
                            <p>
                                The Transparency Log provides a permanent, immutable record of every processed text, ensuring full accountability and compliance for client reporting. Secure your content supply chain with enterprise-grade encryption and access controls.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Key Modal */}
            <AnimatePresence>
                {showNewKeyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setShowNewKeyModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white font-display">Create API Key</h3>
                            <p className="text-gray-500 dark:text-white mb-6 text-sm">Generate a new key for your application. Keep it secret.</p>

                            <input
                                type="text"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="Key Name (e.g. Production App)"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
                                autoFocus
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowNewKeyModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateKey}
                                    disabled={!newKeyName.trim()}
                                    className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg shadow-emerald-500/20"
                                >
                                    Generate Key
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
