"use client";

import { useState} from"react";
import Link from"next/link";
import Image from"next/image";
import { motion, AnimatePresence} from"framer-motion";
import { ArrowRight, ShieldCheck, Zap, Lock, Globe, Server, Activity, CheckCircle, Building2, TrendingUp, Sparkles, Scale, PenTool, Palette, Users, Code2, BookOpen} from"lucide-react";
import ToolNavbar from"@/components/ToolNavbar";
import EnterpriseWhyUs from"@/components/enterprise/WhyChooseUs";
import EnterpriseTestimonials from"@/components/enterprise/Testimonials";
import FAQ from"@/components/FAQ";
import ParticleSphere from"@/components/enterprise/ParticleSphere";
import EnterpriseCard from"@/components/enterprise/EnterpriseCard";
import HelpTooltip from"@/components/writing-room/HelpTooltip";

export default function EnterprisePage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-[family-name:var(--font-metro)] selection:bg-purple-100 dark:selection:bg-purple-900">

            {/* Header - Modern Minimal Navigation (Matching Writing Room) */}
            {/* Header - Modern Minimal Navigation (Matching Writing Room) */}
            <ToolNavbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{ duration: 0.6}}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full mb-6 text-purple-700">
                        <Sparkles size={16} className="text-purple-500" />
                        <span className="text-sm font-bold uppercase tracking-wide">Enterprise-Grade AI Sanitization</span>
                    </div>

                    <h1 className="text-6xl font-black mb-6 font-display text-gray-900 dark:text-white">
                        Scale with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Confidence</span>
                    </h1>

                    <p className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto leading-relaxed font-[var(--font-metro)]">
                        Enterprise tools built for agencies and high-volume teams.
                        Train AI to match your brand voice, enforce vocabulary standards, and sanitize at scale.
                    </p>
                </motion.div>

                {/* Tool Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">

                    {/* Tool 1: Brand Guardrails */}
                    <EnterpriseCard
                        title="Brand Guardrails"
                        description="Enforce vocabulary standards in real-time. Block 'Silicon Smog' words and ensure brand compliance."
                        stats="99.2%"
                        icon={<ShieldCheck size={32} className="text-white" />}
                        gradient="bg-gradient-to-br from-purple-500 to-pink-500"
                        href="/enterprise/brand-guardrails"
                    />

                    {/* Tool 2: Voice-Clone Dictionary */}
                    <EnterpriseCard
                        title="Voice Clone"
                        description="Train AI on your brand's unique tone. Upload PDFs to generate a linguistic fingerprint."
                        stats="98% Match"
                        icon={<Users size={32} className="text-white" />}
                        gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
                        href="/enterprise/voice-clone"
                    />

                    {/* Tool 3: Agency API */}
                    <EnterpriseCard
                        title="Agency API"
                        description="High-throughput gateway for enterprise sanitization. Process 100k words/day with ultra-low latency."
                        stats="<200ms"
                        icon={<Code2 size={32} className="text-white" />}
                        gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                        href="/enterprise/api-dashboard"
                    />
                </div>

                {/* Stats Banner (Reusing design from Writing Room's right panel style but full width) */}
                <div className="grid md:grid-cols-3 gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                            </div>
                        </div>
                        <div className="text-4xl font-black font-display text-gray-900 dark:text-white mb-1">100k+</div>
                        <p className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest">Words Sanitized Daily</p>
                    </div>

                    <div className="text-center md:border-x border-gray-100 dark:border-slate-700">
                        <div className="flex items-center justify-center mb-3">
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                <Zap className="text-yellow-600 dark:text-yellow-400" size={24} />
                            </div>
                        </div>
                        <div className="text-4xl font-black font-display text-gray-900 dark:text-white mb-1">&lt;200ms</div>
                        <p className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest">Average Latency</p>
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={24} />
                            </div>
                        </div>
                        <div className="text-4xl font-black font-display text-gray-900 dark:text-white mb-1">99.9%</div>
                        <p className="text-sm font-bold text-gray-500 dark:text-white uppercase tracking-widest">Compliance Rate</p>
                    </div>
                </div>

                {/* Benefits Section - Premium Upgrade */}
                <EnterpriseWhyUs />

                <FAQ theme="purple" items={[
                    {
                        question:"How does the Brand Guardrails tool work?",
                        answer:"It scans your content in real-time against a customizable list of banned words and corporate jargon, suggesting on-brand alternatives instantly."
                   },
                    {
                        question:"Can I deploy this on-premise?",
                        answer:"Yes, we offer on-premise solutions for high-security enterprise environments. Contact our sales team for deployment options."
                   },
                    {
                        question:"What is the Voice Clone feature?",
                        answer:"Voice Clone analyzes your past content (PDFs, blogs, emails) to create a unique 'Linguistic Fingerprint' that ensures all future AI-generated content matches your specific brand voice."
                   }
                ]} />

                <EnterpriseTestimonials />

                {/* Footer Note */}
                <div className="mt-12 text-center pb-12">
                    <p className="text-gray-400 dark:text-white text-sm font-[var(--font-metro)] flex items-center justify-center gap-2 mb-6">
                        <ShieldCheck size={14} />
                        All processing happens client-side. Your data never leaves your browser.
                    </p>
                    <div className="max-w-3xl mx-auto border-t border-gray-200 dark:border-slate-700 pt-6">
                        <p className="text-[10px] text-gray-400 dark:text-white leading-relaxed opacity-60">
                            Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
