
import { Crown} from"lucide-react";
import HelpTooltip from"@/components/writing-room/HelpTooltip";

export default function PremiumLock({ tooltip ="Premium Feature"}: { tooltip?: string}) {
    return (
        <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white p-1.5 rounded-full shadow-md border-2 border-white">
                <Crown size={12} fill="currentColor" />
            </div>
        </div>
    );
}
