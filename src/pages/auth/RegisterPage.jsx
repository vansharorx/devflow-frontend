import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthFooter from "../../components/auth/AuthFooter";
import devflowLogo from "../../assets/devflow-login.png";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleSwitchToLogin = (to) => {
        setIsExiting(true);
        setTimeout(() => {
            navigate(to);
        }, 140);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.post("/users", {
                name,
                email,
                password,
            });

            alert("Registration successful! Please sign in.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#FBF7EE] flex items-center justify-center p-3 sm:p-4 md:p-6 antialiased overflow-x-hidden">
            <AuthCard className="max-w-4xl p-0 animate-auth-card">
                <div className="grid grid-cols-1 md:grid-cols-12 landscape:grid-cols-12 min-h-0">
                    {/* LEFT COLUMN: BRANDING & OVERVIEW */}
                    <div
                        className={`md:col-span-5 landscape:col-span-5 bg-[#FFFDF8] border-b-[3px] md:border-b-0 md:border-r-[3px] landscape:border-b-0 landscape:border-r-[3px] border-black p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-opacity duration-150 ${
                            isExiting ? "opacity-40" : "animate-neo-pop"
                        }`}
                    >
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
                                        Create Account
                                    </h1>
                                </div>
                            </div>

                            <p className="mt-2 md:mt-3 landscape:mt-3 text-xs font-mono text-gray-600 leading-relaxed">
                                Join your team workspace and manage projects and issues.
                            </p>
                        </div>

                        {/* Feature Highlights for landscape/desktop view */}
                        <div className="hidden md:flex landscape:flex flex-col gap-2 mt-5 pt-4 border-t-2 border-black/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00E676] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Team Workspace Access
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FFE600] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Issue Tracking & Projects
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00D2FF] border border-black shrink-0" />
                                <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-black">
                                    Real-time Collaboration
                                </span>
                            </div>
                        </div>

                        {/* Footer info */}
                        <div className="hidden md:flex landscape:flex items-center justify-between mt-5 pt-3.5 border-t-2 border-black font-mono text-[10px] font-bold text-gray-500 uppercase">
                            <span>DevFlow Workspace</span>
                            <span className="flex items-center gap-1.5 text-black">
                                <span className="w-2 h-2 rounded-full bg-[#00E676] border border-black" />
                                Active
                            </span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: REGISTER FORM */}
                    <div
                        className={`md:col-span-7 landscape:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-center bg-white ${
                            isExiting ? "animate-auth-slide-out-right" : "animate-auth-slide-in-right"
                        }`}
                    >
                        <form onSubmit={handleSubmit}>
                            <AuthInput
                                label="Full Name"
                                type="text"
                                placeholder="Ada Lovelace"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <AuthInput
                                label="Email Address"
                                type="email"
                                placeholder="you@company.dev"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-1 bg-[#FFE600] hover:bg-[#ffe01a] text-black py-2.5 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                            >
                                {loading ? "Creating Account..." : "Create Account →"}
                            </button>
                        </form>

                        <AuthFooter
                            text="Already have an account?"
                            linkText="Sign In"
                            to="/login"
                            onSwitch={handleSwitchToLogin}
                            className="mt-4 pt-3.5 border-t-2 border-black/10"
                        />
                    </div>
                </div>
            </AuthCard>
        </div>
    );
}
