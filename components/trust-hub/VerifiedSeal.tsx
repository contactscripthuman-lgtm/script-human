"use client";

import { useState} from"react";
import { motion} from"framer-motion";
import { Award, Download, Shield, Sparkles, Code, Copy, X, Lock} from"lucide-react";
import { generateCertificate} from"@/lib/certificate-generator";
import type { ForensicAnalysisResult} from"@/lib/trust-hub/types";

interface VerifiedSealProps {
    textHash: string;
    confidenceScore: number;
    verdict: string;
    content?: string; // The actual content to certify
    metadata?: Record<string, unknown>; // Content metadata
    result?: ForensicAnalysisResult; // Full result for PDF generation
    onCertify?: (certificateId: string) => void;
    theme?: 'light' | 'dark';
    isLocked?: boolean;
    onUnlock?: () => void;
}

export default function VerifiedSeal({
    textHash,
    confidenceScore,
    verdict,
    content,
    metadata,
    result,
    onCertify,
    theme = 'light',
    isLocked = false,
    onUnlock
}: VerifiedSealProps) {
    const [isStamping, setIsStamping] = useState(false);
    const [isStamped, setIsStamped] = useState(false);
    const [certificateId, setCertificateId] = useState<string | null>(null);
    const [showEmbedModal, setShowEmbedModal] = useState(false);

    const isLight = theme === 'light';
    const canCertify = confidenceScore >= 75;

    const handleCertify = async () => {
        if (!canCertify || isStamping || !content) return;

        setIsStamping(true);

        try {
            // Call the actual certify API
            const response = await fetch('/api/trust-hub/certify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ content, metadata: metadata || {}})
           });

            if (!response.ok) {
                throw new Error('Certification failed');
           }

            // Get certificate ID from response body
            const data = await response.json();
            const certId = data.certificateId;

            if (certId) {
                setCertificateId(certId);
                setIsStamped(true);
                onCertify?.(certId);

                // Automatically download the certificate if we have the result and content
                if (content && result) {
                    await generateCertificate(content, result, certId);
               }
           } else {
                throw new Error('Certificate ID not found in response.');
           }
       } catch (error) {
            console.error("Certification error:", error);
            alert("Failed to generate certificate. Make sure your content meets the 75% threshold.");
       } finally {
            setIsStamping(false);
       }
   };

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            {/* 3D Stamp Animation */}
            <div className="relative">
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-3xl opacity-40"
                    style={{
                        background: canCertify
                            ?"radial-gradient(circle, #10B981, #D4AF37)"
                            :"radial-gradient(circle, #9CA3AF, #6B7280)"
                   }}
                    animate={isStamping ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4]
                   } : {}}
                    transition={{ duration: 1.5, repeat: isStamping ? Infinity : 0}}
                />

                {/* Stamp */}
                <motion.div
                    className="relative"
                    animate={isStamping ? {
                        rotateX: [0, -15, 0],
                        scale: [1, 0.95, 1],
                        y: [0, 20, 0]
                   } : isStamped ? {
                        rotateZ: [0, -5, 5, 0]
                   } : {}}
                    transition={{
                        duration: isStamping ? 1.5 : 0.3,
                        repeat: isStamping ? Infinity : 0
                   }}
                    style={{
                        transformStyle:"preserve-3d",
                        perspective: 1000
                   }}
                >
                    <div
                        className={`w-48 h-48 rounded-full border-8 flex items-center justify-center shadow-2xl transition-all duration-300 ${canCertify
                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 shadow-emerald-500/30'
                            : isLight
                                ? 'border-gray-200 bg-gray-50 shadow-gray-200/50'
                                : 'border-gray-600 bg-gradient-to-br from-gray-700/20 to-gray-800/20 shadow-gray-600/30'
                           }`}
                        style={{
                            transform: isStamped ? 'translateZ(20px)' : 'translateZ(0px)',
                            boxShadow: isStamped
                                ? '0 10px 40px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)'
                                : ''
                       }}
                    >
                        <div className="text-center">
                            {isStamped ? (
                                <motion.div
                                    initial={{ scale: 0, rotate: -180}}
                                    animate={{ scale: 1, rotate: 0}}
                                    transition={{ type:"spring", duration: 0.8}}
                                >
                                    <Award className="w-16 h-16 text-emerald-500 mx-auto mb-2" />
                                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                        Certified
                                    </div>
                                    <div className={`text-2xl font-black mt-1 ${isLight ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                                        {confidenceScore}%
                                    </div>
                                </motion.div>
                            ) : (
                                <>
                                    <Shield className={`w-16 h-16 mx-auto mb-2 ${canCertify ? 'text-emerald-500' : 'text-gray-300 dark:text-white'}`} />
                                    <div className={`text-xs font-bold uppercase tracking-wider ${canCertify ? 'text-emerald-600' : 'text-gray-400 dark:text-white'}`}>
                                        {canCertify ? 'Ready' : 'Insufficient'}
                                    </div>
                                    <div className={`text-2xl font-black mt-1 ${canCertify ? (isLight ? 'text-gray-900 dark:text-white' : 'text-white') : 'text-gray-400 dark:text-white'}`}>
                                        {confidenceScore}%
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Action Button */}
            {!isStamped && (
                <motion.button
                    onClick={isLocked ? onUnlock : handleCertify}
                    disabled={!canCertify || (isStamping && !isLocked)}
                    whileHover={canCertify ? { scale: 1.05} : {}}
                    whileTap={canCertify ? { scale: 0.95} : {}}
                    className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg transition-all ${canCertify
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl hover:shadow-emerald-500/30'
                        : 'bg-gray-100 text-gray-400 dark:text-white cursor-not-allowed border border-gray-200'
                       }`}
                >
                    {isLocked ? (
                        <>
                            <Lock className="w-5 h-5" />
                            Unlock Certificate ($6.99)
                        </>
                    ) : isStamping ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360}}
                                transition={{ duration: 1, repeat: Infinity, ease:"linear"}}
                            >
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Generating Certificate...
                        </>
                    ) : (
                        <>
                            <Award className="w-5 h-5" />
                            Certify & Download
                        </>
                    )}
                </motion.button>
            )}

            {/* Embed Button */}
            {isStamped && certificateId && (
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => setShowEmbedModal(true)}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 border ${isLight
                            ? 'bg-white text-gray-700 dark:text-white border-gray-200 hover:bg-gray-50'
                            : 'bg-transparent text-gray-300 dark:text-white border-gray-600 hover:bg-gray-800'
                           }`}
                    >
                        <Code className="w-4 h-4" />
                        Embed Seal
                    </button>

                    <button
                        onClick={async () => {
                            if (!content) return;
                            try {
                                const response = await fetch('/api/trust-hub/certify', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json'},
                                    body: JSON.stringify({ content, metadata: metadata || {}})
                               });

                                if (response.ok) {
                                    const data = await response.json();
                                    const certId = data.certificateId;
                                    if (content && result && certId) {
                                        await generateCertificate(content, result, certId);
                                   }
                               }
                           } catch (error) {
                                console.error('Download error:', error);
                           }
                       }}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${isLight
                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                            : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                           }`}
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            )}

            {/* Embed Modal */}
            {showEmbedModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Code size={20} className="text-emerald-500" />
                                Embed Trust Seal
                            </h3>
                            <button
                                onClick={() => setShowEmbedModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 dark:text-white hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-gray-600 dark:text-white text-sm mb-4">
                            Copy and paste this code into your website&apos;s HTML to display your verified Trust Seal.
                        </p>

                        <div className="bg-gray-900 rounded-xl p-4 mb-4 relative group">
                            <code className="text-emerald-400 text-xs font-mono break-all block">
                                {`<iframe src="https://scripthuman.com/verify/${certificateId}/seal" width="280" height="100" frameborder="0" scrolling="no" style="border:none; overflow:hidden;"></iframe>`}
                            </code>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`<iframe src="https://scripthuman.com/verify/${certificateId}/seal" width="280" height="100" frameborder="0" scrolling="no" style="border:none; overflow:hidden;"></iframe>`);
                                    alert("Copied to clipboard!");
                               }}
                                className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Copy size={14} />
                            </button>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-700 flex items-start gap-2">
                            <Shield className="w-4 h-4 mt-0.5 shrink-0" />
                            <p>
                                This seal will link back to your full verification page. It updates automatically if your score changes (re-verification required).
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {isStamped && certificateId && !showEmbedModal && (
                <div className="text-xs text-gray-500 dark:text-white text-center max-w-xs mt-4">
                    Official certification document
                </div>
            )}

            {/* Insufficient Score Warning */}
            {!canCertify && (
                <div className="text-center max-w-sm px-6 py-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700">
                        <strong>Certification Unavailable:</strong> Trust score must be 75% or higher. Current: {confidenceScore}%
                    </p>
                </div>
            )}
        </div>
    );
}
