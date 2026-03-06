"use client";

import * as React from"react";
import { Moon, Sun} from"lucide-react";
import { useTheme} from"next-themes";

export function ThemeToggle() {
    const { setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true);
   }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center animate-pulse" />
        );
   }

    const isDark = resolvedTheme ==="dark";

    return (
        <button
            onClick={() => setTheme(isDark ?"light" :"dark")}
            className="relative w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
