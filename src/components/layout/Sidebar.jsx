import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
      w-64
      min-h-screen
      bg-[#102C26]
      text-white
      p-6
    "
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

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/issues">
          Issues
        </Link>

        <Link to="/notifications">
          Notifications
        </Link>

      </nav>
    </aside>
  );
}