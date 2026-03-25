import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: "variable", // Use variable font
});

export const metadata: Metadata = {
  title: 'ScriptHuman | #1 Advanced AI Content Humanizer Tool - For Free',
  description: 'ScriptHuman uses advanced algorithms to analyze and humanize AI-generated content, making it indistinguishable from human writing while maintaining authenticity. The #1 Advanced AI Content Humanizer Tool for free.',
  metadataBase: new URL('https://www.scripthuman.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'ScriptHuman | #1 Advanced AI Content Humanizer Tool - For Free',
    description: 'ScriptHuman uses advanced algorithms to analyze and humanize AI-generated content, making it indistinguishable from human writing while maintaining authenticity.',
    url: 'https://www.scripthuman.com',
    siteName: 'ScriptHuman',
    images: [{ url: '/og-root.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalOverlays from "@/components/GlobalOverlays";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>

          <GlobalOverlays />
        </ThemeProvider>
      </body>
    </html>
  );
}
