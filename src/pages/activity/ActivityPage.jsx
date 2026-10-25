import { useEffect, useState } from "react";
import { Activity, Clock } from "lucide-react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import { formatRelativeDate } from "../../utils/dateFormatter";
import api from "../../services/api";

export default function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await api.get("/activities");

            setActivities(
                res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            WORKSPACE // AUDIT LOG
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Activity Timeline
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        {activities.length} Recorded Events
                    </span>
                </div>
            </div>

            {/* Timeline List */}
            {activities.length === 0 ? (
                <EmptyState title="No system activities recorded." />
            ) : (
                <div className="space-y-3.5">
                    {activities.map((activity, idx) => (
                        <div
                            key={activity.id || idx}
                            className="bg-white border-[3px] border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] flex items-start gap-4 hover:translate-x-1 transition-all"
                        >
                            <div className="p-2.5 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] text-black flex-shrink-0 mt-0.5">
                                <Activity size={18} strokeWidth={2.5} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="font-mono font-bold text-sm text-black">
                                        {activity.action}
                                    </p>

                                    <span className="bg-[#F5F0E6] text-black border border-black px-2 py-0.5 text-[11px] font-mono font-bold flex items-center gap-1 shadow-[1px_1px_0px_#000]">
                                        <Clock size={12} strokeWidth={2.5} />
                                        {formatRelativeDate(activity.created_at)}
                                    </span>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                                        ENTITY // {activity.entity_type || "SYSTEM"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
