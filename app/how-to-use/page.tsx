import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, PenTool, ShieldCheck, Code, ArrowRight } from "lucide-react";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "How To Use ScriptHuman | The Ultimate Guide to AI Text Sanitization",
    description: "Learn how to master ScriptHuman Web Tools. A complete step-by-step documentation guide on using the Text Humanizer, Trust Hub, API, and Bypassing AI Detectors.",
    keywords: "how to use scripthuman, scripthuman tutorial, ai text humanizer guide, bypass ai detectors, trust hub documentation, scripthuman api guide",
    openGraph: {
        title: "How To Use ScriptHuman Web Tools",
        description: "Your complete guide to mastering AI text humanization, verifying original content, and integrating the ScriptHuman API.",
        type: "website",
    }
};

export default function HowToUsePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-[family-name:var(--font-metro)] selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold font-display text-gray-900 dark:text-white mb-6">
                        How to Use ScriptHuman
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Your complete, step-by-step guide to mastering the ultimate AI text sanitization and content verification platform.
                    </p>
                </div>

                {/* Table of Contents / Quick Jump */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 mb-16">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-center">Quick Navigation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="#writing-room" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold">
                            <PenTool size={20} className="text-indigo-500" />
                            The Writing Room
                        </a>
                        <a href="#trust-hub" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
                            <ShieldCheck size={20} className="text-emerald-500" />
                            Trust Hub Verification
                        </a>
                        <a href="#api" className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-semibold">
                            <Code size={20} className="text-orange-500" />
                            Enterprise API
                        </a>
                    </div>
                </div>

                {/* Section 1: Writing Room */}
                <section id="writing-room" className="mb-20 scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <PenTool size={24} />
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">1. The Writing Room</h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="lead text-xl">The Writing Room is ScriptHuman's core text transformation engine. It allows you to take AI-generated content and rewrite it to perfectly mimic authentic human nuances.</p>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm my-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step-by-Step Guide</h3>
                            <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-200 marker:text-indigo-500 marker:font-bold">
                                <li><strong className="text-gray-900 dark:text-white">Input your Text:</strong> Paste your AI-generated draft into the left-hand editor panel.</li>
                                <li><strong className="text-gray-900 dark:text-white">Select a Persona:</strong> Choose a specific writing persona (e.g., Academic, Casual, Executive) to instruct the engine on the desired tone and vocabulary.</li>
                                <li><strong className="text-gray-900 dark:text-white">Adjust Humanity Slider:</strong> Move the slider from 1 (Light rewrite) to 10 (Maximum human unpredictability). <em>Tip: 7 is the optimal sweet spot for bypassing stringent detectors.</em></li>
                                <li><strong className="text-gray-900 dark:text-white">Generate:</strong> Click "Humanize Text". The engine will restructure sentences, inject natural variations (burstiness), use active voice, and output the result in the right-hand panel.</li>
                                <li><strong className="text-gray-900 dark:text-white">Check Heatmap:</strong> Click "Analyze Output" to run your new text through our detector network and view the probability heatmap of any remaining robotic phrases.</li>
                            </ol>
                        </div>

                        <div className="flex justify-start">
                            <Link href="/writing-room" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                                Open Writing Room <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 2: Trust Hub */}
                <section id="trust-hub" className="mb-20 scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">2. Trust Hub Verification</h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="lead text-xl">The Trust Hub serves as a forensic analysis tool and certification center for writers. It cryptographically proves that a piece of content is genuinely human-authored.</p>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm my-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How to Certify Your Work</h3>
                            <ul className="space-y-4 list-none text-gray-700 dark:text-gray-200">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">1</span>
                                    <span><strong>Submit for Analysis:</strong> Paste your final draft into the Trust Hub analyzer. Ensure your document is mostly human-written.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">2</span>
                                    <span><strong>Forensic Review:</strong> Our multi-layer AI detectors will scan the text. To receive a certificate, you must score <strong>75% or higher</strong> on the Human Confidence scale.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">3</span>
                                    <span><strong>Generate Certificate:</strong> Upon passing, click "Generate Forensic Certificate". This creates an immutable record on our servers with a unique Certificate ID.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">4</span>
                                    <span><strong>Embed the Badge:</strong> You can download the PDF certificate to send to clients, or copy the automatically generated HTML <code>&lt;iframe&gt;</code> Embed Code to display a live "Verified by ScriptHuman" badge on your personal blog or website.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-xl text-sm font-medium border border-orange-100 dark:border-orange-800/50">
                            <strong>Note:</strong> Access to generate official Trust Hub forensic certificates requires a premium subscription (Certificate Tier or above).
                        </div>
                    </div>
                </section>

                {/* Section 3: API Integration */}
                <section id="api" className="mb-10 scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <Code size={24} />
                        </div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">3. Enterprise API</h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="lead text-xl">The ScriptHuman API empowers developers to integrate our advanced text humanization and detection algorithms directly into their own applications, CMS pipelines, or editorial workflows.</p>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm my-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Getting Started with API</h3>
                            <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-200 marker:text-orange-500 marker:font-bold">
                                <li>Navigate to "My Account" &gt; "API Dashboard" (requires Enterprise plan).</li>
                                <li>Generate a new secure API Key. Keep this secret!</li>
                                <li>Send a POST request to <code>https://scripthuman.com/api/analyze</code>.</li>
                                <li>Include your API Key in the Authorization headers.</li>
                                <li>Pass your text payload in the JSON body to receive real-time forensic scores and heatmap matrices.</li>
                            </ol>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
