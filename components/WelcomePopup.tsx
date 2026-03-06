"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { UserCheck } from "lucide-react";

export default function WelcomePopup() {
    const { user, loading } = useAuth();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            // Check if we already showed it this session
            const hasShown = sessionStorage.getItem("welcome_shown");
            if (!hasShown) {
                setShow(true);
                sessionStorage.setItem("welcome_shown", "true");
                setTimeout(() => {
                    setShow(false);
                }, 3000); // Fades out after 3 seconds
            }
        }
    }, [user, loading]);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 pr-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCheck size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 font-display text-lg">Welcome Back!</h4>
                    <p className="text-sm text-gray-500 font-medium">Glad to see you again.</p>
                </div>
            </div>
        </div>
    );
}
