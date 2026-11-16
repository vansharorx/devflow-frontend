import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../../services/socket";
import api from "../../services/api";

import { setAccessToken } from "../../services/tokenStore";
import { AuthContext } from "../../context/AuthContext";

import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthDivider from "../../components/auth/AuthDivider";
import GoogleButton from "../../components/auth/GoogleButton";
import AuthFooter from "../../components/auth/AuthFooter";
import devflowLogo from "../../assets/devflow-login.png";

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
        <div className="min-h-screen w-full bg-[#FBF7EE] flex items-center justify-center p-3 sm:p-4 md:p-6 antialiased overflow-x-hidden">
            <AuthCard className="max-w-4xl p-0">
                <div className="grid grid-cols-1 md:grid-cols-12 landscape:grid-cols-12 min-h-0">
                    {/* LEFT COLUMN: BRANDING & OVERVIEW */}
                    <div className="md:col-span-5 landscape:col-span-5 bg-[#FFFDF8] border-b-[3px] md:border-b-0 md:border-r-[3px] landscape:border-b-0 landscape:border-r-[3px] border-black p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                        <div>
                            {/* Logo + Title */}
                            <div className="flex items-center md:flex-col md:items-start landscape:flex-col landscape:items-start gap-3 md:gap-0 landscape:gap-0">
                                <div className="relative mb-0 md:mb-3 landscape:mb-3 shrink-0">
                                    <img
                                        src={devflowLogo}
                                        alt="DevFlow Logo"
                                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[3px_3px_0px_#000]"
                                    />
                                </div>
                                <div>
                                    <h1 className="heading-font text-xl sm:text-2xl md:text-3xl font-extrabold text-black tracking-tight leading-tight">
                                        Sign In to DevFlow
                                    </h1>
                                </div>
                            </div>

                            <p className="mt-2 md:mt-3 landscape:mt-3 text-xs font-mono text-gray-600 leading-relaxed">
                                Manage projects and track issues with your team.
                            </p>
                        </div>

                        {/* Feature Highlights for landscape/desktop view */}
                        <div className="hidden md:flex landscape:flex flex-col gap-2 mt-5 pt-4 border-t-2 border-black/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00E676] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Issue Tracking & Assignment
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FFE600] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Real-time Notifications
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00D2FF] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Project Collaboration
                                </span>
                            </div>
                        </div>

                        {/* Footer info */}
                        <div className="hidden md:flex landscape:flex items-center justify-between mt-5 pt-3.5 border-t-2 border-black font-mono text-[10px] font-bold text-gray-500 uppercase">
                            <span>DevFlow Workspace</span>
                            <span className="flex items-center gap-1.5 text-black">
                                <span className="w-2 h-2 rounded-full bg-[#00E676] border border-black" />
                                Online
                            </span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: LOGIN FORM */}
                    <div className="md:col-span-7 landscape:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-center bg-white">
                        <form onSubmit={handleSubmit}>
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
                                className="w-full mt-1 bg-black hover:bg-neutral-900 text-white py-2.5 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                            >
                                {loading ? "Authenticating..." : "Sign In →"}
                            </button>
                        </form>

                        <AuthDivider className="my-3 sm:my-3.5" />

                        <GoogleButton onClick={handleGoogleLogin} />

                        <AuthFooter
                            text="New to DevFlow?"
                            linkText="Create an account"
                            to="/register"
                            className="mt-3.5 pt-3 border-t-2 border-black/10"
                        />
                    </div>
                </div>
            </AuthCard>
        </div>
    );
}
