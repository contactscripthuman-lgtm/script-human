import { Wand2, Shield, MessageSquare} from"lucide-react";

const features = [
    {
        title:"Natural Flow",
        desc:"Advanced linguistics algorithms rewrite rigid sentences into flowing, rhythmic prose that feels genuinely human.",
        icon: Wand2,
        bg:"bg-indigo-50 dark:bg-indigo-900/30",
        iconColor:"text-indigo-500",
   },
    {
        title:"AI Detection Proof",
        desc:"Bypass the most sophisticated AI detectors with text that mimics individual personality and emotional nuance.",
        icon: Shield,
        bg:"bg-orange-50 dark:bg-orange-900/30",
        iconColor:"text-orange-500",
   },
    {
        title:"Tone Injection",
        desc:"Inject humor, sarcasm, empathy, or professional gravitas with precision-tuned brand guardrails.",
        icon: MessageSquare,
        bg:"bg-teal-50 dark:bg-teal-900/30",
        iconColor:"text-teal-500",
   },
];

export default function FeaturesGrid() {
    return (
        <div id="features" className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100/50 dark:border-slate-800 mt-12 bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm rounded-t-[3rem]">
            {features.map((f) => (
                <div key={f.title} className="space-y-4 p-4">
                    <div className={`w-12 h-12 rounded-full ${f.bg} flex items-center justify-center mb-4`}>
                        <f.icon className={`w-5 h-5 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{f.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-white leading-relaxed font-medium">
                        {f.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}
