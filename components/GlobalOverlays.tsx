"use client";

import { usePathname } from "next/navigation";
import ChatBot from "@/components/ChatBot";
import ComplianceOverlay from "@/components/ComplianceOverlay";
import WelcomePopup from "@/components/WelcomePopup";
import Footer from "@/components/Footer";

export default function GlobalOverlays() {
    const pathname = usePathname();

    // Do not render overlays on seal embed iframes
    if (pathname?.includes('/seal')) {
        return null;
    }

    return (
        <>
            <WelcomePopup />
            <ComplianceOverlay />
            <ChatBot />
            <Footer />
        </>
    );
}
