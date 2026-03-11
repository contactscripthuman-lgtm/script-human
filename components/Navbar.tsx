
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Moon, Sun, User, ChevronDown, LogOut, Settings, ShieldCheck, LayoutDashboard, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ThemeToggle } from "@/components/ThemeToggle";

import { useFreeTier } from "@/hooks/use-free-tier";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user } = useAuth();
    const { currentTier, hasProAccess } = useFreeTier();
    const pathname = usePathname();

    // Close profile menu when route changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsProfileOpen(false);
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100/50 dark:border-slate-800/50 p-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo & Badge Group */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 z-50 relative">
                            <div className="w-8 h-8 relative">
                                <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white font-display">Scripthuman</span>
                        </Link>

                        {/* Badge moved here */}
                        <div className="hidden md:flex bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 items-center gap-2">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-white">SH Engine V2 Live</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4 items-center">
                        <Link href="/how-to-use" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mr-2">
                            <BookOpen size={16} />
                            How To Use
                        </Link>

                        {/* Dark Mode Toggle */}
                        <ThemeToggle />

                        {/* Auth Logic: Account if logged in, Get Started otherwise */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(true)}
                                    className="flex items-center gap-2 py-2 px-1 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors border border-primary-100">
                                        <User size={18} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white hidden lg:block hover:text-gray-900 transition-colors">My Account</span>
                                    <ChevronDown size={14} className="text-gray-400 dark:text-white" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/signup" className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
                                Get Started
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden z-50 relative p-2 text-gray-900 dark:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                            <div className="flex flex-col items-center gap-6 text-center">
                                <div className="bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 flex items-center gap-2 mb-4">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 dark:text-white">SH Engine V2 Live</span>
                                </div>

                                {user ? (
                                    <Link
                                        href="/dashboard/account"
                                        className="text-lg font-medium text-gray-600 dark:text-white hover:text-gray-900 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                ) : (
                                    <Link
                                        href="/signup"
                                        className="text-xl font-semibold text-gray-900 dark:text-white hover:text-secondary-600 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                )}

                                <Link
                                    href="/how-to-use"
                                    className="flex items-center gap-3 mt-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <BookOpen size={20} className="text-indigo-500" />
                                    How To Use
                                </Link>

                                {/* Theme Toggle in Mobile Menu */}
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700 dark:text-white">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Right-Side Drawer for Account */}
            {isProfileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
                        onClick={() => setIsProfileOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 animate-in slide-in-from-right p-6 border-l border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-900 font-display">Account</h2>
                            <button
                                onClick={() => setIsProfileOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* User Info */}
                        {user && (
                            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                                        <User size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                        <p className="text-xs text-gray-500 capitalize">{currentTier} Plan</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Menu Items */}
                        <div className="space-y-2 flex-1">
                            {(!hasProAccess) && (
                                <button onClick={async () => {
                                    try {
                                        const res = await fetch('/api/stripe/checkout', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro', uid: user?.uid })
                                        });
                                        const data = await res.json();
                                        if (data.url) window.location.href = data.url;
                                    } catch (e) { console.error(e) }
                                }} className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-xl transition-colors group mb-2 border border-orange-100 w-full text-left">
                                    <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                    </div>
                                    <span className="font-bold">Upgrade to Pro</span>
                                </button>
                            )}

                            <Link href="/dashboard/account" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                                <Settings size={18} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                                <span className="font-medium">Account Settings</span>
                            </Link>
                            <Link href="/verify" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                                <ShieldCheck size={18} className="text-gray-400 group-hover:text-secondary-500 transition-colors" />
                                <span className="font-medium">Verify Certificate</span>
                            </Link>
                        </div>

                        {/* Footer / Logout */}
                        <div className="pt-6 border-t border-gray-100 mt-auto">
                            <button
                                onClick={async () => {
                                    await signOut(auth);
                                    setIsProfileOpen(false);
                                    window.location.href = "/";
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="font-bold text-sm">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}
