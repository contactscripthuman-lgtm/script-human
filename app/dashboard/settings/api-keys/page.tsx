"use client";

import { useState, useEffect} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { Key, Plus, Trash2, Copy, Check, Shield, AlertTriangle, Loader2, Link as LinkIcon, ArrowLeft} from"lucide-react";
import Link from"next/link";
import Image from"next/image";

interface ApiKey {
    id: string;
    key_prefix: string;
    name: string;
    created_at: string;
    last_used_at: string | null;
}

export default function ApiKeysPage() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [newKey, setNewKey] = useState<string | null>(null);
    const [keyName, setKeyName] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchKeys();
   }, []);

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/keys");
            if (!res.ok) throw new Error("Failed to fetch keys");
            const data = await res.json();
            setKeys(data.keys || []);
       } catch (err) {
            console.error(err);
            // Don't show error for auth, just redirect or show empty if not logged in (middleware usually handles this)
       } finally {
            setIsLoading(false);
       }
   };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const res = await fetch("/api/keys", {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({ name: keyName ||"My API Key"})
           });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error ||"Failed to generate key");

            setNewKey(data.key);
            setKeyName("");
            fetchKeys(); // Refresh list
       } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
           } else {
                setError("An unknown error occurred");
           }
       } finally {
            setIsGenerating(false);
       }
   };

    const handleRevoke = async (id: string) => {
        if (!confirm("Are you sure? This action cannot be undone and any apps using this key will stop working.")) return;

        try {
            const res = await fetch("/api/keys", {
                method:"DELETE",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({ id})
           });
            if (!res.ok) throw new Error("Failed to revoke key");
            fetchKeys();
       } catch (err) {
            alert("Failed to revoke key");
       }
   };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
   };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-[family-name:var(--font-metro)] text-gray-900 dark:text-white">
            {/* Nav */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-500 dark:text-white" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 relative">
                            <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-lg font-display">Developer Settings</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/documentation" className="text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900 flex items-center gap-2">
                        <LinkIcon size={16} />
                        Documentation
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        JS
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display mb-2 text-[#111827]">API Keys</h1>
                    <p className="text-gray-500 dark:text-white text-lg">Manage your secret keys to access the Scripthuman API.</p>
                </div>

                {/* Generate Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white mb-2">Key Name (Optional)</label>
                            <input
                                type="text"
                                value={keyName}
                                onChange={(e) => setKeyName(e.target.value)}
                                placeholder="e.g. Production App, Test Environment"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="bg-[#111827] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-[46px]"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                            Generate Key
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-3 flex items-center gap-2"><AlertTriangle size={14} /> {error}</p>}
                </div>

                {/* New Key Modal / Display */}
                <AnimatePresence>
                    {newKey && (
                        <motion.div
                            initial={{ opacity: 0, height: 0}}
                            animate={{ opacity: 1, height: 'auto'}}
                            exit={{ opacity: 0, height: 0}}
                            className="mb-8 overflow-hidden"
                        >
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 relative">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                                        <Key size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-green-900 font-bold mb-1">New API Key Generated</h3>
                                        <p className="text-green-700 text-sm mb-4">Please copy this key now. It will not be shown again.</p>

                                        <div className="flex items-center gap-2 bg-white border border-green-200 rounded-lg p-3 shadow-inner">
                                            <code className="flex-1 font-mono text-green-800 text-sm break-all">{newKey}</code>
                                            <button
                                                onClick={() => copyToClipboard(newKey)}
                                                className="p-2 hover:bg-green-50 rounded-md text-green-600 transition-colors"
                                                title="Copy to clipboard"
                                            >
                                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setNewKey(null)}
                                        className="text-green-500 hover:text-green-700 p-1"
                                    >
                                        <Trash2 size={16} /> {/* Actually X close button usually, but simple dismiss for now */}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Keys List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                            <Shield size={16} className="text-indigo-500" /> Active Keys
                        </h3>
                        <span className="text-xs font-semibold text-gray-400 dark:text-white bg-gray-100 px-2 py-1 rounded-full">{keys.length} keys</span>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center text-gray-400 dark:text-white">Loading keys...</div>
                    ) : keys.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-white">
                                <Key size={32} />
                            </div>
                            <h3 className="text-gray-900 dark:text-white font-medium mb-1">No API Keys Found</h3>
                            <p className="text-gray-500 dark:text-white text-sm">Generate your first key above to get started.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {keys.map((key) => (
                                <div key={key.id} className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg">
                                            <Key size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gray-900 dark:text-white">{key.name}</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-white font-mono">
                                                <span>{key.key_prefix}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span>Created: {new Date(key.created_at).toLocaleDateString()}</span>
                                                {key.last_used_at && (
                                                    <>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                        <span className="text-indigo-600">Last used: {new Date(key.last_used_at).toLocaleDateString()}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRevoke(key.id)}
                                        className="text-gray-400 dark:text-white hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        title="Revoke Key"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
