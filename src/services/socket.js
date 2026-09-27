import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("VITE_API_URL is not configured");
}

const socketUrl = apiUrl.replace(/\/api\/v1\/?$/, "");

const socket = io(socketUrl, {
    autoConnect: false,
});

export default socket;