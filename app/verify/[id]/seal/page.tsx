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
    const id = params.id as string;
    const [data, setData] = useState<CertificateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // In a real implementation, you would fetch this data from your API
        // For now, we simulate a successful fetch if the ID exists
        // You might want to actually call /api/trust-hub/certify?id={id} if you have that endpoint
        if (id) {
            // Simulating API call delay
            setTimeout(() => {
                // Mock data - in production, replace with real fetch
                setData({
                    id: id,
                    score: 98.5, // You'd ideally fetch the real score
                    wordCount: 1250,
                    timestamp: new Date().toISOString(),
                    verified: true
                });
                setLoading(false);
            }, 500);
        } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setError(true);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[100px] bg-white rounded-lg border border-gray-100">
                <Loader2 size={24} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center h-full min-h-[100px] bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-400 dark:text-white text-xs font-bold uppercase">
                    <AlertTriangle size={14} />
                    Invalid Certificate
                </div>
            </div>
        );
    }

    return (
        <a
            href={`${typeof window !== 'undefined' ? window.location.origin : 'https://scripthuman.com'}/verify/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-[300px]">
                {/* Shield Icon */}
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                    <ShieldCheck size={24} className="text-emerald-500" />
                </div>

                {/* Text Info */}
                <div className="flex flex-col">
                    <div className="text-[10px] font-bold text-gray-400 dark:text-white uppercase tracking-wider mb-0.5 flex items-center gap-1">
                        Script Human Verified
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-900 dark:text-white">{data.score}%</span>
                        <span className="text-xs font-bold text-emerald-600">HUMAN</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
