"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ArrowRight, Loader2, Mail, CheckCircle, Smartphone, ShieldCheck, Zap } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [requireVerification, setRequireVerification] = useState(false);

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError(null);
        setRequireVerification(false);

        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            // Google accounts are completely verified by default
            if (!userCredential.user.emailVerified) {
                await sendEmailVerification(userCredential.user);
                await signOut(auth);
                if (userCredential.user.email) setEmail(userCredential.user.email);
                setRequireVerification(true);
                setLoading(false);
                return;
            }

            setSuccess(true);
            setLoading(false);
            // Read next parameter or default to /writing-room
            const searchParams = new URLSearchParams(window.location.search);
            const next = searchParams.get('next') || '/writing-room';
            window.location.href = next;
        } catch (error: any) {
            setError(error.message || "Failed to authenticate with Google");
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            await signOut(auth);

            setRequireVerification(true);
            setLoading(false);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setError("User already exists. Please sign in");
            } else {
                setError(error.message || "Failed to create an account");
            }
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
                    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-orange-500/30 rounded-full blur-[120px]" />
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
                        Join the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Human Vibe</span>
                    </h2>
                    <p className="text-gray-400 dark:text-white text-lg mb-8 leading-relaxed">
                        Create an account today to start sanitizing AI text, accessing premium modes, and restoring the human touch to your content.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Access Anywhere</h4>
                                <p className="text-xs text-gray-500 dark:text-white">Sanitize content on desktop, tablet, or mobile.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Free to Start</h4>
                                <p className="text-xs text-gray-500 dark:text-white">Get 30000 free words per month. No credit card required.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-gray-500 dark:text-white">
                    © 2026 Script Human. All rights reserved.
                </div>
            </div>

            {/* RIGHT COLUMN - SIGNUP FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                <div className="w-full max-w-[420px] space-y-8">

                    <div className="text-center flex flex-col items-center">
                        <Link href="/" className="lg:hidden mb-8 flex items-center gap-2">
                            <div className="w-10 h-10 relative">
                                <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white font-display">Scripthuman</span>
                        </Link>

                        {/* Logo for desktop view right side */}
                        <div className="hidden lg:flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 relative">
                                <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white font-display">Scripthuman</span>
                        </div>

                        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Create an account</h1>
                        <p className="text-gray-500 dark:text-white mt-3">Start humanizing your content today.</p>
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
                            <Link
                                href="/login"
                                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold font-display transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Login
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-5">

                            <button
                                type="button"
                                className="w-full py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                onClick={handleGoogleSignup}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign up with Google
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

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    minLength={6}
                                />
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
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-400 dark:text-white text-center px-4 leading-relaxed">
                                By clicking &quot;Create Account&quot;, you agree to our <Link href="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-300">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</Link>.
                            </p>
                        </form>
                    )}

                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-white">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
