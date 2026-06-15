import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import NotificationBadge from "../ui/NotificationBadge";
import ConnectionStatus from "../ui/ConnectionStatus";
import UserMenu from "../ui/UserMenu";
import api from "../../services/api";

export default function Navbar({
  setSidebarOpen
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.data.filter(
        (n) => !n.isRead
      );

      setCount(unread.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="
        bg-white
        h-16
        shadow
        flex
        items-center
        justify-between
        px-6
      "
    >
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="md:hidden"
        >
          <Menu />
        </button>

        <h2
          className="
            heading-font
            text-[#102C26]
          "
        >
          DevFlow
        </h2>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <NotificationBadge
          count={count}
        />

        <span>
          <UserMenu />
          <ConnectionStatus />
        </span>
      </div>
    </div>
  );
}