"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ArrowRight, Loader2, Mail, CheckCircle, Smartphone, ShieldCheck, Zap, FileCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [requireVerification, setRequireVerification] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        setRequireVerification(false);

        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                if (userCredential.user.email) setEmail(userCredential.user.email);
                setRequireVerification(true);
                setLoading(false);
                return;
            }

            setSuccess(true);
            setLoading(false);
            const searchParams = new URLSearchParams(window.location.search);
            const next = searchParams.get('next') || '/writing-room';
            window.location.href = next;
        } catch (error: any) {
            setError(error.message || "Failed to authenticate with Google");
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRequireVerification(false);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                setRequireVerification(true);
                setLoading(false);
                return;
            }
            setSuccess(true);
            setLoading(false);
            const searchParams = new URLSearchParams(window.location.search);
            const next = searchParams.get('next') || '/writing-room';
            window.location.href = next;
        } catch (error: any) {
            setError("Email or password is incorrect");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 flex font-[family-name:var(--font-metro)]">

            {/* LEFT COLUMN - BRANDING/MARKETING */}
            <div className="hidden lg:flex w-1/2 bg-[#111827] relative overflow-hidden flex-col justify-between p-12 text-white">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-indigo-500/30 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-purple-500/30 rounded-full blur-[120px]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 relative brightness-0 invert">
                            <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight font-display">Scripthuman</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg mb-12">
                    <h2 className="text-5xl font-bold font-display leading-tight mb-6">
                        Restore the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Human Vibe</span>
                    </h2>
                    <p className="text-gray-400 dark:text-white text-lg mb-8 leading-relaxed">
                        Join thousands of writers, students, and professionals using Script Human to sanitize AI text and bypass detection with confidence.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Enterprise-Grade Security</h4>
                                <p className="text-xs text-gray-500 dark:text-white">Your content is processed securely and never stored.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Real-time Humanization</h4>
                                <p className="text-xs text-gray-500 dark:text-white">Get undetectable results in milliseconds.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                <FileCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Humanized Certificate</h4>
                                <p className="text-xs text-gray-500 dark:text-white">We provide a certificate of humanization for your content.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-gray-500 dark:text-white">
                    © 2026 Script Human. All rights reserved.
                </div>
            </div>

            {/* RIGHT COLUMN - LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                <div className="w-full max-w-[420px] space-y-8">

                    <div className="text-center flex flex-col items-center">
                        <Link href="/" className="lg:hidden mb-8 flex items-center gap-2">
                            <div className="w-10 h-10 relative">
                                <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white font-display">Scripthuman</span>
                        </Link>

                        {/* Logo for desktop view right side matches user mock */}
                        <div className="hidden lg:flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 relative">
                                <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white font-display">Scripthuman</span>
                        </div>

                        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Sign in to Script Human</h1>
                        <p className="text-gray-500 dark:text-white mt-3">Welcome back! Please enter your details.</p>
                    </div>

                    {requireVerification ? (
                        <div className="bg-orange-50 dark:bg-slate-800 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 border border-orange-100 dark:border-slate-700">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-display">Verify your email</h3>
                            <p className="text-gray-600 dark:text-white mb-8 leading-relaxed">
                                We have sent you a verification email to <span className="font-bold text-gray-900 dark:text-white">{email}</span>. Please verify it and log in.
                            </p>
                            <button
                                onClick={() => setRequireVerification(false)}
                                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold font-display transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Login
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Placeholder for Google (Visual only as requested"create like this") 
                        In a real scenario, this would trigger supabase.auth.signInWithOAuth 
                    */}
                            <button
                                type="button"
                                className="w-full py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
                                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-gray-400 dark:text-white uppercase tracking-widest">or continue with email</span>
                                <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                            </div>

                            {/* Password placeholder to match image (Visual only) */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <div className="text-right mt-2">
                                    <button type="button" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">Forgot password?</button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold font-display transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Sending Link...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-white">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
