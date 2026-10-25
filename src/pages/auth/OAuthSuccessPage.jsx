import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { setAccessToken } from "../../services/tokenStore";
import socket from "../../services/socket";

export default function OAuthSuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const completeOAuthLogin = async () => {
            try {
                const res = await api.post("/users/refresh");
                setAccessToken(res.data.accessToken);
                socket.connect();
                navigate("/");
            } catch (err) {
                console.error("OAuth login failed:", err);
                navigate("/login");
            }
        };

        completeOAuthLogin();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBF7EE] p-4 antialiased">
            <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_#000] text-center max-w-sm w-full">
                <div className="w-12 h-12 bg-[#00D2FF] border-2 border-black shadow-[4px_4px_0px_#000] mx-auto mb-4 animate-bounce" />
                <h1 className="heading-font text-2xl font-extrabold text-black tracking-tight">
                    Authorizing Session
                </h1>
                <p className="font-mono text-xs text-gray-600 mt-2">
                    Synchronizing tokens and establishing socket connection...
                </p>
            </div>
        </div>
    );
}
