import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";

export default function VerifyEmailPage() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await api.get(`/email-verification/verify/${token}`);
                alert(res.data.message);
                navigate("/login");
            } catch (err) {
                alert(err.response?.data?.message || "Verification failed.");
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-[#FBF7EE] flex items-center justify-center p-4 sm:p-6 antialiased">
            <AuthCard>
                <AuthLogo
                    title="Verifying Email"
                    subtitle="Validating verification token with the authorization server..."
                />
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div className="w-10 h-10 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] animate-spin" />
                    <p className="font-mono text-xs text-gray-600 uppercase font-bold tracking-wider">
                        Please hold on...
                    </p>
                </div>
            </AuthCard>
        </div>
    );
}
