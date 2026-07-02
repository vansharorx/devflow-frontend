import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import PasswordInput from "../../components/auth/PasswordInput";

export default function ResetPasswordPage() {

    const navigate = useNavigate();

    const { token } = useParams();

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const res = await api.post(

                `/password/reset-password/${token}`,

                {
                    password
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

                    title="Reset Password"

                    subtitle="Enter your new password."

                />

                <form onSubmit={handleSubmit}>

                    <PasswordInput

                        label="New Password"

                        placeholder="Enter new password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                    />

                    <PasswordInput

                        label="Confirm Password"

                        placeholder="Confirm password"

                        value={confirmPassword}

                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
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
                            cursor-pointer
                        "
                    >

                        {

                            loading

                                ? "Resetting..."

                                : "Reset Password"

                        }

                    </button>

                </form>

            </AuthCard>

        </div>

    );

}