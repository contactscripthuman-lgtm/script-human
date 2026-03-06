"use client";

import { User, Mail, Share2, FileText } from "lucide-react";
import { motion } from "framer-motion";

export type ToolType = 'persona' | 'email' | 'social';

interface WritingRoomSidebarProps {
    activeTool: ToolType;
    onSelectTool: (tool: ToolType) => void;
    disabled?: boolean;
}

export default function WritingRoomSidebar({ activeTool, onSelectTool, disabled }: WritingRoomSidebarProps) {
    const tools = [
        {
            id: 'persona' as ToolType,
            label: 'Humanize Content Writer',
            icon: FileText,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Standard humanizer for general content"
        },
        {
            id: 'social' as ToolType,
            label: 'Social Media Tone',
            icon: Share2,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Punchy, engaging posts with hashtags"
        },
        {
            id: 'email' as ToolType,
            label: 'Humanized Email Writer',
            icon: Mail,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgHover: 'group-hover:bg-orange-500',
            borderHover: 'hover:border-orange-500',
            description: "Professional emails with proper etiquette"
        }
    ];

    // Re-ordering to match user request: Left side... 2 tools: Humanized Email Writer, Humanized Social Media Tone.
    // Plus"Main Tech Persona".
    // I will use the names requested in the text prompt.

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
                                onClick={() => onSelectTool(tool.id)}
                                disabled={disabled}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 border-2 group relative overflow-hidden ${isActive
                                    ? `border-${tool.color.replace('bg-', '')} bg-gray-50`
                                    : "border-transparent hover:bg-gray-50 bg-white"
                                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className={`p-2 rounded-lg transition-colors ${isActive ? tool.color + " text-white" : "bg-gray-100 text-gray-500" + tool.bgHover + " group-hover:text-white"}`}>
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <div className={`font-bold text-sm font-display ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                                            {tool.label}
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
            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                <h4 className="font-bold text-orange-800 text-sm mb-2 font-display">
                    {activeTool === 'persona' && "Humanize Content Writer"}
                    {activeTool === 'email' && "Email Writer Mode"}
                    {activeTool === 'social' && "Social Media Mode"}
                </h4>
                <p className="text-xs text-orange-700/80 leading-relaxed font-[var(--font-metro)]">
                    {activeTool === 'persona' && "Our core algorithmic engine designed to humanize general content, essays, and articles while bypassing AI detection."}
                    {activeTool === 'email' && "Optimized for professional communication. Adds natural greetings, sign-offs, and polite hedging to ensure your emails sound genuinely human."}
                    {activeTool === 'social' && "Analysis for high-engagement platforms. Focuses on punchy sentence structures, emotional hooks, and authentic emoji usage."}
                </p>
            </div>
        </div>
    );
}
