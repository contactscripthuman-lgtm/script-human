import ToolNavbar from "@/components/ToolNavbar";
import { Shield, Lock, EyeOff, Database, Server, RefreshCw } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans selection:bg-orange-100 dark:selection:bg-orange-900">
            <ToolNavbar />

            <div className="max-w-4xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 mb-6">
                        <Shield size={16} className="text-orange-500 dark:text-orange-400" />
                        <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider font-display">
                            The Privacy Protocol
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        Your Ideas are Your DNA.
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto leading-relaxed">
                        Our mission is to protect your human"vibe" while ensuring your data remains your sovereign property. This isn't just a legal requirement; it’s our core philosophy.
                    </p>
                    <p className="text-sm font-bold text-gray-400 dark:text-white mt-4 uppercase tracking-wide">
                        Last Updated: February 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm p-8 md:p-12 space-y-12">

                    {/* Section 1: Data Sovereignty */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                <Database size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">1. Data Sovereignty: Your Text, Your Rules</h2>
                        </div>
                        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-white">
                            <p>
                                When you drop text or files into the Pulse-Deck, you aren't surrendering them to a machine.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-orange-500">
                                <li>
                                    <strong className="text-gray-900 dark:text-white">No Training:</strong> Unlike the"Big AI" models, Scripthuman does not use your submitted text, videos, or images to train our global algorithms.
                                </li>
                                <li>
                                    <strong className="text-gray-900 dark:text-white">The Clean Slate:</strong> Your inputs are processed in a secure, ephemeral environment. Once your session ends or you delete the project, the"Silicon Smog" and the original text are wiped from our active memory.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 2: What We Collect */}
                    <section>
                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">2. What We Collect (The Essentials)</h2>
                        <p className="text-gray-600 dark:text-white mb-6">We only collect what is necessary to give you the highest fidelity results.</p>

                        <div className="overflow-hidden border border-gray-200 dark:border-slate-700 rounded-xl">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Data Type</th>
                                        <th className="px-6 py-4 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Purpose</th>
                                        <th className="px-6 py-4 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Retention</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-gray-600 dark:text-white">
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Account Info</td>
                                        <td className="px-6 py-4">Email and name for login and"Verified Seal" certificates.</td>
                                        <td className="px-6 py-4">Until account deletion.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Usage Metadata</td>
                                        <td className="px-6 py-4">To calculate your word counts and subscription limits.</td>
                                        <td className="px-6 py-4">Monthly or Daily cycles.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Payment Data</td>
                                        <td className="px-6 py-4">Processed securely via Stripe. We never see your card digits.</td>
                                        <td className="px-6 py-4">Managed by Stripe.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Linguistic Vectors</td>
                                        <td className="px-6 py-4">To generate your Voice-Clone Dictionary (Pro/Enterprise).</td>
                                        <td className="px-6 py-4">Encrypted and private to you.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 3: The Beta Lab */}
                    <section>
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                    <RefreshCw size={20} />
                                </div>
                                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">3. The Beta Lab: Experimental Feature Disclosure</h2>
                            </div>
                            <div className="prose prose-sm prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-white">
                                <p>
                                    We are currently refining our Media Origin Scanner and high-capacity processing tools. These features are labeled as"Beta" to indicate they are in an active state of technical optimization.
                                </p>
                                <p className="font-bold mt-4 dark:text-white">Our Privacy Commitment:</p>
                                <blockquote className="border-l-4 border-purple-300 dark:border-purple-600 pl-4 italic text-gray-600 dark:text-white my-2">
                                    Unlike other platforms, Scripthuman does not store, view, or use your uploaded content (text, video, or images) to train, develop, or improve our technology. Your data is processed in a temporary"buffer" and is wiped immediately after the analysis is complete.
                                </blockquote>
                                <p className="font-bold mt-4 dark:text-white">What we do monitor:</p>
                                <p>To ensure the stability of the Scripthuman algorithm, we log strictly anonymous technical error metadata.</p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Example:"Task ID #882 failed to complete at 45% due to a server timeout."</li>
                                    <li><strong className="dark:text-white">What is NOT logged:</strong> We never log the content of the file, the filenames, or any identifiable personal data.</li>
                                </ul>
                                <p className="mt-4 text-xs text-gray-500 dark:text-white">
                                    By using Beta features, you acknowledge that these tools are experimental and that these anonymous technical logs are used solely for troubleshooting system performance, not for data mining or algorithmic training.
                                </p>
                            </div>
                        </div>

                        {/* Trust Building Box */}
                        <div className="mt-8 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                            <h3 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 mb-4">
                                <Shield size={18} />
                                Why this builds 100% Trust:
                            </h3>
                            <ul className="space-y-3 text-sm text-emerald-900 dark:text-emerald-300">
                                <li className="flex gap-2">
                                    <span className="font-bold">• Zero-Retention Policy:</span>
                                    <span>You are explicitly stating that you don't keep the data. For Enterprise clients and students, this is the #1 concern.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">• Algorithm Transparency:</span>
                                    <span>By naming it the Scripthuman algorithm, you reinforce your brand's unique"DNA" rather than sounding like a generic AI wrapper.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">• Clarity on Metadata:</span>
                                    <span>Explaining exactly what an"error log" looks like removes the"creepy" factor for the user.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 4: Encryption & The Vault */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                                <Lock size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">4. Encryption & The"Vault"</h2>
                        </div>
                        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-white">
                            <p>We treat your data like a high-security forensic sample.</p>
                            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-orange-500">
                                <li>
                                    <strong className="text-gray-900 dark:text-white">In Transit:</strong> All data moving between your device and the Pulse-Deck is protected by AES-256 bit encryption.
                                </li>
                                <li>
                                    <strong className="text-gray-900 dark:text-white">At Rest:</strong> Any saved reports in your Trust Hub are stored in encrypted"silos" that even our developers cannot peek into without your explicit permission.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 5: Third-Party Nodes */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-600 dark:text-white">
                                <Server size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">5. Third-Party"Nodes"</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white mb-4">To keep the UI fluid and the payments secure, we use a few elite partners:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <li className="p-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl">
                                <div className="font-bold text-gray-900 dark:text-white">Hosting</div>
                                <div className="text-sm text-gray-500 dark:text-white mt-1">Vercel/AWS (Global Edge Locations)</div>
                            </li>
                            <li className="p-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl">
                                <div className="font-bold text-gray-900 dark:text-white">Payments</div>
                                <div className="text-sm text-gray-500 dark:text-white mt-1">Stripe (PCI-DSS Level 1 compliant)</div>
                            </li>
                            <li className="p-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl">
                                <div className="font-bold text-gray-900 dark:text-white">Analytics</div>
                                <div className="text-sm text-gray-500 dark:text-white mt-1">Minimalist, cookie-free tracking</div>
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 6: Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-pink-600 dark:text-pink-400">
                                <EyeOff size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">6. Your Rights (The Human Override)</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white mb-4">You are in the driver's seat. At any time, you can:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:border-gray-300 dark:hover:border-slate-500 transition-colors">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">01</div>
                                <div className="font-bold text-gray-900 dark:text-white mb-2">Purge</div>
                                <p className="text-xs text-gray-500 dark:text-white">Delete all your saved Forensic Reports and Voice Profiles instantly.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:border-gray-300 dark:hover:border-slate-500 transition-colors">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">02</div>
                                <div className="font-bold text-gray-900 dark:text-white mb-2">Export</div>
                                <p className="text-xs text-gray-500 dark:text-white">Download every byte of data we have on you in a machine-readable format.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:border-gray-300 dark:hover:border-slate-500 transition-colors">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">03</div>
                                <div className="font-bold text-gray-900 dark:text-white mb-2">Anonymize</div>
                                <p className="text-xs text-gray-500 dark:text-white">Request that we disassociate your email from your usage history.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 7: Changes */}
                    <section className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">7. Changes to the Protocol</h2>
                        <p className="text-gray-600 dark:text-white text-sm">
                            If we change how we handle your data, we won't hide it in a 50-page PDF. We will Update in Privacy Page.
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}
