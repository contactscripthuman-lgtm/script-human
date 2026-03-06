"use client";

import { Mail, MessageSquare, MapPin, ChevronDown, Send, CheckCircle} from"lucide-react";
import { useState} from"react";
import Navbar from"@/components/Navbar";
import Link from"next/link";

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const faqs = [
        {
            q:"How accurate is the ScriptHuman Analyzing ?",
            a:"Our multi-layered analysis engine achieves a 99.8% accuracy rate by evaluating emotional resonance, syntactic variety, and linguistic nuance, effectively distinguishing human writing from AI generation."
       },
        {
            q:"Is my content stored private?",
            a:"Yes. We operate with a strict privacy-first policy. Content submitted for analysis is processed in real-time and is not used to train our models without your explicit consent."
       },

        {
            q:"Do you offer API access?",
            a: <>Yes! We have a robust API for enterprise clients who want to integrate our forensic analysis directly into their CMS or platforms. <Link href="/enterprise" className="text-orange-600 font-bold hover:underline">Go to Enterprise Hub</Link>.</>
       }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate submission
        setTimeout(() => {
            setFormStatus('success');
       }, 1500);
   };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-[family-name:var(--font-metro)] selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
            <Navbar />

            {/* HEADER */}
            <section className="pt-32 pb-12 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">Get in Touch</h1>
                    <p className="text-lg text-gray-500 dark:text-white max-w-2xl mx-auto">
                        Have questions about our technology, pricing, or enterprise solutions? We&apos;re here to help you verify authenticity at scale.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* LEFT: Contact Info & FAQ */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                            <MessageSquare size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">Chat with our ScriptHuman Bot</h4>
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-chat-widget'))}
                                                className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-left mt-1"
                                            >
                                                Start a chat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Accordion */}
                            <div>
                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                                <div className="divide-y divide-gray-100 dark:divide-slate-800 border-t border-b border-gray-100 dark:border-slate-800">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="py-4">
                                            <button
                                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                                className="w-full flex items-center justify-between text-left group"
                                            >
                                                <span className={`font-bold transition-colors ${openFaq === i ? 'text-orange-600 dark:text-orange-400' : 'text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400'}`}>
                                                    {faq.q}
                                                </span>
                                                <ChevronDown size={20} className={`text-gray-400 dark:text-white transition-transform ${openFaq === i ? 'rotate-180 text-orange-600 dark:text-orange-400' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-sm text-gray-500 dark:text-white leading-relaxed pr-8">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <div>
                            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 md:p-10 relative overflow-hidden">
                                {/* Decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/10 rounded-bl-[100%] -mr-16 -mt-16 z-0" />

                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 relative z-10">Send a Message</h3>

                                {formStatus === 'success' ? (
                                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                                        <p className="text-gray-500 dark:text-white max-w-xs mx-auto">
                                            Thank You
                                        </p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-8 text-orange-600 dark:text-orange-400 font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-gray-900 dark:text-white">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">First Name</label>
                                                <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-700 transition-colors" placeholder="Jane" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Last Name</label>
                                                <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-700 transition-colors" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Email Address</label>
                                            <input type="email" className="w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-700 transition-colors" placeholder="jane@company.com" required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Subject</label>
                                            <select className="w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-700 transition-colors">
                                                <option>General Inquiry</option>
                                                <option>Support Request</option>
                                                <option>Enterprise Sales</option>
                                                <option>Partnership</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider">Message</label>
                                            <textarea className="w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-700 transition-colors h-32 resize-none" placeholder="How can we help you?" required></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold font-display hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formStatus === 'submitting' ? (
                                               "Sending..."
                                            ) : (
                                                <>Send Message <Send size={18} /></>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
