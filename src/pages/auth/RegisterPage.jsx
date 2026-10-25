import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthFooter from "../../components/auth/AuthFooter";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-[#FBF7EE] flex items-center justify-center p-4 sm:p-6 antialiased">
            <AuthCard>
                <AuthLogo
                    title="Create DevFlow Account"
                    subtitle="Join your team workspace and manage developer workflows."
                />

                <form onSubmit={handleSubmit} className="mt-4">
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
                        className="w-full mt-2 bg-[#FFE600] hover:bg-[#ffe01a] text-black py-3 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account →"}
                    </button>
                </form>

                <AuthFooter
                    text="Already have an account?"
                    linkText="Sign In"
                    to="/login"
                />
            </AuthCard>
        </div>
    );
}
