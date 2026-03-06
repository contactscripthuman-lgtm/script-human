"use client";

import Navbar from"@/components/Navbar";
import VerifyCertificate from"@/components/trust-hub/VerifyCertificate";

export default function VerifyPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 font-[family-name:var(--font-metro)]">
            <Navbar />
            <div className="pt-20">
                <VerifyCertificate />
            </div>
        </div>
    );
}
