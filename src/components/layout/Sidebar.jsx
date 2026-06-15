import { NavLink } from "react-router-dom";

export default function Sidebar({
  open,
  setOpen
}) {
  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-colors ${
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

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          end
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Projects
        </NavLink>

        <NavLink
          to="/issues"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Issues
        </NavLink>

        <NavLink
          to="/notifications"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Notifications
        </NavLink>

        <NavLink
          to="/activities"
          className={navClass}
          onClick={() => setOpen(false)}
        >
          Activities
        </NavLink>
      </nav>
    </aside>
  );
}