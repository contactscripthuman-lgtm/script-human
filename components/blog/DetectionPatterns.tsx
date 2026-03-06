import React from 'react';
import { Search, Zap, Fingerprint, ShieldCheck} from 'lucide-react';

export default function DetectionPatterns() {
    return (
        <div className="my-12 bg-gray-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-all duration-700"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
                    <Search className="text-orange-500" />
                    <h3 className="text-xl font-bold font-display">How AI Detectors Catch You</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Item 1 */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="text-blue-400" />
                        </div>
                        <h4 className="font-bold mb-2 text-lg">Low Perplexity</h4>
                        <p className="text-sm text-gray-400 dark:text-white leading-relaxed">
                            AI writes predictably. If your text is too &quot;smooth&quot; and statistically probable, it gets flagged.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Fingerprint className="text-purple-400" />
                        </div>
                        <h4 className="font-bold mb-2 text-lg">Lack of Burstiness</h4>
                        <p className="text-sm text-gray-400 dark:text-white leading-relaxed">
                            Humans vary sentence length. AI writes in a monotone rhythm. Monotony = Robot.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheck className="text-green-400" />
                        </div>
                        <h4 className="font-bold mb-2 text-lg">Watermarks</h4>
                        <p className="text-sm text-gray-400 dark:text-white leading-relaxed">
                            Hidden statistical patterns embedded by LLMs like ChatGPT to identify their own output.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400 dark:text-white">
                        <span className="text-orange-500 font-bold">The Solution:</span> Scripthuman breaks these patterns using Forensic Humanization.
                    </p>
                </div>
            </div>
        </div>
    );
}
