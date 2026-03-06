import React from 'react';
import { Check, X, Star } from 'lucide-react';

export default function ComparisonTable() {
    return (
        <div className="my-12 overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800">
            <div className="bg-gray-900 dark:bg-slate-900 p-6 text-center">
                <h3 className="text-2xl font-black text-white font-display tracking-tight">
                    The 2026 Humanizer Showdown
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
                            <th className="p-4 py-6 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white w-1/4">Feature</th>
                            <th className="p-4 py-6 text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20 w-1/4 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                                Script Human
                                <span className="block text-[10px] text-orange-400 mt-1 font-normal normal-case">Forensic Engine</span>
                            </th>
                            <th className="p-4 py-6 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white w-1/4">
                                Quillbot
                                <span className="block text-[10px] text-gray-400 dark:text-white mt-1 font-normal normal-case">Paraphraser</span>
                            </th>
                            <th className="p-4 py-6 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white w-1/4">
                                Undetectable.ai
                                <span className="block text-[10px] text-gray-400 dark:text-white mt-1 font-normal normal-case">Remixer</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 font-[family-name:var(--font-metro)] text-sm lg:text-base">
                        {/* Row 1 */}
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-bold text-gray-900 dark:text-white">Bypass Success Rate</td>
                            <td className="p-4 font-bold text-green-600 dark:text-green-400 bg-orange-50/20 dark:bg-orange-900/10">
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="fill-green-600 text-green-600" />
                                    98.7%
                                </div>
                            </td>
                            <td className="p-4 text-red-500">45% (Fail)</td>
                            <td className="p-4 text-yellow-600">75% (Inconsistent)</td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-bold text-gray-900 dark:text-white">Readability Flow</td>
                            <td className="p-4 font-bold text-gray-900 dark:text-white bg-orange-50/20 dark:bg-orange-900/10">Human-Like</td>
                            <td className="p-4 text-gray-500 dark:text-white">Robotic / Choppy</td>
                            <td className="p-4 text-gray-500 dark:text-white">Often Incoherent</td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-bold text-gray-900 dark:text-white">Forensic Analysis</td>
                            <td className="p-4 bg-orange-50/20 dark:bg-orange-900/10">
                                <Check className="text-green-500" />
                            </td>
                            <td className="p-4">
                                <X className="text-red-300" />
                            </td>
                            <td className="p-4">
                                <X className="text-red-300" />
                            </td>
                        </tr>
                        {/* Row 4 */}
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-bold text-gray-900 dark:text-white">Email Mode</td>
                            <td className="p-4 bg-orange-50/20 dark:bg-orange-900/10">
                                <Check className="text-green-500" />
                            </td>
                            <td className="p-4">
                                <X className="text-red-300" />
                            </td>
                            <td className="p-4">
                                <X className="text-red-300" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
