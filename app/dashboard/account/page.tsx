"use client";

import { useState } from "react";
import { Settings, CreditCard, Shield, ChevronDown, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useAuth } from "@/components/AuthProvider";
import { useFreeTier } from "@/hooks/use-free-tier";
import { updatePassword } from "firebase/auth";

export default function AccountPage() {
    const { wordsUsed, wordsLimit, timeUntilReset } = useUsageLimits();
    const { user } = useAuth();
    const { currentTier, isPremium } = useFreeTier();

    // Security Section State
    const [isSecurityOpen, setIsSecurityOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!user) {
            setMessage({ type: 'error', text: "You must be logged in to update your password." });
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords do not match." });
            setLoading(false);
            return;
        }

        try {
            await updatePassword(user, newPassword);
            setMessage({ type: 'success', text: "Password updated successfully!" });
            setNewPassword("");
            setConfirmPassword("");
            setLoading(false);
        } catch (error: any) {
            console.error("Password update error:", error);
            let errorMessage = "Failed to update password. Please try again.";
            if (error.code === 'auth/requires-recent-login') {
                errorMessage = "For security reasons, please log out and log back in before updating your password.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            setMessage({ type: 'error', text: errorMessage });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-metro)]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">My Account</h1>
                    <p className="text-gray-500 dark:text-white">Manage your subscription, billing, and preferences.</p>
                </div>

                <div className="grid gap-8">
                    {/* 1. Subscription & Usage Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                                <CreditCard size={18} className="text-indigo-500" /> Subscription & Usage
                            </h3>
                        </div>
                        <div className="p-6">
                            {/* Plan Details */}
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-indigo-900">Current Plan</h4>
                                        <div className="text-sm text-indigo-600/80 font-medium">{currentTier} Tier</div>
                                    </div>
                                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">Active</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5 font-medium">
                                            <span className="text-gray-600 dark:text-white">Daily Word Usage</span>
                                            {isPremium ? (
                                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                                    <Check size={14} strokeWidth={3} /> Unlimited
                                                </span>
                                            ) : (
                                                <span className="text-indigo-600">{wordsUsed.toLocaleString()} / {wordsLimit.toLocaleString()}</span>
                                            )}
                                        </div>

                                        {!isPremium && (
                                            <div className="w-full bg-indigo-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((wordsUsed / wordsLimit) * 100, 100)}%` }}
                                                />
                                            </div>
                                        )}

                                        {!isPremium ? (
                                            <p className="text-xs text-gray-400 dark:text-white mt-1.5 flex items-center gap-1">
                                                Resets in: <span className="font-semibold text-gray-500 dark:text-white">{timeUntilReset.hours}h {timeUntilReset.minutes}m</span> (Daily Limit)
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-400 dark:text-white mt-1.5 text-emerald-600/80">
                                                You have unlimited access to all tools.
                                            </p>
                                        )}
                                    </div>

                                    {!isPremium && (
                                        <Link href="/#pricing" className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-200">
                                            Upgrade Plan
                                        </Link>
                                    )}
                                </div>
                            </div>


                        </div>
                    </section>

                    {/* 2. Account Settings Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                                <Settings size={18} className="text-gray-500 dark:text-white" /> Account Settings
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-50">


                            {/* Expandable Security Section */}
                            <div className="flex flex-col transition-all duration-300">
                                <button
                                    onClick={() => setIsSecurityOpen(!isSecurityOpen)}
                                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group w-full text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSecurityOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600 dark:text-white group-hover:bg-gray-200 group-hover:text-gray-900'}`}>
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">Security & Password</h4>
                                            <p className="text-sm text-gray-500 dark:text-white">Update your password</p>
                                        </div>
                                    </div>
                                    <div className={`transition-transform duration-300 ${isSecurityOpen ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={20} className="text-gray-300 dark:text-white group-hover:text-gray-500" />
                                    </div>
                                </button>

                                {/* Dropdown Content */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSecurityOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 bg-gray-50/30 border-t border-gray-50">
                                        <div className="mt-6 max-w-md">
                                            {message && (
                                                <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                                    }`}>
                                                    {message.type === 'success' ? <Check size={18} className="mt-0.5" /> : <AlertCircle size={18} className="mt-0.5" />}
                                                    <p className="text-sm font-medium">{message.text}</p>
                                                </div>
                                            )}

                                            <form onSubmit={handlePasswordUpdate} className="space-y-5">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-white mb-1.5">New Password</label>
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
                                                        placeholder="Enter new password"
                                                        required
                                                        minLength={6}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-white mb-1.5">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
                                                        placeholder="Confirm new password"
                                                        required
                                                        minLength={6}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                >
                                                    {loading ? 'Updating...' : 'Update Password'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
