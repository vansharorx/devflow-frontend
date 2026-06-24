import { useState, useEffect, useContext } from "react";
import { Menu } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { SocketContext } from "../../context/SocketContext";

import NotificationBadge from "../ui/NotificationBadge";
import ConnectionStatus from "../ui/ConnectionStatus";
import UserMenu from "../ui/UserMenu";

import api from "../../services/api";

export default function Navbar({ setSidebarOpen }) {

  const [count, setCount] = useState(0);

  const { socket } = useContext(SocketContext);

  // Decode user name from JWT
  let userName = "User";

  try {

    const token = localStorage.getItem("token");

    if (token) {

      const decoded = jwtDecode(token);

      userName = decoded.name || "User";

    }

  } catch (err) {

    console.log(err);

  }

  const loadNotifications = async () => {

    try {

      const res = await api.get("/notifications");

      const unread = res.data.data.filter(
        notification => Number(notification.is_read) === 0
      );

      setCount(unread.length);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadNotifications();

  }, []);

  useEffect(() => {

    if (!socket) return;

    socket.on("notification", loadNotifications);

    return () => {

      socket.off("notification", loadNotifications);

    };

  }, [socket]);

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
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu />
        </button>

        <h2
          className="
            heading-font
            text-[#102C26]
            text-xl
          "
        >
          {userName}
        </h2>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <NotificationBadge count={count} />

        <div className="flex items-center gap-4">

          <UserMenu />

          <ConnectionStatus />

        </div>

      </div>

    </div>

  );

}