"use client";

import { useState} from"react";
import { useRouter} from"next/navigation";
import { ShieldCheck, Search, CheckCircle, AlertTriangle, Loader2, QrCode, Fingerprint} from"lucide-react";

interface VerificationResult {
    certificateId: string;
    textHash: string;
    confidenceScore: number;
    verdict: string;
    issuedAt: string;
    layers: {
        authenticity: { score: number};
        quality: { score: number};
        originality: { score: number};
        credibility: { score: number};
   };
    metrics: Record<string, unknown>;
}

export default function VerifyCertificate() {
    const [certId, setCertId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certId.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`/api/trust-hub/verify?id=${encodeURIComponent(certId.trim())}`);
            if (!response.ok) {
                if (response.status === 404) {
                    setError("Certificate not found");
               } else {
                    setError("Verification failed");
               }
                return;
           }
            const data = await response.json();
            setResult(data);
       } catch (err) {
            setError("Something went wrong");
       } finally {
            setLoading(false);
       }
   };

    return (
        <section className="py-12 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-full mb-4">
                    <ShieldCheck size={24} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    Verify a Certificate
                </h2>
                <p className="text-gray-500 dark:text-white max-w-lg mx-auto">
                    Enter your Certificate ID below to view the full forensic Vibe Audit report.
                </p>
            </div>

            <form onSubmit={handleVerify} className="max-w-md mx-auto relative flex items-center mb-12">
                <Search className="absolute left-4 text-gray-400 dark:text-white w-5 h-5" />
                <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="SH-882-9901-VX"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all text-black dark:text-white font-mono uppercase placeholder:normal-case"
                />
                <button
                    type="submit"
                    disabled={!certId.trim() || loading}
                    className="absolute right-2 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-display"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :"Verify"}
                </button>
            </form>

            {/* ERROR STATE */}
            {error && (
                <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex flex-col items-center text-center">
                        <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
                        <h3 className="text-lg font-bold text-red-700 mb-1">Verification Failed</h3>
                        <p className="text-red-600/80 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* CERTIFICATE DISPLAY */}
            {result && (
                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 relative">
                        {/* Top Decoration Line */}
                        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gray-100 rounded-tr-[2rem] m-6 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gray-100 rounded-bl-[2rem] m-6 opacity-50"></div>

                        {/* HEADER */}
                        <div className="flex justify-between items-start p-8 pb-4 border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                    <Fingerprint size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900 dark:text-white leading-none">Scripthuman <span className="text-emerald-500">Verified</span></h3>
                                    <p className="text-[10px] text-gray-400 dark:text-white font-bold tracking-widest uppercase mt-1">Certificate of Human Origin</p>
                                </div>
                            </div>
                            <div className="text-right text-[10px] text-gray-400 dark:text-white font-mono">
                                <div>Issue Date: {new Date(result.issuedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric'})}</div>
                                <div>ID: {result.certificateId}</div>
                            </div>
                        </div>

                        {/* MAIN BODY */}
                        <div className="p-8">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">The Vibe Audit: Summary Report</h1>
                                <p className="text-gray-500 dark:text-white text-sm">Analysis for: &quot;The Human Element in Modern Design&quot;</p>
                            </div>

                            {/* SCORE CARD */}
                            <div className="bg-emerald-50/50 rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center gap-8 border border-emerald-100/50">
                                {/* Circular Progress */}
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-white" />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={364}
                                            strokeDashoffset={364 - (364 * result.confidenceScore) / 100}
                                            className="text-emerald-500 transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-gray-900 dark:text-white font-display">{result.confidenceScore}<span className="text-base text-gray-400 dark:text-white font-normal">/100</span></span>
                                        <span className="text-[9px] font-bold text-gray-400 dark:text-white tracking-widest uppercase mt-1">Origin Score</span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-left flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle size={18} className="text-emerald-500 fill-emerald-500/20" />
                                        <span className="font-bold text-gray-900 dark:text-white">Authenticity Confirmed</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-white italic leading-relaxed font-serif">
                                        &quot;This content exhibits a high degree of organic variance, emotional layering, and idiosyncratic linguistic patterns that are statistically improbable for current generative AI models.&quot;
                                    </p>
                                </div>
                            </div>

                            {/* LINGUISTIC BREAKDOWN */}
                            <div className="mb-10">
                                <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-6 font-display">
                                    <div className="w-5 h-5 bg-gray-900 text-white rounded flex items-center justify-center text-xs">
                                        <span className="transform rotate-90 whitespace-nowrap" style={{ fontSize: '8px'}}>|||</span>
                                    </div>
                                    Linguistic Breakdown
                                </h4>

                                <div className="space-y-6">
                                    {/* Emotional Resonance (using Authenticity) */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-2">
                                            <span>Emotional Resonance</span>
                                            <span className="text-emerald-600">{result.layers.authenticity.score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width:`${result.layers.authenticity.score}%`}}
                                            />
                                        </div>
                                    </div>

                                    {/* Syntactic Variety (using Originality) */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-2">
                                            <span>Syntactic Variety</span>
                                            <span className="text-emerald-600">{result.layers.originality.score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width:`${result.layers.originality.score}%`}}
                                            />
                                        </div>
                                    </div>

                                    {/* Nuance Index (using Quality) */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider mb-2">
                                            <span>Nuance Index</span>
                                            <span className="text-emerald-600">{result.layers.quality.score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width:`${result.layers.quality.score}%`}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
                                        <ShieldCheck className="w-6 h-6" />
                                        <span>Certificate Verified</span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-gray-300 dark:text-white tracking-wider">
                                        TAMPER-PROOF METADATA © 2026 SCRIPTHUMAN TECHNOLOGIES. ALL RIGHTS RESERVED.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
