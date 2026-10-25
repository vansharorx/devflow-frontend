import { useEffect, useState, useContext } from "react";
import { Bell, Check } from "lucide-react";

import api from "../../services/api";
import { SocketContext } from "../../context/SocketContext";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNotification = () => {
            fetchNotifications();
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await api.get("/notifications");
            setNotifications(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const markRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (err) {
            console.log(err);
        }
    };

    const unreadCount = notifications.filter((n) => Number(n.is_read) === 0).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            WORKSPACE // ALERTS
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Notifications
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#FFE600] text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        {unreadCount} Unread
                    </span>
                    <span className="bg-white text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        {notifications.length} Total
                    </span>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <LoadingSpinner />
            ) : notifications.length === 0 ? (
                <EmptyState title="No notifications received yet." />
            ) : (
                <div className="grid gap-4">
                    {notifications.map((notification) => {
                        const isUnread = Number(notification.is_read) === 0;

                        return (
                            <div
                                key={notification.id}
                                className={`border-[3px] border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                                    isUnread
                                        ? "bg-[#FFFDF5] border-l-[10px] border-l-[#FFE600]"
                                        : "bg-white opacity-80"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`p-2 border-2 border-black shadow-[2px_2px_0px_#000] text-black flex-shrink-0 mt-0.5 ${
                                            isUnread ? "bg-[#FFE600]" : "bg-gray-200"
                                        }`}
                                    >
                                        <Bell size={18} strokeWidth={2.5} />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 border border-black ${
                                                    isUnread ? "bg-[#FF5E7E] text-black" : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                {isUnread ? "NEW EVENT" : "READ"}
                                            </span>
                                        </div>
                                        <p className="font-mono text-sm text-black font-bold">
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>

                                {isUnread && (
                                    <button
                                        onClick={() => markRead(notification.id)}
                                        className="bg-[#00E676] hover:bg-[#00cf6a] text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-center whitespace-nowrap"
                                    >
                                        <Check size={14} strokeWidth={2.5} />
                                        <span>Mark as Read</span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
