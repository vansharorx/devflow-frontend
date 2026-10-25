import { Activity, FolderKanban, Bug, CheckCircle } from "lucide-react";

export default function RecentActivity({ activities = [] }) {
    const getIconBadge = (action = "") => {
        const value = action.toLowerCase();

        if (value.includes("project")) {
            return (
                <div className="p-1.5 bg-[#00D2FF] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                    <FolderKanban size={16} strokeWidth={2.5} />
                </div>
            );
        }

        if (value.includes("closed")) {
            return (
                <div className="p-1.5 bg-[#00E676] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                    <CheckCircle size={16} strokeWidth={2.5} />
                </div>
            );
        }

        if (value.includes("issue")) {
            return (
                <div className="p-1.5 bg-[#FF5E7E] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                    <Bug size={16} strokeWidth={2.5} />
                </div>
            );
        }

        return (
            <div className="p-1.5 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                <Activity size={16} strokeWidth={2.5} />
            </div>
        );
    };

    return (
        <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6 h-[440px] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#FFE600] border border-black inline-block"></span>
                    Recent Activity
                </h2>
                <span className="font-mono text-xs text-gray-500 font-bold">
                    // REAL-TIME FEED
                </span>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-[#FFFDF8] border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 transition-all"
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {getIconBadge(activity.action)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-mono font-bold text-black text-xs sm:text-sm truncate">
                                    {activity.action}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="bg-black text-white px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase">
                                        {activity.entity_type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center font-mono text-xs text-gray-500">
                        // No recent system activity logged
                    </div>
                )}
            </div>
        </div>
    );
}
