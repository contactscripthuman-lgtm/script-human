"use client";

import { FileText, Scan } from "lucide-react";
import { motion } from "framer-motion";

export type TrustHubTool = 'content' | 'media';

interface TrustHubSidebarProps {
    activeTool: TrustHubTool;
    onSelectTool: (tool: TrustHubTool) => void;
    disabled?: boolean;
    isPremium: boolean;
    onLockedClick: () => void;
}

export default function TrustHubSidebar({ activeTool, onSelectTool, disabled, isPremium, onLockedClick }: TrustHubSidebarProps) {
    const tools = [
        {
            id: 'content' as TrustHubTool,
            label: 'Content Verifier',
            icon: FileText,
            color: 'bg-purple-500',
            textColor: 'text-purple-500',
            bgHover: 'group-hover:bg-purple-500',
            description: "AI detection & quality analysis for text content",
            beta: false,
            locked: false
        },
        {
            id: 'media' as TrustHubTool,
            label: 'Media Verifier',
            icon: Scan,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-500',
            bgHover: 'group-hover:bg-emerald-500',
            description: "7-layer forensic analysis for images & videos",
            beta: true,
            locked: !isPremium // Locked if not premium
        }
    ];

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Verification Tools</h3>
                <div className="space-y-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = activeTool === tool.id;

                        return (
                            <button
                                key={tool.id}
                                onClick={() => {
                                    onSelectTool(tool.id);
                                }}
                                disabled={disabled}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 border-2 group relative overflow-hidden ${isActive
                                    ? `border-${tool.color.replace('bg-', '')} bg-gray-50`
                                    : "border-transparent hover:bg-gray-50 bg-white"
                                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <div className="flex items-center gap-3 relative z-10 w-full">
                                    <div className={`p-2 rounded-lg transition-colors ${isActive
                                        ? tool.color + " text-white"
                                        : "bg-gray-100 text-gray-500" + tool.bgHover + " group-hover:text-white"
                                        }`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className={`font-bold text-sm font-display flex items-center gap-2 ${isActive ? "text-gray-900" : "text-gray-600"
                                            }`}>
                                            {tool.label}
                                            {tool.beta && (
                                                <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md font-extrabold tracking-wider">BETA</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill-trust"
                                        className={`absolute left-0 top-0 bottom-0 w-1 ${tool.color}`}
                                    />
                                )}
                            </button>
                        );
                    })}</div>
            </div>

            {/* Info Box */}
            <div className={`${activeTool === 'content' ? 'bg-purple-50 border-purple-100' : 'bg-emerald-50 border-emerald-100'
                } rounded-3xl p-6 border`}>
                <h4 className={`font-bold text-sm mb-2 font-display ${activeTool === 'content' ? 'text-purple-800' : 'text-emerald-800'
                    }`}>
                    {activeTool === 'content' ? "Content Verification Engine" : "Media Forensics Engine"}
                </h4>
                <p className={`text-xs leading-relaxed font-[var(--font-metro)] ${activeTool === 'content' ? 'text-purple-700/80' : 'text-emerald-700/80'
                    }`}>
                    {activeTool === 'content'
                        ? "Multi-layer forensic analysis for text: AI detection, quality check, originality scan, and credibility verification."
                        : "7-layer algorithmic detection for images and videos: frequency analysis, artifact detection, noise patterns, texture analysis, and more."}
                </p>
            </div>
        </div>
    );
}
