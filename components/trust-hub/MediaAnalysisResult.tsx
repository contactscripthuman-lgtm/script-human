"use client";

import { ShieldCheck, AlertTriangle, HelpCircle, TrendingUp} from"lucide-react";
import { MediaAnalysisResult} from"@/lib/trust-hub/media-types";

interface MediaAnalysisResultDisplayProps {
    result: MediaAnalysisResult;
}

export default function MediaAnalysisResultDisplay({ result}: MediaAnalysisResultDisplayProps) {
    const getVerdictColor = () => {
        if (result.verdict === 'LIKELY REAL') return 'text-green-600';
        if (result.verdict === 'LIKELY AI-GENERATED') return 'text-red-600';
        return 'text-orange-600';
   };

    const getVerdictBg = () => {
        if (result.verdict === 'LIKELY REAL') return 'bg-green-50 border-green-200';
        if (result.verdict === 'LIKELY AI-GENERATED') return 'bg-red-50 border-red-200';
        return 'bg-orange-50 border-orange-200';
   };

    const getVerdictIcon = () => {
        if (result.verdict === 'LIKELY REAL') return <ShieldCheck size={48} />;
        if (result.verdict === 'LIKELY AI-GENERATED') return <AlertTriangle size={48} />;
        return <HelpCircle size={48} />;
   };

    const layerNames: Record<keyof typeof result.layerScores, string> = {
        frequency_analysis: 'Frequency Analysis',
        artifact_detection: 'Artifact Detection',
        noise_analysis: 'Noise Analysis',
        texture_analysis: 'Texture Analysis',
        statistical_analysis: 'Statistical Analysis',
        edge_consistency: 'Edge Consistency',
        color_distribution: 'Color Distribution'
   };

    const layerDescriptions: Record<keyof typeof result.layerScores, string> = {
        frequency_analysis: 'FFT/DCT Domain Analysis',
        artifact_detection: 'Checkerboard & Boundaries',
        noise_analysis: 'Noise Characteristics',
        texture_analysis: 'Texture Patterns',
        statistical_analysis: 'Statistical Properties',
        edge_consistency: 'Edge Distribution',
        color_distribution: 'Color Patterns'
   };

    return (
        <div className="space-y-6">
            {/* Overall Score */}
            <div className={`rounded-3xl border-2 p-8 ${getVerdictBg()}`}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className={`${getVerdictColor()}`}>
                        {getVerdictIcon()}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="text-6xl font-black text-gray-900 dark:text-white mb-2">
                            {result.score}
                            <span className="text-2xl text-gray-500 dark:text-white">/100</span>
                        </div>
                        <div className={`text-2xl font-bold mb-2 ${getVerdictColor()}`}>
                            {result.verdict}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-white">
                            Confidence: <span className="font-bold">{result.confidence}</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-xs text-gray-500 dark:text-white font-bold uppercase mb-2">Score Range</div>
                        <div className="text-sm text-gray-700 dark:text-white">
                            {result.score >= 85 &&"85-100: Very Likely Real"}
                            {result.score >= 70 && result.score < 85 &&"70-84: Likely Real"}
                            {result.score >= 40 && result.score < 70 &&"40-69: Uncertain"}
                            {result.score >= 25 && result.score < 40 &&"25-39: Likely AI"}
                            {result.score < 25 &&"0-24: Very Likely AI"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Layer Breakdown */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <TrendingUp size={20} />
                    </div>
                    <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">7-Layer Analysis Breakdown</h2>
                </div>

                <div className="space-y-4">
                    {Object.entries(result.layerScores).map(([layer, score], index) => {
                        const layerKey = layer as keyof typeof result.layerScores;
                        const getBarColor = (score: number) => {
                            if (score >= 70) return 'bg-green-500';
                            if (score >= 40) return 'bg-orange-500';
                            return 'bg-red-500';
                       };

                        return (
                            <div key={layer} className="bg-gray-50 p-5 rounded-2xl">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 dark:text-white bg-gray-200 px-2 py-1 rounded-md">
                                                Layer {index + 1}
                                            </span>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{layerNames[layerKey]}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-white mt-1">{layerDescriptions[layerKey]}</p>
                                    </div>
                                    <div className="text-2xl font-black text-gray-900 dark:text-white">{score}</div>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${getBarColor(score)}`}
                                        style={{ width:`${score}%`}}
                                    />
                                </div>
                            </div>
                        );
                   })}
                </div>
            </div>

            {/* Interpretation */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 p-8 shadow-xl">
                <h3 className="font-bold text-lg mb-4 font-display">Findings</h3>
                <div className="space-y-2">
                    {result.interpretation.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <span className="text-lg">{item.startsWith('✅') ? '✅' : '⚠️'}</span>
                            <p className="text-sm text-gray-700 dark:text-white leading-relaxed">{item.replace(/^[✅⚠️]\s*/, '')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
