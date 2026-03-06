import Link from"next/link";
import Image from"next/image";

export default function Footer() {
    return (
        <footer className="py-12 px-6 mt-20 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-white font-sans">

                {/* Left: Logo */}
                <div className="mb-8 md:mb-0">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/SH logo.png"
                                alt="Script Human Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white font-display">ScriptHuman</span>
                    </div>
                </div>

                {/* Middle: Links */}
                <div className="flex flex-col items-center gap-6 mb-8 md:mb-0 w-full md:w-auto">
                    {/* Row 1: Main Links */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-gray-600 dark:text-white">
                        <Link href="/writing-room" className="hover:text-secondary-600 transition-colors">Tools</Link>
                        <Link href="/blog" className="hover:text-secondary-600 transition-colors">Blog</Link>
                        <Link href="/about" className="hover:text-secondary-600 transition-colors">About Us</Link>
                        <Link href="/contact" className="hover:text-secondary-600 transition-colors">Contact Us</Link>
                    </div>
                    {/* Row 2: Legal Links */}
                    <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-white">
                        <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
                    </div>
                </div>

                {/* Right: Copyright */}
                <div className="text-xs text-gray-400 dark:text-white opacity-60">
                    © 2026 Scripthuman Engine. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
