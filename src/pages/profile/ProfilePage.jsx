import { useContext, useEffect, useRef, useState } from "react";
import { Camera, Mail, Layers, Bug, Bell } from "lucide-react";

import api, { uploadProfileImage } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function ProfilePage() {
    const { user, loadUser } = useContext(AuthContext);
    const fileInputRef = useRef(null);

    const [stats, setStats] = useState({
        projects: 0,
        issues: 0,
        notifications: 0,
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    const handleProfileImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            await uploadProfileImage(file);
            await loadUser();
        } catch (err) {
            console.log(err);
        } finally {
            setUploading(false);
        }
    };

    const loadStats = async () => {
        try {
            const [projects, issues, notifications] = await Promise.all([
                api.get("/projects"),
                api.get("/issues"),
                api.get("/notifications"),
            ]);

            const unread = notifications.data.data.filter(
                (notification) => Number(notification.is_read) === 0
            );

            setStats({
                projects: projects.data.data.length,
                issues: issues.data.data.length,
                notifications: unread.length,
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            SECURITY // IDENTITY
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Developer Profile
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#00E676] text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        ACTIVE USER
                    </span>
                </div>
            </div>

            {/* Profile Info Card */}
            <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Avatar Container */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-black border-[3px] border-black shadow-[4px_4px_0px_#000] flex items-center justify-center overflow-hidden">
                            {user.profile_image ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL.replace("/api/v1", "")}/${user.profile_image}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white heading-font text-4xl font-extrabold">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "D"}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current.click()}
                            disabled={uploading}
                            className="absolute -bottom-2 -right-2 p-2 bg-[#FFE600] hover:bg-[#ffe01a] text-black border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                            title="Upload new avatar"
                        >
                            <Camera size={16} strokeWidth={2.5} />
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleProfileImage}
                        />
                    </div>

                    {/* Basic details */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="bg-[#FFE600] border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                                {user.role || "Developer"}
                            </span>
                        </div>
                        <h2 className="heading-font text-2xl sm:text-3xl font-extrabold text-black mt-1">
                            {user.name}
                        </h2>
                        <p className="font-mono text-xs text-gray-600 flex items-center gap-1.5 mt-1">
                            <Mail size={13} strokeWidth={2.5} />
                            {user.email}
                        </p>
                    </div>
                </div>

                <hr className="my-6 border-t-2 border-black" />

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
                    <div className="bg-[#FFFDF8] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <p className="text-gray-500 font-bold uppercase mb-1">Account ID</p>
                        <p className="font-bold text-black break-all">{user.id}</p>
                    </div>

                    <div className="bg-[#FFFDF8] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <p className="text-gray-500 font-bold uppercase mb-1">Email Address</p>
                        <p className="font-bold text-black break-all">{user.email}</p>
                    </div>

                    <div className="bg-[#FFFDF8] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <p className="text-gray-500 font-bold uppercase mb-1">Role Permissions</p>
                        <p className="font-bold text-black uppercase">{user.role || "Member"}</p>
                    </div>

                    <div className="bg-[#FFFDF8] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                        <p className="text-gray-500 font-bold uppercase mb-1">Authentication State</p>
                        <span className="bg-[#00E676] text-black border border-black px-2 py-0.5 font-bold uppercase inline-block">
                            Authenticated // JWT Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#00D2FF] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">
                            Active Projects
                        </span>
                        <Layers size={20} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                        {stats.projects}
                    </p>
                </div>

                <div className="bg-[#FF5E7E] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">
                            Logged Issues
                        </span>
                        <Bug size={20} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                        {stats.issues}
                    </p>
                </div>

                <div className="bg-[#FFE600] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">
                            Unread Alerts
                        </span>
                        <Bell size={20} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                        {stats.notifications}
                    </p>
                </div>
            </div>
        </div>
    );
}
