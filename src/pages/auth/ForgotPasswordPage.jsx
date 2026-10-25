import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import AuthInput from "../../components/auth/AuthInput";
import AuthFooter from "../../components/auth/AuthFooter";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/password/forgot-password", {
                email,
            });

            alert(res.data.message);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF7EE] flex items-center justify-center p-4 sm:p-6 antialiased">
            <AuthCard>
                <AuthLogo
                    title="Recover Password"
                    subtitle="Enter your verified email address to receive reset instructions."
                />

                <form onSubmit={handleSubmit} className="mt-4">
                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="you@company.dev"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-black hover:bg-neutral-900 text-white py-3 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Transmitting..." : "Send Reset Link →"}
                    </button>
                </form>

                <AuthFooter
                    text="Remember your credentials?"
                    linkText="Sign In"
                    to="/login"
                />
            </AuthCard>
        </div>
    );
}
