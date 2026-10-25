import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../../services/socket";
import api from "../../services/api";

import { setAccessToken } from "../../services/tokenStore";
import { AuthContext } from "../../context/AuthContext";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthDivider from "../../components/auth/AuthDivider";
import GoogleButton from "../../components/auth/GoogleButton";
import AuthFooter from "../../components/auth/AuthFooter";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loadUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await api.post("/users/login", {
                email,
                password,
            });

            /*
             * Access token lives only in memory.
             * The refresh token is automatically stored
             * by the backend as an HttpOnly cookie.
             */
            setAccessToken(res.data.accessToken);

            await loadUser();

            socket.connect();

            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            throw new Error("VITE_API_URL is not configured");
        }

        window.location.href = `${apiUrl}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-[#FBF7EE] flex items-center justify-center p-4 sm:p-6 antialiased">
            <AuthCard>
                <AuthLogo
                    title="Sign In to DevFlow"
                    subtitle="Track issues. Plan sprints. Ship faster with your team."
                />

                <form onSubmit={handleSubmit} className="mt-4">
                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="you@company.dev"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        forgotPassword
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-black hover:bg-neutral-900 text-white py-3 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Sign In →"}
                    </button>
                </form>

                <AuthDivider />

                <GoogleButton onClick={handleGoogleLogin} />

                <AuthFooter
                    text="New to DevFlow?"
                    linkText="Create an account"
                    to="/register"
                />
            </AuthCard>
        </div>
    );
}
