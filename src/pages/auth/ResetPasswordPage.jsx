import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthFooter from "../../components/auth/AuthFooter";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post(`/password/reset-password/${token}`, {
                password,
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
                    title="Reset Password"
                    subtitle="Create a new strong password for your DevFlow account."
                />

                <form onSubmit={handleSubmit} className="mt-4">
                    <PasswordInput
                        label="New Password"
                        placeholder="New password (8+ chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-black hover:bg-neutral-900 text-white py-3 px-4 font-mono text-xs uppercase font-bold tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password →"}
                    </button>
                </form>

                <AuthFooter
                    text="Back to security portal?"
                    linkText="Sign In"
                    to="/login"
                />
            </AuthCard>
        </div>
    );
}
