
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PenTool, Palette, Building2, ShieldCheck, BookOpen, Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ToolNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    // Common link styles
    const linkBaseClass = "flex items-center gap-2 px-5 py-2.5 font-medium text-xs uppercase tracking-wider font-display transition-colors rounded-full";
    const activeClass = "bg-white shadow-sm text-orange-600 font-bold";
    const inactiveClass = "text-gray-500 hover:text-gray-900 dark:text-gray-900 hover:bg-white/50";

    return (
        <nav className="p-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between md:justify-center">

            {/* Left Logo - Absolute on Desktop, Relative on Mobile */}
            <div className="md:absolute md:left-6 flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 relative">
                        <Image src="/SH logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-lg font-display text-gray-900 hidden md:block">Scripthuman</span>
                </Link>
            </div>

            {/* Center Pills - Desktop Only */}
            <div className="hidden md:flex max-w-fit mx-auto bg-gray-100/50 p-1.5 rounded-full gap-1">
                <Link href="/writing-room" className={`${linkBaseClass} ${isActive('/writing-room') ? activeClass : inactiveClass}`}>
                    <PenTool size={14} />
                    Writing Room
                </Link>

                <Link href="/style-studio" className={`${linkBaseClass} ${isActive('/style-studio') ? activeClass : inactiveClass}`}>
                    <Palette size={14} />
                    Style Studio
                </Link>

                <Link href="/enterprise" className={`${linkBaseClass} ${isActive('/enterprise') ? activeClass : inactiveClass}`}>
                    <Building2 size={14} />
                    Enterprise Hub
                </Link>

                <Link href="/trust-hub" className={`${linkBaseClass} ${isActive('/trust-hub') ? activeClass : inactiveClass}`}>
                    <ShieldCheck size={14} />
                    Trust Hub
                </Link>
            </div>

            {/* Right Actions - Desktop Only */}
            <div className="hidden md:flex absolute right-6 items-center gap-3">
                <Link href="/dashboard/account" className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-900 font-medium text-xs uppercase tracking-wider font-display transition-colors rounded-full hover:bg-gray-100/50">
                    <User size={14} />
                    My Account
                </Link>
                <Link href="/documentation" className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-900 font-medium text-xs uppercase tracking-wider font-display transition-colors rounded-full hover:bg-gray-100/50">
                    <BookOpen size={14} />
                    DOCS
                </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden p-2 text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[73px] bg-white/95 backdrop-blur-md z-40 flex flex-col p-6 gap-4 md:hidden animate-in fade-in slide-in-from-top-10 duration-200 border-t border-gray-100">
                    <Link href="/dashboard/account" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-900 font-medium">
                        <User size={18} />
                        My Account
                    </Link>
                    <Link href="/writing-room" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 p-4 rounded-xl ${isActive('/writing-room') ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-700'}`}>
                        <PenTool size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">The Writing Room</span>
                    </Link>

                    <Link href="/style-studio" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 p-4 rounded-xl ${isActive('/style-studio') ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-700'}`}>
                        <Palette size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">Style Studio</span>
                    </Link>

                    <Link href="/enterprise" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 p-4 rounded-xl ${isActive('/enterprise') ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-700'}`}>
                        <Building2 size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">Enterprise Hub</span>
                    </Link>

                    <Link href="/trust-hub" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 p-4 rounded-xl ${isActive('/trust-hub') ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-700'}`}>
                        <ShieldCheck size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">Trust Hub</span>
                    </Link>

                    <Link href="/documentation" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 text-gray-500 mt-4">
                        <BookOpen size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">Documentation</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}
