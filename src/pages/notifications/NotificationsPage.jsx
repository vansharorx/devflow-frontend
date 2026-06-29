import {
  useEffect,
  useState
} from "react";

import api from "../../services/api";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

export default function NotificationsPage() {

  const [notifications,
    setNotifications] =
      useState([]);

    const { socket } = useContext(SocketContext);
  useEffect(() => {

    fetchNotifications();

  }, []);

  useEffect(() => {

    socket.on(
      "notification",
      () => {

        fetchNotifications();

      }
    );

    return () => {

      socket.off(
        "notification"
      );
    };

  }, [socket]);

  const fetchNotifications = async () => {

    try {

      const res = await api.get("/notifications");

      console.log(res.data);

      setNotifications(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const markRead = async (
    id
  ) => {

    try {

      await api.put(
        `/notifications/${id}/read`
      );

      fetchNotifications();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div>

      <h1
        className="
        heading-font
        text-3xl
        text-[#102C26]
        mb-6
      "
      >
        Notifications
      </h1>

      <div className="grid gap-4">

        {
          notifications.map(
            notification => (

              <div
                key={
                  notification.id
                }
                className={`
                  p-5
                  rounded-xl
                  shadow
                  bg-white
                  ${
                    !notification.is_read
                      ? "border-l-4 border-[#102C26]"
                      : ""
                  }
                `}
              >

                <p>
                  {
                    notification.message
                  }
                </p>

                {
                  !notification.is_read && (

                    <button
                      onClick={() =>
                        markRead(
                          notification.id
                        )
                      }
                      className="
                      mt-3
                      text-[#102C26]
                      font-medium
                      cursor-pointer
                      hover:underline
                      "
                    >
                      Mark as Read
                    </button>

                  )
                }

              </div>

            ))
        }

      </div>

    </div>
  );
}