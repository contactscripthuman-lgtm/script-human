"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 font-[family-name:var(--font-metro)]">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <Search className="w-12 h-12" />
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 dark:text-white mb-6">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Page not found
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
