"use client";

import { User, Settings, Key, LogOut, ChevronRight, Shield} from"lucide-react";
import Link from"next/link";
import Navbar from"@/components/Navbar";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-metro)]">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">Account Settings</h1>
                    <p className="text-gray-500 dark:text-white">Manage your account preferences and access.</p>
                </div>

                <div className="grid gap-6">
                    {/* Developer Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                                <Key size={18} className="text-indigo-500" /> Developer
                            </h3>
                        </div>
                        <div className="p-2">
                            <Link href="/dashboard/settings/api-keys" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                        <Key size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">API Keys</h4>
                                        <p className="text-sm text-gray-500 dark:text-white">Manage API keys for external access</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-300 dark:text-white group-hover:text-indigo-500 transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Profile & Security (Placeholder) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-75">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                                <User size={18} className="text-gray-500 dark:text-white" /> Profile & Security
                            </h3>
                        </div>
                        <div className="p-6 text-center text-gray-400 dark:text-white">
                            <p>More settings coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
