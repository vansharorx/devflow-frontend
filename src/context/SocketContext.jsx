import {
  createContext,
  useEffect
} from "react";

import socket from "../services/socket";

export const SocketContext =
  createContext();

export function SocketProvider({
  children
}) {

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      socket.connect();

      console.log(
        "Socket Connected"
      );
    }

    return () => {

      socket.disconnect();
    };

  }, []);

  return (
    <SocketContext.Provider
      value={{ socket }}
    >
      {children}
    </SocketContext.Provider>
  );
}