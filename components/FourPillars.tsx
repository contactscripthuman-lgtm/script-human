import { BarChart3, ShieldCheck, Zap, Code2} from"lucide-react";

const pillars = [
    { name:"Vibe Audit", icon: BarChart3, color:"text-indigo-500"},
    { name:"Brand Guardrails", icon: ShieldCheck, color:"text-emerald-500"},
    { name:"The Injector", icon: Zap, color:"text-orange-500"},
    { name:"API Access", icon: Code2, color:"text-blue-500"},
];

export default function FourPillars() {
    return (
        <div className="flex flex-col items-center gap-6 py-10">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-white uppercase mb-4">The Four Pillars</h3>
            <div className="flex flex-wrap justify-center gap-4">
                {pillars.map((p) => (
                    <div key={p.name} className="group flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-md transition-all cursor-default">
                        <div className={`p-1.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                            <p.icon className={`w-3.5 h-3.5 ${p.color}`} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-white">{p.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
