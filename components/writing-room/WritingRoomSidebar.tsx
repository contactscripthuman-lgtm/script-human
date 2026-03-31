"use client";

import { User, Mail, Share2, FileText, PenTool, RefreshCw, Activity, Smile, BookOpen, Lock } from "lucide-react";
import { motion } from "framer-motion";

export type ToolType = 'persona' | 'email' | 'social' | 'grammar' | 'paraphrase' | 'hallucination' | 'sentiment' | 'content';

interface WritingRoomSidebarProps {
    activeTool: ToolType;
    onSelectTool: (tool: ToolType) => void;
    disabled?: boolean;
    hasProAccess?: boolean;
    onLockedClick?: () => void;
}

export default function WritingRoomSidebar({ activeTool, onSelectTool, disabled, hasProAccess = true, onLockedClick }: WritingRoomSidebarProps) {
    const tools = [
        {
            id: 'persona' as ToolType,
            label: 'Humanize Content Writer',
            icon: FileText,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Standard humanizer for general content",
            locked: false
        },
        {
            id: 'social' as ToolType,
            label: 'Social Media Tone',
            icon: Share2,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Punchy, engaging posts with hashtags",
            locked: false
        },
        {
            id: 'email' as ToolType,
            label: 'Humanized Email Writer',
            icon: Mail,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Professional emails with proper etiquette",
            locked: !hasProAccess
        },
        {
            id: 'grammar' as ToolType,
            label: 'Grammar Correction Suggestions',
            icon: PenTool,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Get grammar fixing suggestions for your humanized text",
            locked: false
        },
        {
            id: 'paraphrase' as ToolType,
            label: 'Paraphrasing Tool',
            icon: RefreshCw,
            color: 'bg-blue-500',
            textColor: 'text-blue-500',
            bgHover: 'group-hover:bg-blue-500',
            borderHover: 'hover:border-blue-500',
            description: "Rewrite text simply",
            locked: !hasProAccess
        },
        {
            id: 'hallucination' as ToolType,
            label: 'Hallucination Detector',
            icon: Activity,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-500',
            bgHover: 'group-hover:bg-emerald-500',
            borderHover: 'hover:border-emerald-500',
            description: "Check if AI is hallucinaton facts",
            locked: !hasProAccess
        },
        {
            id: 'sentiment' as ToolType,
            label: 'Sentiment Analyze Tool',
            icon: Smile,
            color: 'bg-purple-500',
            textColor: 'text-purple-500',
            bgHover: 'group-hover:bg-purple-500',
            borderHover: 'hover:border-purple-500',
            description: "Detailed breakdown of tone and emotion",
            locked: !hasProAccess
        },
        {
            id: 'content' as ToolType,
            label: 'Content Writer Tool',
            icon: BookOpen,
            color: 'bg-indigo-500',
            textColor: 'text-indigo-500',
            bgHover: 'group-hover:bg-indigo-500',
            borderHover: 'hover:border-indigo-500',
            description: "Fantasy themed specialized generation",
            locked: !hasProAccess
        }
    ];

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 dark:text-white uppercase tracking-widest mb-4 px-2">Writing Tools</h3>
                <div className="space-y-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = activeTool === tool.id;

                        return (
                            <button
                                key={tool.id}
                                onClick={() => {
                                    if (tool.locked && onLockedClick) {
                                        onLockedClick();
                                    } else {
                                        onSelectTool(tool.id);
                                    }
                                }}
                                disabled={disabled && !tool.locked}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 border-2 group relative overflow-hidden ${isActive
                                    ? `border-${tool.color.replace('bg-', '')} bg-gray-50`
                                    : "border-transparent hover:bg-gray-50 bg-white"
                                    } ${(disabled && !tool.locked) ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <div className="flex items-center gap-3 relative z-10 w-full">
                                    <div className={`p-2 rounded-lg transition-colors ${isActive ? tool.color + " text-white" : "bg-gray-100 text-gray-500 " + tool.bgHover + " group-hover:text-white"}`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className={`font-bold text-sm font-display flex items-center justify-between ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                                            {tool.label}
                                            {tool.locked && <Lock size={14} className="text-gray-400" />}
                                        </div>
                                    </div>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className={`absolute left-0 top-0 bottom-0 w-1 ${tool.color}`}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Info Box based on selection */}
            <div className={`rounded-3xl p-6 border ${activeTool === 'hallucination' ? 'bg-emerald-50 border-emerald-100' :
                activeTool === 'paraphrase' ? 'bg-blue-50 border-blue-100' :
                activeTool === 'sentiment' ? 'bg-purple-50 border-purple-100' :
                activeTool === 'content' ? 'bg-indigo-50 border-indigo-100' :
                'bg-orange-50 border-orange-100'
                }`}>
                <h4 className={`font-bold text-sm mb-2 font-display ${activeTool === 'hallucination' ? 'text-emerald-800' :
                    activeTool === 'paraphrase' ? 'text-blue-800' :
                    activeTool === 'sentiment' ? 'text-purple-800' :
                    activeTool === 'content' ? 'text-indigo-800' :
                    'text-orange-800'
                    }`}>
                    {activeTool === 'persona' && "Humanize Content Writer"}
                    {activeTool === 'email' && "Email Writer Mode"}
                    {activeTool === 'social' && "Social Media Mode"}
                    {activeTool === 'grammar' && "Grammar Correction Suggestions"}
                    {activeTool === 'paraphrase' && "Paraphrasing Tool"}
                    {activeTool === 'hallucination' && "Hallucination Detector"}
                    {activeTool === 'sentiment' && "Sentiment Analyze Tool"}
                    {activeTool === 'content' && "Content Writer Tool"}
                </h4>
                <p className={`text-xs leading-relaxed font-[var(--font-metro)] ${activeTool === 'hallucination' ? 'text-emerald-700/80' :
                    activeTool === 'paraphrase' ? 'text-blue-700/80' :
                    activeTool === 'sentiment' ? 'text-purple-700/80' :
                    activeTool === 'content' ? 'text-indigo-700/80' :
                    'text-orange-700/80'
                    }`}>
                    {activeTool === 'persona' && "Our core algorithmic engine designed to humanize general content, essays, and articles while bypassing AI detection."}
                    {activeTool === 'email' && "Optimized for professional communication. Adds natural greetings, sign-offs, and polite hedging to ensure your emails sound genuinely human."}
                    {activeTool === 'social' && "Analysis for high-engagement platforms. Focuses on punchy sentence structures, emotional hooks, and authentic emoji usage."}
                    {activeTool === 'grammar' && "Paste your humanized text here to get grammar correction suggestions. We recommend applying these fixes manually to retain the human feel."}
                    {activeTool === 'paraphrase' && "Rewrite your text using advanced paraphrasing simply and effectively."}
                    {activeTool === 'hallucination' && "Check if AI is hallucinating facts by providing the generated answer alongside the context and original question."}
                    {activeTool === 'sentiment' && "Get a detailed breakdown of the tone and emotion behind the text."}
                    {activeTool === 'content' && "Generate specialized content optimized for your chosen topic."}
                </p>
            </div>
        </div>
    );
}

