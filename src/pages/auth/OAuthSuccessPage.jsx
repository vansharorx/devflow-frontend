import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import {
    setAccessToken
} from "../../services/tokenStore";

import socket from "../../services/socket";

export default function OAuthSuccessPage() {

    const navigate =
        useNavigate();

    useEffect(() => {

        const completeOAuthLogin =
            async () => {

                try {

                    const res =
                        await api.post(
                            "/users/refresh"
                        );

                    setAccessToken(
                        res.data.accessToken
                    );

                    socket.connect();

                    navigate("/");

                } catch (err) {

                    console.error(
                        "OAuth login failed:",
                        err
                    );

                    navigate("/login");

                }

            };

        completeOAuthLogin();

    }, [navigate]);

    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-[#F7E7CE]
            "
        >

            <h1
                className="
                    heading-font
                    text-[#102C26]
                    text-2xl
                "
            >
                Signing you in...
            </h1>

        </div>

    );

}