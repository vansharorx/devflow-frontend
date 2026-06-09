import { useState, useEffect } from "react";
import NotificationBadge from "./NotificationBadge";
import ConnectionStatus from "../ui/ConnectionStatus";

export default function Navbar() {
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
      <h2
        className="
        heading-font
        text-[#102C26]
      "
      >
        DevFlow
      </h2>

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
          Welcome, Vansh <ConnectionStatus />
        </span>
      </div>
    </div>
  );
}