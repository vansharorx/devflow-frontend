import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    Bug,
    Bell,
    Activity,
    User,
    Settings,
    X,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider border-2 border-black transition-all ${
            isActive
                ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] translate-x-1"
                : "bg-white text-black hover:bg-[#FFFDF5] hover:shadow-[3px_3px_0px_#000] hover:translate-x-1 active:translate-x-1.5 active:shadow-[1px_1px_0px_#000]"
        }`;

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden animate-neo-scale"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed md:fixed
                    z-50
                    top-0 left-0
                    ${open ? "translate-x-0 shadow-[8px_0px_0px_#000]" : "-translate-x-full"}
                    md:translate-x-0
                    transition-transform duration-200 ease-out
                    w-64
                    h-screen
                    flex-shrink-0
                    bg-[#FFFDF8]
                    text-black
                    border-r-[3px]
                    border-black
                    p-5
                    flex
                    flex-col
                    justify-between
                    overflow-y-auto
                `}
            >
                <div>
                    <div className="flex items-center justify-between pb-5 mb-6 border-b-[3px] border-black">
                        <div className="flex items-center gap-2 group cursor-default">
                            <span className="w-4 h-4 bg-black inline-block group-hover:rotate-45 transition-transform duration-200"></span>
                            <span className="heading-font text-2xl font-extrabold tracking-tight text-black">
                                DEV<span className="bg-[#FFE600] px-1 border-2 border-black ml-0.5 shadow-[2px_2px_0px_#000]">FLOW</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-1 border-2 border-black bg-white neo-btn"
                            aria-label="Close sidebar"
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2.5">
                        <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
                            <LayoutDashboard size={18} strokeWidth={2.5} />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to="/projects" className={navClass} onClick={() => setOpen(false)}>
                            <FolderKanban size={18} strokeWidth={2.5} />
                            <span>Projects</span>
                        </NavLink>

                        <NavLink to="/issues" className={navClass} onClick={() => setOpen(false)}>
                            <Bug size={18} strokeWidth={2.5} />
                            <span>Issues</span>
                        </NavLink>

                        <NavLink to="/notifications" className={navClass} onClick={() => setOpen(false)}>
                            <Bell size={18} strokeWidth={2.5} />
                            <span>Notifications</span>
                        </NavLink>

                        <NavLink to="/activities" className={navClass} onClick={() => setOpen(false)}>
                            <Activity size={18} strokeWidth={2.5} />
                            <span>Activity</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="pt-5 border-t-[3px] border-black flex flex-col gap-2.5">
                    <NavLink to="/profile" className={navClass} onClick={() => setOpen(false)}>
                        <User size={18} strokeWidth={2.5} />
                        <span>Profile</span>
                    </NavLink>

                    <NavLink to="/settings" className={navClass} onClick={() => setOpen(false)}>
                        <Settings size={18} strokeWidth={2.5} />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
}
