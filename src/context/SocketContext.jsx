import {
  createContext,
  useEffect,
  useState
} from "react";

import socket from "../services/socket";

export const SocketContext = createContext();

export function SocketProvider({ children }) {

  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Socket Connected");
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket Disconnected");
      setConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

    };

  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}