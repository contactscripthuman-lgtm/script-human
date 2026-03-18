import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: "variable", // Use variable font
});

export const metadata: Metadata = {
  title: "ScriptHuman - AI Content Humanization & Trust Verification",
  description: "Transform AI-generated content into authentic human writing. Verify content authenticity with forensic analysis and media detection.",
  metadataBase: new URL('https://www.scripthuman.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'ScriptHuman | AI Content Humanization & Trust Verification',
    description: 'Transform AI-generated content into authentic human writing. Verify content authenticity with forensic analysis and media detection.',
    url: 'https://www.scripthuman.com',
    siteName: 'ScriptHuman',
    images: [
      {
        url: 'https://www.scripthuman.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
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
