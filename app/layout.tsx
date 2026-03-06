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
};

import ChatBot from "@/components/ChatBot";
import ComplianceOverlay from "@/components/ComplianceOverlay";
import AuthProvider from "@/components/AuthProvider";
import WelcomePopup from "@/components/WelcomePopup";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

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
            <WelcomePopup />
          </AuthProvider>

          <ComplianceOverlay />
          <ChatBot />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
