import { getCertificate} from"@/lib/trust-hub/storage";
import { Shield, CheckCircle, AlertTriangle, ExternalLink} from"lucide-react";
import Link from"next/link";
import Image from"next/image";

export default async function VerifyPage({ params}: { params: Promise<{ id: string}>}) {
    const { id} = await params;
    const certificate = await getCertificate(id);

    return (
        <main className="min-h-screen bg-[#0B0B0F] text-white font-[family-name:var(--font-metro)]">
            {/* Background gradient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37] rounded-full blur-[150px] opacity-10" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#10B981] rounded-full blur-[150px] opacity-10" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <nav className="p-6 flex justify-between items-center max-w-5xl mx-auto">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 relative">
                            <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="text-xl font-bold font-display text-white">ScriptHuman</span>
                    </Link>
                </nav>

                {/* Verification Result */}
                <section className="px-6 py-12 max-w-3xl mx-auto">
                    {certificate ? (
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl text-center">
                            {/* Success Icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-gold-500/20 border-4 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl font-bold font-display mb-3">
                                Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#10B981]">Verified</span>
                            </h1>
                            <p className="text-gray-400 dark:text-white mb-8">This document has been forensically verified by ScriptHuman Trust Hub</p>

                            {/* Certificate Details */}
                            <div className="space-y-4 mb-8">
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase tracking-wider mb-1">Certificate ID</div>
                                    <div className="font-mono text-sm text-white">{certificate.certificateId}</div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase tracking-wider mb-1">Confidence Score</div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#10B981]">
                                        {certificate.confidenceScore}%
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase tracking-wider mb-1">Verdict</div>
                                    <div className="text-lg font-bold text-emerald-400">{certificate.verdict}</div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase tracking-wider mb-1">Issued</div>
                                    <div className="text-sm text-white">{new Date(certificate.issuedAt).toLocaleString()}</div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase tracking-wider mb-1">Text Hash (SHA-256)</div>
                                    <div className="font-mono text-xs text-gray-300 dark:text-white break-all">{certificate.textHash}</div>
                                </div>
                            </div>

                            {/* Forensic Layers */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase mb-1">Authenticity</div>
                                    <div className="text-2xl font-bold text-white">{certificate.layers.authenticity.score}%</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase mb-1">Quality</div>
                                    <div className="text-2xl font-bold text-white">{certificate.layers.quality.score}%</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase mb-1">Originality</div>
                                    <div className="text-2xl font-bold text-white">{certificate.layers.originality.score}%</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 dark:text-white uppercase mb-1">Credibility</div>
                                    <div className="text-2xl font-bold text-white">{certificate.layers.credibility.score}%</div>
                                </div>
                            </div>

                            {/* Trust Message */}
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                                <p className="text-sm text-emerald-200">
                                    ✓ This certificate is cryptographically verified and tamper-proof
                                </p>
                            </div>

                            {/* Link to Trust Hub */}
                            <div className="mt-8">
                                <Link
                                    href="/trust-hub"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#10B981] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Shield className="w-4 h-4" />
                                    Verify Your Own Content
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl text-center">
                            {/* Error Icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="w-24 h-24 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center">
                                    <AlertTriangle className="w-12 h-12 text-red-400" />
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl font-bold font-display mb-3 text-red-400">
                                Certificate Not Found
                            </h1>
                            <p className="text-gray-400 dark:text-white mb-8">The certificate ID <span className="font-mono text-sm">{id}</span> could not be verified</p>

                            {/* Possible Reasons */}
                            <div className="text-left max-w-md mx-auto mb-8 space-y-2">
                                <p className="text-sm text-gray-400 dark:text-white">This could mean:</p>
                                <ul className="text-sm text-gray-500 dark:text-white space-y-1 list-disc list-inside">
                                    <li>The certificate ID is invalid or incorrect</li>
                                    <li>The certificate has not been issued yet</li>
                                    <li>The certificate may have expired</li>
                                </ul>
                            </div>

                            {/* Link to Trust Hub */}
                            <Link
                                href="/trust-hub"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Shield className="w-4 h-4" />
                                Go to Trust Hub
                            </Link>
                        </div>
                    )}
                </section>
                <div className="max-w-3xl mx-auto text-center pb-12 px-6">
                    <p className="text-[10px] text-gray-400 dark:text-white leading-relaxed opacity-60">
                        Our algorithm is designed to accurately identify and differentiate AI-generated content from original human-written content. However, as AI content increasingly mirrors human tone and structure, accuracy may vary slightly in certain cases.
                    </p>
                </div>
            </div>
        </main>
    );
}
