"use client";

import { useEffect, useState} from"react";
import { motion} from"framer-motion";
import { Shield, AlertTriangle, CheckCircle2, XCircle, Info} from"lucide-react";
import type { RiskLevel} from"@/lib/trust-hub/types";

interface ConfidenceMeterProps {
    score: number; // 0-100 trust score
    riskLevel: RiskLevel;
    theme?: 'light' | 'dark';
}

export default function ConfidenceMeter({ score, riskLevel, theme = 'light'}: ConfidenceMeterProps) {
    const [displayScore, setDisplayScore] = useState(0);
    const [phase, setPhase] = useState<"searching" |"locked">("searching");

    const isLight = theme === 'light';

    useEffect(() => {
        // Searching animation (3 seconds)
        setTimeout(() => {
            setPhase("locked");
       }, 3000);

        // Count-up animation
        setTimeout(() => {
            let current = 0;
            const interval = setInterval(() => {
                current += 2;
                if (current >= score) {
                    setDisplayScore(score);
                    clearInterval(interval);
               } else {
                    setDisplayScore(current);
               }
           }, 30);
       }, 3000);
   }, [score]);

    // Color based on risk level
    const getColorScheme = () => {
        switch (riskLevel) {
            case"minimal":
                return {
                    gradient:"from-emerald-400 to-emerald-600",
                    glow: isLight ?"rgba(16, 185, 129, 0.2)" :"rgba(16, 185, 129, 0.6)",
                    text: isLight ?"text-emerald-600" :"text-emerald-400",
                    icon: isLight ?"text-emerald-600" :"text-emerald-400"
               };
            case"low":
                return {
                    gradient:"from-green-400 to-emerald-500",
                    glow: isLight ?"rgba(34, 197, 94, 0.2)" :"rgba(34, 197, 94, 0.6)",
                    text: isLight ?"text-green-600" :"text-green-400",
                    icon: isLight ?"text-green-600" :"text-green-400"
               };
            case"medium":
                return {
                    gradient:"from-yellow-400 to-orange-500",
                    glow: isLight ?"rgba(251, 191, 36, 0.2)" :"rgba(251, 191, 36, 0.6)",
                    text: isLight ?"text-yellow-600" :"text-yellow-400",
                    icon: isLight ?"text-yellow-600" :"text-yellow-400"
               };
            case"high":
                return {
                    gradient:"from-orange-500 to-red-500",
                    glow: isLight ?"rgba(249, 115, 22, 0.2)" :"rgba(249, 115, 22, 0.6)",
                    text: isLight ?"text-orange-600" :"text-orange-400",
                    icon: isLight ?"text-orange-600" :"text-orange-400"
               };
            case"critical":
                return {
                    gradient:"from-red-500 to-red-700",
                    glow: isLight ?"rgba(239, 68, 68, 0.2)" :"rgba(239, 68, 68, 0.6)",
                    text: isLight ?"text-red-600" :"text-red-400",
                    icon: isLight ?"text-red-600" :"text-red-400"
               };
       }
   };

    const colors = getColorScheme();

    const getRiskIcon = () => {
        const className =`w-12 h-12 ${colors.icon}`;
        switch (riskLevel) {
            case"minimal": return <CheckCircle2 className={className} />;
            case"low": return <Shield className={className} />;
            case"medium": return <Info className={className} />;
            case"high": return <AlertTriangle className={className} />;
            case"critical": return <XCircle className={className} />;
       }
   };

    const getRiskLabel = () => {
        switch (riskLevel) {
            case"minimal": return"Minimal Risk";
            case"low": return"Low Risk";
            case"medium": return"Medium Risk";
            case"high": return"High Risk";
            case"critical": return"Critical Risk";
       }
   };

    // Custom color logic with explicit HEX for SVG gradients
    const getScoreColor = (s: number) => {
        if (s <= 25) {
            return {
                start:"#DC2626", // red-600
                end:"#991B1B",   // red-800
           };
       } else if (s < 75) {
            return {
                start:"#F97316", // orange-500
                end:"#F59E0B",   // amber-500
           };
       } else {
            return {
                start:"#10B981", // emerald-500
                end:"#059669",   // emerald-600
           };
       }
   };

    const styles = getScoreColor(displayScore);

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Circular Gauge */}
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0}}
                animate={{
                    scale: phase ==="locked" ? [1, 1.02, 1] : 1, // Subtle pulse
                    opacity: 1
               }}
                transition={{ duration: 0.5}}
            >
                {/* Gauge Container - REDUCED SIZE (w-40 h-40) */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke={isLight ?"rgba(0,0,0,0.06)" :"rgba(255,255,255,0.1)"}
                            strokeWidth="8"
                            fill="none"
                        />

                        {/* Progress circle */}
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke={`url(#score-gradient-${score})`}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0}}
                            animate={{ pathLength: phase ==="locked" ? displayScore / 100 : 0.5}}
                            transition={{ duration: phase ==="locked" ? 1 : 0, ease:"easeOut"}}
                            strokeDasharray="439.82" // 2 * pi * 70
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id={`score-gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={styles.start} />
                                <stop offset="100%" stopColor={styles.end} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center Content */}
                    <div className="text-center z-10">
                        {phase ==="locked" ? (
                            <motion.div
                                initial={{ scale: 0}}
                                animate={{ scale: 1}}
                                transition={{ type:"spring", duration: 0.6}}
                            >
                                <div className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                                    {displayScore}%
                                </div>
                                <div className={`text-[10px] mt-1 uppercase tracking-widest font-bold ${isLight ? 'text-gray-400 dark:text-white' : 'text-gray-500 dark:text-white'}`}>
                                    Trust Score
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{ rotate: 360}}
                                transition={{ duration: 1.5, repeat: Infinity, ease:"linear"}}
                            >
                                <Shield className={`w-8 h-8 ${isLight ? 'text-gray-300 dark:text-white' : 'text-gray-500 dark:text-white'}`} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Risk Level Display */}
            {phase ==="locked" && (
                <motion.div
                    initial={{ opacity: 0, y: 20}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{ delay: 0.5}}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full border ${isLight
                        ? 'bg-white border-gray-100 shadow-sm'
                        : 'bg-black/30 border-white/10'
                       }`}
                >
                    {getRiskIcon()}
                    <div>
                        <div className={`font-bold text-lg ${colors.text}`}>
                            {getRiskLabel()}
                        </div>
                        <div className={`text-xs ${isLight ? 'text-gray-500 dark:text-white' : 'text-gray-400 dark:text-white'}`}>
                            Based on 4-layer analysis
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Certification Threshold Warning */}
            {phase ==="locked" && score < 75 && (
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 max-w-sm"
                >
                    <p className="text-xs text-amber-600 text-center flex items-center gap-2 justify-center font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        Trust score below 75% - certification unavailable
                    </p>
                </motion.div>
            )}
        </div>
    );
}
