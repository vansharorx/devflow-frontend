import { useState, useEffect, useContext, useCallback } from "react";
import { Menu } from "lucide-react";

import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";

import NotificationBadge from "../ui/NotificationBadge";
import ConnectionStatus from "../ui/ConnectionStatus";
import UserMenu from "../ui/UserMenu";

import api from "../../services/api";

export default function Navbar({ setSidebarOpen }) {
    const [count, setCount] = useState(0);

    const { socket } = useContext(SocketContext);
    const { user } = useContext(AuthContext);

    const userName = user?.name || "Developer";

    const loadNotifications = useCallback(async () => {
        try {
            const res = await api.get(`/notifications?t=${Date.now()}`);

            const unread = res.data.data.filter(
                (notification) => Number(notification.is_read) === 0
            );

            setCount(unread.length);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        loadNotifications();
    }, [user, loadNotifications]);

    useEffect(() => {
        if (!socket) return;

        const handleNotification = () => {
            loadNotifications();
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket, loadNotifications]);

    return (
        <header className="bg-white h-16 border-b-[3px] border-black flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
            {/* Left: Mobile Toggle & Context */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden p-1.5 bg-[#FFE600] border-2 border-black neo-btn flex items-center justify-center text-black"
                    aria-label="Open navigation menu"
                >
                    <Menu size={20} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block w-2.5 h-2.5 bg-black"></span>
                    <h2 className="heading-font text-lg sm:text-xl font-extrabold text-black tracking-tight">
                        <span className="text-gray-500 font-mono text-xs uppercase block sm:inline sm:mr-2">Workspace /</span>
                        {userName}
                    </h2>
                </div>
            </div>

            {/* Right: Actions & Status */}
            <div className="flex items-center gap-3 sm:gap-5">
                <NotificationBadge count={count} />

                <div className="h-6 w-[2px] bg-black hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <ConnectionStatus />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
