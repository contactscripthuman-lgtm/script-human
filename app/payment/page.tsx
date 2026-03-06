"use client";

import { useSearchParams, useRouter} from"next/navigation";
import { Suspense, useState, useEffect} from"react";
import ToolNavbar from"@/components/ToolNavbar";
import Footer from"@/components/Footer"; // Assuming basic footer exists
import PaymentForm from"@/components/PaymentForm";
import { Check, Shield} from"lucide-react";

// Wrap content in Suspense for useSearchParams
function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planParam = searchParams.get("plan");
    const [isUpsellView, setIsUpsellView] = useState(false);

    // Default to 'Pro' if no plan specified, or parse params
    const [selectedPlan, setSelectedPlan] = useState({
        name:"Pro Plan",
        price:"19.99",
        period:"/month",
        features: [
           "Unlimited Writing Room",
           "Advanced Humanization",
           "Multi-layer Analysis",
           "Full Style Studio Access"
        ]
   });

    useEffect(() => {
        if (planParam === 'enterprise') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setSelectedPlan({
                name:"Enterprise",
                price:"39.00",
                period:"/month",
                features: [
                   "Everything in Pro",
                   "Custom Voice Clones",
                   "Brand Guardrails API",
                   "API Dashboard Access",
                   "Unlimited API Generation",
                   "Advanced Security"
                ]
           });
            setIsUpsellView(false);
       } else if (planParam === 'certificate') {
            setSelectedPlan({
                name:"Certificate Plan",
                price:"6.99",
                period:"/month",
                features: ["Unlimited Certificate Generation","Embeddable Trust Seals","Verifiable Links","PDF Downloads"]
           });
            setIsUpsellView(true);
       } else {
            // Default to Pro
            setSelectedPlan({
                name:"Pro Plan",
                price:"19.99",
                period:"/month",
                features: [
                   "Unlimited Writing Room",
                   "Advanced Humanization",
                   "Multi-layer Analysis",
                   "Full Style Studio Access"
                ]
           });
            setIsUpsellView(false);
       }
   }, [planParam]);

    const handleSuccess = () => {
        // Redirect after delay
        setTimeout(() => {
            router.push('/writing-room'); // Or dashboard
       }, 2000);
   };

    const switchToPro = () => {
        setSelectedPlan({
            name:"Pro Plan",
            price:"19.99",
            period:"/month",
            features: [
               "Unlimited Writing Room",
               "Advanced Humanization",
               "Multi-layer Analysis",
               "Full Style Studio Access"
            ]
       });
        // We keep isUpsellView true to show the comparison, but Pro is selected
        // Or we could turn it off to show the"focused" view. 
        // Let's keep the comparison view active so they can switch back if needed, 
        // OR better yet, update the UI to reflect the new selection.
   };

    const switchToCertificate = () => {
        setSelectedPlan({
            name:"Certificate Plan",
            price:"6.99",
            period:"/month",
            features: ["Unlimited Certificate Generation","Embeddable Trust Seals","Verifiable Links","PDF Downloads"]
       });
   }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">

            {/* Upsell Header / Comparison */}
            {isUpsellView && (
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6 font-display text-center">Choose the Best Value</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

                        {/* Certificate Card */}
                        <div
                            onClick={switchToCertificate}
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${selectedPlan.name.includes("Certificate") ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg dark:text-white">Certificate Only</h3>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan.name.includes("Certificate") ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-slate-600'}`}>
                                    {selectedPlan.name.includes("Certificate") && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white mb-2">$6.99 <span className="text-sm font-medium text-gray-500 dark:text-white">/month</span></div>
                            <p className="text-sm text-gray-500 dark:text-white mb-4">Unlimited certificates for your content.</p>
                            <ul className="text-sm space-y-2 dark:text-white">
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> Unlimited Certificates</li>
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> Embeddable Trust Seals</li>
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> No access to writing tools</li>
                            </ul>
                        </div>

                        {/* Pro Upsell Card */}
                        <div
                            onClick={switchToPro}
                            className={`cursor-pointer p-6 rounded-2xl border-2 relative transition-all ${selectedPlan.name ==="Pro Plan" ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/20 shadow-lg scale-105' : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500'}`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                RECOMMENDED
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg dark:text-white">Pro Plan</h3>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan.name ==="Pro Plan" ? 'border-orange-500 bg-orange-500' : 'border-gray-300 dark:border-slate-600'}`}>
                                    {selectedPlan.name ==="Pro Plan" && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white mb-2">$19.99 <span className="text-sm font-medium text-gray-500 dark:text-white">/month</span></div>
                            <p className="text-sm text-gray-500 dark:text-white mb-4">Unlock unlimited access to all tools + certificates.</p>
                            <ul className="text-sm space-y-2 dark:text-white">
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> <b>Unlimited</b> Certificates</li>
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> Advanced Humanization</li>
                                <li className="flex gap-2"><Check size={14} className="text-green-500" /> Multi-layer Analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-start">
                <div className="w-full max-w-md bg-gray-50 dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 transition-all duration-300 shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-white text-sm font-bold uppercase tracking-wider font-display">Order Summary</p>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-display">{selectedPlan.name}</h2>
                        </div>
                    </div>

                    <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black text-gray-900 dark:text-white font-display">{selectedPlan.price.startsWith('$') ? selectedPlan.price :`$${selectedPlan.price}`}</span>
                            <span className="text-gray-500 dark:text-white font-medium font-[var(--font-metro)]">{selectedPlan.period}</span>
                        </div>
                        <p className="text-gray-500 dark:text-white mt-2 font-[var(--font-metro)] text-sm">
                            {selectedPlan.period.includes('month') ? 'Billed monthly. Cancel anytime.' : 'One-time payment.'}
                        </p>
                    </div>

                    <div className="mb-8 border-b border-gray-200 dark:border-slate-700 pb-8">
                        <p className="font-bold text-gray-900 dark:text-white mb-4 font-display">What&apos;s included:</p>
                        <ul className="space-y-3">
                            {selectedPlan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-white font-[var(--font-metro)]">
                                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                                        <Check size={12} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <PaymentForm
                            planName={selectedPlan.name}
                            planPrice={selectedPlan.price}
                            onSuccess={handleSuccess}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-900">
            <ToolNavbar />
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center dark:text-white">Loading...</div>}>
                <PaymentContent />
            </Suspense>
            {/* Minimal footer or standard footer */}
            <div className="border-t border-gray-100 dark:border-slate-800 mt-12 py-8 text-center text-gray-400 dark:text-white text-sm">
                <p>&copy; {new Date().getFullYear()} ScriptHuman. All rights reserved.</p>
            </div>
        </main>
    );
}
