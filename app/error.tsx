"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 font-[family-name:var(--font-metro)]">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <AlertTriangle className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                    Something went wrong!
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10">
                    We've encountered an unexpected error. Our team has been notified and we're working on a fix.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 text-gray-900 dark:text-white font-bold rounded-xl transition-all active:scale-95"
                    >
                        Return Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
