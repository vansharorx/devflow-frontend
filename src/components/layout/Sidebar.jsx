import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Bug,
  Bell,
  Activity,
  User,
  Settings
} from "lucide-react";

export default function Sidebar({
  open,
  setOpen
}) {

  const navClass = ({ isActive }) =>
    `block w-full px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-[#F7E7CE] text-[#102C26]"
        : "text-white hover:bg-[#1a453d]"
    }`;

  return (
    <aside
      className={`
        fixed
        md:static
        z-50
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        md:translate-x-0
        transition-transform
        duration-300
        w-64
        min-h-screen
        bg-[#102C26]
        text-white
        p-6
        flex
        flex-col
      `}
    >

      <h1
        className="
          heading-font
          text-xl
          mb-10
        "
      >
        DevFlow
      </h1>

      <div className="flex flex-col gap-2">

        <NavLink
          to="/"
          end
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/projects"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <FolderKanban size={18} />
            <span>Projects</span>
          </div>
        </NavLink>

        <NavLink
          to="/issues"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <Bug size={18} />
            <span>Issues</span>
          </div>
        </NavLink>

        <NavLink
          to="/notifications"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <Bell size={18} />
            <span>Notifications</span>
          </div>
        </NavLink>

        <NavLink
          to="/activities"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <Activity size={18} />
            <span>Activities</span>
          </div>
        </NavLink>

      </div>

      <div className="mt-auto flex flex-col gap-2">

        <NavLink
          to="/profile"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>Profile</span>
          </div>
        </NavLink>

        <NavLink
          to="/settings"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-2">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </NavLink>

      </div>

    </aside>
  );
}