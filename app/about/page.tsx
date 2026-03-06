"use client";

import { ShieldCheck, Sparkles, Users, Lock, ChevronRight, Fingerprint} from"lucide-react";
import Link from"next/link";
import Navbar from"@/components/Navbar";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-[family-name:var(--font-metro)] selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Abstract Backgrounds */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 dark:bg-orange-900/10 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4">
                            <Sparkles size={14} />
                            <span>Our Mission</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display text-gray-900 dark:text-white mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                            Preserving Human <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Authenticity</span> in the <br />
                            Age of AI.
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-white max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            We build tools that empower creators to harness the efficiency of Artificial Intelligence without losing the unique, irreplaceable soul of human expression.
                        </p>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-12 border-y border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label:"Words Analyzed", value:"500M+"},
                            { label:"Active Users", value:"50k+"},
                            { label:"Accuracy Rate", value:"99.8%"},
                            { label:"Countries", value:"120+"},
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-display mb-2">{stat.value}</div>
                                <div className="text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/20 rounded-[2rem] transform rotate-3 scale-105 opacity-50" />
                                <div className="relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-2xl rounded-[2rem] p-8 md:p-12 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Fingerprint size={200} className="text-orange-900" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-display relative z-10">The &quot;Script Human&quot; Standard</h3>
                                    <p className="text-gray-600 dark:text-white leading-relaxed mb-6 relative z-10">
                                        We realized that standard &quot;AI detection&quot; was flawed. It flagged passionate, complex human writing as robotic, while letting generic AI slop pass through.
                                    </p>
                                    <p className="text-gray-600 dark:text-white leading-relaxed relative z-10">
                                        So we built the <strong>Trust Hub</strong>—a forensic engine that looks for <em>emotional resonance</em>, <em>syntactic variety</em>, and <em>nuance</em>. We don&apos;t just check for AI; we verify humanity.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Why We Started</h2>
                            <p className="text-lg text-gray-500 dark:text-white leading-relaxed">
                                In a world flooding with automated content, &quot;human-made&quot; is becoming the ultimate luxury. We saw a need for a verifiable standard of authenticity—a way for creators, businesses, and educators to prove that their work comes from a real mind, not just a model.
                            </p>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { icon: ShieldCheck, title:"Forensic Accuracy", desc:"Our models are trained on millions of confirmed human data points to minimize false positives."},
                                    { icon: Lock, title:"Privacy First", desc:"Your content is analyzed in real-time and never used to train our models without consent."},
                                    { icon: Users, title:"For Everyone", desc:"From students to enterprise teams, we provide accessible tools for every level of creator."},
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-white leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900/50 to-gray-900/50" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">Ready to Prove Your Authenticity?</h2>
                    <p className="text-xl text-gray-400 dark:text-white max-w-2xl mx-auto mb-10">
                        Join thousands of writers who use Scripthuman to verify their work and build trust with their audience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                        >
                            Get Started for Free <ChevronRight size={20} />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </div >
    );
}
