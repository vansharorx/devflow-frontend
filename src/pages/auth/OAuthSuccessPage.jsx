import { useEffect } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import socket from "../../services/socket";

export default function OAuthSuccessPage() {

    const navigate = useNavigate();

    const [params] = useSearchParams();

    useEffect(() => {

        const accessToken =
            params.get("accessToken");

        const refreshToken =
            params.get("refreshToken");

        if (

            !accessToken ||

            !refreshToken

        ) {

            navigate("/login");

            return;

        }

        localStorage.setItem(

            "token",

            accessToken

        );

        localStorage.setItem(

            "refreshToken",

            refreshToken

        );

        socket.connect();

        navigate("/");

    }, []);

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