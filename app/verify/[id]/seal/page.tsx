"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Loader2, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CertificateData {
    id: string;
    score: number;
    wordCount: number;
    timestamp: string;
    verified: boolean;
}

export default function EmbedSealPage() {
    const params = useParams();
    const id = params?.id as string;

    if (!id) {
        return (
            <div className="flex items-center justify-center h-full min-h-[100px] bg-white rounded-lg border border-gray-100">
                <Loader2 size={24} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <a
            href={`${typeof window !== 'undefined' ? window.location.origin : 'https://scripthuman.com'}/verify/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full h-full"
            style={{ textDecoration: 'none' }}
        >
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full box-border">
                {/* Shield Icon */}
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                    <ShieldCheck size={20} className="text-emerald-500" />
                </div>

                {/* Text Info */}
                <div className="flex flex-col flex-1 overflow-hidden font-sans">
                    <div className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-1">
                        Script Human Verified Badge
                    </div>
                    <div className="text-[10px] text-gray-500 leading-tight">
                        Content is verified by ScriptHuman engine
                    </div>
                    <div className="text-[9px] font-bold text-emerald-600 mt-1 truncate font-mono bg-emerald-50 px-1 py-0.5 rounded w-fit">
                        ID: {id}
                    </div>
                </div>
            </div>
        </a>
    );
}
