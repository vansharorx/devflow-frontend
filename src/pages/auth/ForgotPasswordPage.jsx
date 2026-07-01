import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import AuthInput from "../../components/auth/AuthInput";
import AuthFooter from "../../components/auth/AuthFooter";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post(

                "/password/forgot-password",

                {
                    email
                }

            );

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "Something went wrong."

            );

        } finally {

            setLoading(false);

        }

    };

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

                    title="Forgot Password"

                    subtitle="Enter your email address to receive a password reset link."

                />

                <form onSubmit={handleSubmit}>

                    <AuthInput

                        label="Email Address"

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                    />

                    <button

                        type="submit"

                        disabled={loading}

                        className="
                            w-full
                            bg-[#102C26]
                            text-white
                            py-3
                            rounded-lg
                            mt-2
                            font-medium
                            hover:bg-[#17453b]
                            transition
                            disabled:opacity-50
                        "
                    >

                        {

                            loading

                                ? "Sending..."

                                : "Send Reset Link"

                        }

                    </button>

                </form>

                <AuthFooter

                    text="Remember your password?"

                    linkText="Sign In"

                    to="/login"

                />

            </AuthCard>

        </div>

    );

}