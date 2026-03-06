"use client";

import { motion} from"framer-motion";
import { PulseData} from"@/lib/writing-room/detection";

export default function PulseVisualizer({ data}: { data: PulseData[]}) {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-32 bg-gray-50 rounded-xl p-4 flex items-end gap-1 overflow-x-auto overflow-y-hidden border border-gray-100">
            {data.map((bar, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0}}
                    animate={{ height:`${bar.height}%`}}
                    transition={{ duration: 0.5, delay: i * 0.02}}
                    className={`w-2 rounded-t-sm min-w-[8px] ${bar.isRobotic ?"bg-purple-400 opacity-80" :"bg-orange-400 opacity-80"
                       }`}
                    title={`${bar.length} words (${bar.isRobotic ?"Robotic Length" :"Natural"})`}
                />
            ))}
        </div>
    );
}
