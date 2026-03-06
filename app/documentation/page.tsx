"use client";

import { useState } from "react";
import Link from "next/link";
import { Key, PenTool, Palette, Building2, ShieldCheck, ChevronRight, Menu, X, Terminal, Code2 } from "lucide-react";
import Image from "next/image";

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState("getting-started");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const sections = [
        { id: "getting-started", label: "Getting Started", icon: Key },
        { id: "writing-room", label: "Writing Room", icon: PenTool },
        { id: "style-studio", label: "Style Studio", icon: Palette },
        { id: "enterprise-hub", label: "Enterprise Hub", icon: Building2 },
        { id: "trust-hub", label: "Trust Hub", icon: ShieldCheck },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] flex flex-col">

            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 relative">
                            <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-lg font-display">Scripthuman <span className="text-gray-400 dark:text-white font-normal">Docs</span></span>
                    </Link>

                    <button
                        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-white transition">Back to App</Link>
                        <Link href="/writing-room" className="bg-black dark:bg-white text-white dark:text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                            Launch Tools
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full flex">

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[calc(100vh-4rem)] md:sticky md:top-16
                    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
               `}>
                    <nav className="p-6 space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === section.id
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                            >
                                <section.icon size={18} className={activeSection === section.id ? "text-blue-500" : "text-gray-400 dark:text-white"} />
                                {section.label}
                                {activeSection === section.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-gray-100 dark:border-slate-800 mt-auto">
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                            <h4 className="font-bold text-sm mb-2 font-display">Need Help?</h4>
                            <p className="text-xs text-gray-500 dark:text-white mb-3">Can&apos;t find what you&apos;re looking for? Contact our support team.</p>
                            <Link href="/contact" className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline inline-block mt-1">
                                Contact Support →
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto max-w-4xl">

                    {/* Getting Started / API */}
                    <section id="getting-started" className="mb-24 scroll-mt-24">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 dark:border-blue-900/30">
                                <Key size={12} />
                                <span>Setup</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-display">Getting Started</h1>
                            <p className="text-xl text-gray-600 dark:text-white leading-relaxed">
                                Everything you need to know about authenticating and integrating with the Scripthuman API.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Step 1: API Key */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
                                <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 dark:text-white">1. Generating your API Key</h3>
                                    <Key size={16} className="text-gray-400 dark:text-white" />
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-gray-600 dark:text-white leading-relaxed">
                                        To make requests, you need a secret key.
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-white ml-2">
                                        <li>Log in to your <strong>Scripthuman Dashboard</strong>.</li>
                                        <li>Navigate to <span className="font-mono bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white px-1 py-0.5 rounded text-sm">Settings &gt; API Keys</span>.</li>
                                        <li>Click <strong>&quot;Generate New Secret Key&quot;</strong>.</li>
                                        <li>Copy the key (<code className="text-blue-600 dark:text-blue-400">sk_live_...</code>). Store it safely; you won&apos;t see it again.</li>
                                    </ol>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mt-4">
                                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                            <strong>Warning:</strong> Never share your API key in client-side code (browsers/apps). Only use it on your server.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Authentication */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
                                <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                                    <h3 className="font-bold text-gray-900 dark:text-white">2. Authentication Headers</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 dark:text-white mb-4">Include the key in the Authorization header of every request:</p>
                                    <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm text-gray-300 dark:text-white overflow-x-auto">
                                        <div className="flex gap-2">
                                            <span className="text-purple-400">Authorization:</span>
                                            <span className="text-green-400">Bearer sk_live_51Mz...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Rate Limits Table */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Rate Limits & Errors</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 dark:text-white uppercase bg-gray-50 dark:bg-slate-700/50">
                                                <tr>
                                                    <th className="px-4 py-3">Status</th>
                                                    <th className="px-4 py-3">Code</th>
                                                    <th className="px-4 py-3">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-green-600 dark:text-green-400">200 OK</td>
                                                    <td className="px-4 py-3 dark:text-white">Success</td>
                                                    <td className="px-4 py-3 text-gray-500 dark:text-white">Request processed successfully.</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-red-500 dark:text-red-400">401</td>
                                                    <td className="px-4 py-3 dark:text-white">Unauthorized</td>
                                                    <td className="px-4 py-3 text-gray-500 dark:text-white">Invalid or missing API key.</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-red-500 dark:text-red-400">429</td>
                                                    <td className="px-4 py-3 dark:text-white">Too Many Requests</td>
                                                    <td className="px-4 py-3 text-gray-500 dark:text-white">You exceeded your plan&apos;s rate limit (Free: 60 req/min).</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Writing Room */}
                    <section id="writing-room" className="mb-24 scroll-mt-24 border-t border-gray-200 dark:border-slate-800 pt-12">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-100 dark:border-orange-900/30">
                                <PenTool size={12} />
                                <span>Core Tool</span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-display">The Writing Room</h2>
                            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                                The Writing Room is your command center for detecting &quot;Silicon Smog&quot; and restoring human essence to robotic text.
                            </p>
                        </div>

                        {/* Feature Deep Dive */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/20 rounded-bl-full -mr-8 -mt-8 opacity-50" />
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                                    AI Detection Heatmap
                                </h3>
                                <p className="text-gray-600 dark:text-white mb-6 leading-relaxed">
                                    When you paste text, our engine scans for statistical anomalies typical of LLMs (ChatGPT, Claude, etc.). We visualize this using a traffic-light heatmap:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                                        <div className="font-bold text-red-700 dark:text-red-400 mb-1">Red (High AI)</div>
                                        <p className="text-xs text-red-600/80 dark:text-red-300">Monotone sentence structures. Very low burstiness. Likely 100% AI.</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                                        <div className="font-bold text-yellow-700 dark:text-yellow-400 mb-1">Yellow (Mixed)</div>
                                        <p className="text-xs text-yellow-600/80 dark:text-yellow-300">Possible human edits, but underlying robotic syntax remains.</p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                                        <div className="font-bold text-green-700 dark:text-green-400 mb-1">Green (Human)</div>
                                        <p className="text-xs text-green-600/80 dark:text-green-300">Natural variance and complexity. Passes all major detectors.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                                    Humanization Modes
                                </h3>
                                <p className="text-gray-600 dark:text-white mb-6">
                                    The &quot;Humanize&quot; button doesn&apos;t just rephrase; it reconstructs the cognitive pattern of the text based on your selected mode:
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-none pt-1">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">Standard (Default)</h4>
                                            <p className="text-sm text-gray-600 dark:text-white">Balanced approach. Maintains the original message clarity while disrupting AI syntax patterns. Best for general web content.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none pt-1">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-purple-400 dark:bg-purple-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">Academic</h4>
                                            <p className="text-sm text-gray-600 dark:text-white">Preserves formal terminology, citations, and structural rigor. Increases complexity without sacrificing professionalism. Ideal for essays and papers.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none pt-1">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-pink-400 dark:bg-pink-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">Creative / Storyteller</h4>
                                            <p className="text-sm text-gray-600 dark:text-white">Maximizes metaphor usage and sentence variety. Introduces higher unpredictability (perplexity) to mimic human storytelling flair.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Style Studio */}
                    <section id="style-studio" className="mb-24 scroll-mt-24 border-t border-gray-200 dark:border-slate-800 pt-12">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100 dark:border-purple-900/30">
                                <Palette size={12} />
                                <span>Advanced</span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-display">Style Studio</h2>
                            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                                Fine-tune the nuances of your writing using our Vibe Audit engine and Locale Injectors.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Vibe Audit */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg"><Terminal size={20} /></div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Vibe Audit Metrics</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">1. Perplexity</h4>
                                        <p className="text-sm text-gray-600 dark:text-white leading-relaxed mb-4">
                                            Measures the &quot;unpredictability&quot; of a text. AI models are trained to minimize perplexity (be predictable). Humans are naturally chaotic.
                                        </p>
                                        <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg text-xs text-gray-500 dark:text-white">
                                            <strong className="dark:text-white">High Perplexity:</strong> Good. Indicates unique word choices.<br />
                                            <strong className="dark:text-white">Low Perplexity:</strong> Bad. Indicates generic, robotic phrasing.
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">2. Burstiness</h4>
                                        <p className="text-sm text-gray-600 dark:text-white leading-relaxed mb-4">
                                            Measures the variation in sentence structure and length. AI tends to write sentences of average length and similar structure (monotone).
                                        </p>
                                        <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg text-xs text-gray-500 dark:text-white">
                                            <strong className="dark:text-white">Goal:</strong> Mix short, punchy sentences with longer, complex clauses.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Locale Injection */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-lg"><Code2 size={20} /></div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Locale Injection</h3>
                                </div>
                                <p className="text-gray-600 dark:text-white mb-6">
                                    Don&apos;t just translate; localized. This tool injects region-specific idioms, slang, and cultural references into your text to make it feel native.
                                </p>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Supported Locales:</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['London Tech', 'NYC Finance', 'Aussie Casual', 'Valley VC', 'Legal Standard', 'Gen-Z Internet'].map(locale => (
                                            <div key={locale} className="bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-white text-center">
                                                {locale}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Enterprise Hub */}
                    <section id="enterprise-hub" className="mb-24 scroll-mt-24 border-t border-gray-200 dark:border-slate-800 pt-12">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-4 border border-pink-100 dark:border-pink-900/30">
                                <Building2 size={12} />
                                <span>Agency</span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-display">Enterprise Hub</h2>
                            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                                Configuration for large teams. Setup brand guardrails and maintain voice consistency at scale.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Configuring Brand Guardrails</h3>
                                <p className="text-gray-600 dark:text-white mb-6 text-sm leading-relaxed">
                                    Guardrails allow you to blacklist specific words, enforce preferred terminology, and set tone restrictions for all team members. These are defined via a JSON configuration in the admin dashboard.
                                </p>
                                <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-xs text-gray-300 dark:text-white overflow-x-auto leading-relaxed border border-gray-800">
                                    <span className="text-gray-500 dark:text-white">// Example Guardrail Configuration</span><br />
                                    {`{`} <br />
                                    &nbsp;&nbsp;<span className="text-blue-400">&quot;banned_words&quot;</span>: [<span className="text-orange-400">&quot;synergy&quot;</span>, <span className="text-orange-400">&quot;deep dive&quot;</span>, <span className="text-orange-400">&quot;leverage&quot;</span>],<br />
                                    &nbsp;&nbsp;<span className="text-blue-400">&quot;voice_settings&quot;</span>: {`{`}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&quot;max_sentence_length&quot;</span>: <span className="text-green-400">25</span>,<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&quot;allow_passive_voice&quot;</span>: <span className="text-red-400">false</span><br />
                                    &nbsp;&nbsp;{`}`}<br />
                                    {`}`}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trust Hub */}
                    <section id="trust-hub" className="mb-24 scroll-mt-24 border-t border-gray-200 dark:border-slate-800 pt-12">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100 dark:border-emerald-900/30">
                                <ShieldCheck size={12} />
                                <span>Validation</span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-display">Trust Hub</h2>
                            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
                                Verify content legitimacy. Our 4-layer forensic engine provides proof of human authorship.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Verification Badge</h3>
                                <p className="text-sm text-gray-600 dark:text-white mb-4">
                                    Embed this live badge on your blog or article. It fetches real-time validation status from our servers.
                                </p>
                                <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded p-3 font-mono text-xs text-blue-600 dark:text-blue-400 break-all">
                                    &lt;script src=&quot;https://cdm.scripthuman.com/verify.js&quot;&gt;&lt;/script&gt;<br />
                                    &lt;sh-badge id=&quot;verify_8x92m...&quot;&gt;&lt;/sh-badge&gt;
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3">The 4-Layer Analysis</h3>
                                <ul className="space-y-3">
                                    {[
                                        { title: "Stylometric Analysis", desc: "Checks for statistical patterns of AI usage." },
                                        { title: "Entropy Check", desc: "Measures randomness and chaos in sentence construction." },
                                        { title: "Watermark Detection", desc: "Scans for known watermarks from OpenAI/Anthropic." },
                                        { title: "Fact Consistency", desc: "Verifies internal logical consistency of the narrative." }
                                    ].map((layer, i) => (
                                        <li key={i} className="flex gap-3 items-start text-sm">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</div>
                                            <div>
                                                <span className="font-bold text-gray-900 dark:text-white">{layer.title}:</span>{" "}
                                                <span className="text-gray-600 dark:text-white">{layer.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
