import ToolNavbar from "@/components/ToolNavbar";
import { Scroll, ShieldCheck, AlertTriangle, Scale, Lock, FileText, Gavel, FileCheck } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans selection:bg-orange-100 dark:selection:bg-orange-900">
            <ToolNavbar />

            <div className="max-w-4xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 mb-6">
                        <Scroll size={16} className="text-orange-500 dark:text-orange-400" />
                        <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider font-display">
                            The Protocol
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto leading-relaxed">
                        Welcome to Scripthuman. By accessing the Pulse-Deck, utilizing the Scripthuman Algorithm, or engaging with any of our forensic tools, you agree to be bound by the following terms.
                    </p>
                    <p className="text-sm font-bold text-gray-400 dark:text-white mt-4 uppercase tracking-wide">
                        Effective Date: February 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm p-8 md:p-12 space-y-12">

                    {/* Section 1: Acceptance */}
                    <section>
                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of the Protocol</h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-white">
                            <p>
                                By creating an account or using our"Spark" (Free) tier, you confirm that you have read, understood, and agreed to these terms. If you do not agree to the protocol, you must cease use of the site immediately.
                            </p>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 2: Intellectual Property */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                <ShieldCheck size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">2. Intellectual Property &"The DNA Clause"</h2>
                        </div>
                        <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-white marker:text-orange-500">
                            <li>
                                <strong className="text-gray-900 dark:text-white">Your Content:</strong> You retain 100% ownership of any text, images, or video you upload to Scripthuman. We claim no rights to your intellectual property. Our goal is to refine your work, not own it.
                            </li>
                            <li>
                                <strong className="text-gray-900 dark:text-white">Our Technology:</strong> The Scripthuman Algorithm, the UI/UX design (including the Pulse-Sync graphs and Heatmaps), and all brand assets are the exclusive property of Scripthuman. You may not reverse-engineer,"scrape," or attempt to replicate our proprietary scoring logic.
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 3: Usage & Conduct */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                <Scale size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">3. Usage & Conduct</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white mb-4">You agree to use Scripthuman for legitimate creative, professional, or academic purposes.</p>
                        <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-white marker:text-purple-500">
                            <li>
                                <strong className="text-gray-900 dark:text-white">Prohibited Acts:</strong> You may not use this tool to generate harmful, illegal, or malicious content.
                            </li>
                            <li>
                                <strong className="text-gray-900 dark:text-white">Automation:</strong> Unauthorized"botting" or automated bulk-processing of our web interface (outside of the official Agency API) is strictly prohibited and will result in an immediate permanent ban.
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 4: Trust Hub & Disclaimer */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <FileCheck size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">4. The Trust Hub &"Verified Seal" Disclaimer</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white mb-4">The Scripthuman Verified Seal and Linguistic Forensic Reports are high-fidelity tools based on probabilistic analysis.</p>

                        <div className="grid gap-6 mb-8">
                            <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-xl border border-gray-100 dark:border-slate-600">
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-white">
                                    <li className="flex gap-2">
                                        <span className="font-bold text-gray-900 dark:text-white min-w-[100px]">No Guarantee:</span>
                                        <span>While our algorithm is designed for 100% forensic accuracy, AI detectors (like Turnitin, GPTZero, etc.) are third-party entities that update their logic frequently. Scripthuman provides an expert opinion and forensic data, but we do not"guarantee" a pass on every third-party detector.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-gray-900 dark:text-white min-w-[100px]">Liability:</span>
                                        <span>Scripthuman is not responsible for any academic or professional disciplinary actions taken against a user. We provide the tools; the user is responsible for the final submission.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">The Scripthuman Verified Seal</h3>
                        <p className="text-gray-600 dark:text-white mb-4 text-sm">
                            When a user finishes humanizing their text or validating an image/video, they can trigger the"Generate Certificate" action. The system then compiles a high-fidelity PDF containing:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-white mb-8 marker:text-emerald-500">
                            <li><strong>Linguistic DNA Summary:</strong> A breakdown of the SDSL (Sentence Variety) and Burstiness scores.</li>
                            <li><strong>The Origin Hash:</strong> A unique SHA-256 digital fingerprint of the document.</li>
                            <li><strong>Verification QR Code:</strong> A scannable code that links to a secure, read-only version of the audit on Scripthuman’s servers.</li>
                            <li><strong>Algorithm Verdict:</strong> The final"Humanity Confidence" percentage.</li>
                        </ul>

                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-3 text-yellow-800 dark:text-yellow-400 font-bold">
                                <AlertTriangle size={18} />
                                <span>⚠️ The Official Disclaimer</span>
                            </div>
                            <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-4">
                                To ensure 100% transparency and legal protection for your platform, the following disclaimer is embedded at the footer of every generated certificate. This builds trust by being honest about the nature of probabilistic analysis.
                            </p>
                            <blockquote className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30 text-sm text-gray-700 dark:text-white italic">
                                "DISCLAIMER: This analysis is based on probabilities in detection models. While highly accurate, it should be used as a supporting forensic tool rather than definitive proof of authorship. Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases."
                            </blockquote>
                        </div>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 5: Subscription */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                                <FileText size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">5. Subscription Tiers & Billing</h2>
                        </div>
                        <ul className="space-y-3 text-gray-600 dark:text-white">
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">Tiers:</span>
                                <span>We offer the Free / Certificate / Pro / Enterprise plans.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">Payments:</span>
                                <span>All transactions are handled via secure third-party processors. Subscriptions renew automatically unless canceled via your account settings.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-gray-900 dark:text-white min-w-[120px]">Refunds:</span>
                                <span>Due to the digital and consumable nature of"Word Credits" and"Forensic Scans," refunds are handled on a case-by-case basis but are generally not provided once a scan or humanization has been executed.</span>
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 6: Beta Features */}
                    <section>
                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">6. Beta Features & Experimental Tools</h2>
                        <p className="text-gray-600 dark:text-white mb-4">Features labeled as"Beta" (such as the Media Origin Scanner) are experimental.</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-white">
                            <li><strong className="dark:text-white">Performance:</strong> These tools may have occasional downtime or variable accuracy.</li>
                            <li><strong className="dark:text-white">Data Handling:</strong> As stated in our Privacy Policy, we do not store or use your data to train the Scripthuman Algorithm. However, we log anonymous technical error metadata to fix system bugs.</li>
                        </ul>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 7: Limitation */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                                <AlertTriangle size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">7. Limitation of Liability</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white">
                            Scripthuman is provided"as is." We are not liable for any indirect, incidental, or consequential damages resulting from your use of the platform, including but not limited to loss of data, loss of profits, or"AI accusations" from external parties.
                        </p>
                    </section>

                    <hr className="border-gray-100 dark:border-slate-700" />

                    {/* Section 8: Termination */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-600 dark:text-white">
                                <Gavel size={20} />
                            </div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">8. Termination of Service</h2>
                        </div>
                        <p className="text-gray-600 dark:text-white">
                            We reserve the right to suspend or terminate any account that violates this protocol, engages in fraudulent payment activity, or attempts to damage the platform's integrity.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
