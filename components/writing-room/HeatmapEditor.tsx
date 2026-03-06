"use client";

import { HeatmapData} from"@/lib/writing-room/detection";

export default function HeatmapEditor({ data}: { data: HeatmapData[]}) {
    const getheatColor = (heat: number) => {
        if (heat <= 0) return"bg-transparent";
        if (heat <= 20) return"bg-orange-100/30"; // Very Natural
        if (heat <= 40) return"bg-orange-100"; // Somewhat Natural
        if (heat <= 60) return"bg-orange-200"; // Neutral
        if (heat <= 80) return"bg-purple-200"; // Somewhat Robotic
        return"bg-purple-300 text-purple-900 font-bold"; // Very Robotic
   };

    return (
        <div className="w-full min-h-[300px] p-6 bg-white rounded-2xl border border-gray-100 shadow-inner font-[var(--font-metro)] text-lg leading-relaxed flex flex-wrap content-start gap-1">
            {data.map((item, i) => (
                <span key={i} className={`px-0.5 rounded ${getheatColor(item.heat)} transition-colors duration-500`}>
                    {item.word}
                </span>
            ))}
        </div>
    );
}
