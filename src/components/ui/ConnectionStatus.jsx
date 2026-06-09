import {
  useEffect,
  useState
} from "react";

import socket from "../../services/socket";

export default function ConnectionStatus() {

  const [connected,
    setConnected] =
      useState(false);

  useEffect(() => {

    socket.on(
      "connect",
      () => {
        setConnected(true);
      }
    );

    socket.on(
      "disconnect",
      () => {
        setConnected(false);
      }
    );

    return () => {

      socket.off("connect");
      socket.off("disconnect");
    };

  }, []);

  return (

    <span
      className={`
      text-sm
      font-medium
      ${
        connected
        ? "text-green-600"
        : "text-red-500"
      }
      `}
    >

      {
        connected
          ? "● Live"
          : "● Offline"
      }

    </span>
  );
}