"use client";

import { useState} from"react";
import { motion} from"framer-motion";
import { CheckCircle, Loader2, Lock} from"lucide-react";

export default function PaymentForm({ planPrice, planName, onSuccess}: { planPrice: string, planName: string, onSuccess: () => void}) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
            onSuccess();
       }, 1500);
   };

    if (success) {
        return (
            <div className="text-center py-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0}}
                    animate={{ scale: 1, opacity: 1}}
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">Subscription Successful!</h3>
                <p className="text-gray-500 dark:text-white text-sm font-[var(--font-metro)]">Thank you for subscribing to the {planName}.</p>
                <p className="text-xs text-gray-400 dark:text-white mt-2">Redirecting to dashboard...</p>
            </div>
        );
   }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-6">
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Subscribe Now
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-white">
                <Lock size={12} />
                <span>Payments are secure and encrypted.</span>
            </div>
        </form>
    );
}
