import { useEffect } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";

export default function VerifyEmailPage() {

    const { token } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        const verify = async () => {

            try {

                const res =
                    await api.get(
                        `/email-verification/verify/${token}`
                    );

                alert(
                    res.data.message
                );

                navigate("/login");

            } catch (err) {

                alert(

                    err.response?.data?.message ||

                    "Verification failed."

                );

            }

        };

        verify();

    }, []);

    return (

        <div
            className="
                min-h-screen
                bg-[#F7E7CE]
                flex
                items-center
                justify-center
                px-5
            "
        >

            <AuthCard>

                <AuthLogo

                    title="Verifying Email"

                    subtitle="Please wait while we verify your account."

                />

            </AuthCard>

        </div>

    );

}