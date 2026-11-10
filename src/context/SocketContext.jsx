import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import socket from "../services/socket";

import { getAccessToken } from "../services/tokenStore";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
    const [connected, setConnected] = useState(socket.connected);
    const [connecting, setConnecting] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const handleConnect = () => {
            console.log("Socket Connected");
            setConnected(true);
            setConnecting(false);
        };

        const handleDisconnect = () => {
            console.log("Socket Disconnected");
            setConnected(false);
            setConnecting(false);
        };

        const handleConnectError = (err) => {
            console.warn("Socket Connect Error:", err?.message);
            setConnected(false);
            setConnecting(false);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);

        if (user && getAccessToken()) {
            setConnecting(true);
            socket.connect();
        } else {
            socket.disconnect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.disconnect();
        };
    }, [user]);

    const toggleConnection = () => {
        if (connected) {
            socket.disconnect();
        } else if (user && getAccessToken()) {
            setConnecting(true);
            socket.connect();
        }
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                connected,
                connecting,
                toggleConnection,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
