import type { Config } from "tailwindcss";

import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // ScriptHuman Brand Colors
                primary: {
                    DEFAULT: "#F97316", // Orange-500
                    50: "#FFF7ED",
                    100: "#FFEDD5",
                    200: "#FED7AA",
                    300: "#FDBA74",
                    400: "#FB923C",
                    500: "#F97316",
                    600: "#EA580C",
                    700: "#C2410C",
                    800: "#9A3412",
                    900: "#7C2D12",
                },
                secondary: {
                    DEFAULT: "#10B981", // Emerald-500
                    50: "#ECFDF5",
                    100: "#D1FAE5",
                    200: "#A7F3D0",
                    300: "#6EE7B7",
                    400: "#34D399",
                    500: "#10B981",
                    600: "#059669",
                    700: "#047857",
                    800: "#065F46",
                    900: "#064E3B",
                },
            },
            fontFamily: {
                sans: ["var(--font-dm-sans)", "sans-serif"],
                display: ["var(--font-dm-sans)", "sans-serif"],
                metro: ["var(--font-dm-sans)", "sans-serif"], // Alias for backward compatibility
            },
            keyframes: {
                aurora: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
            animation: {
                aurora: "aurora 10s ease infinite",
            },
        },
    },
    plugins: [tailwindAnimate],
};
export default config;
