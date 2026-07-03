import { useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../../services/socket";
import api from "../../services/api";

import AuthCard from "../../components/auth/AuthCard";
import AuthLogo from "../../components/auth/AuthLogo";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthDivider from "../../components/auth/AuthDivider";
import GoogleButton from "../../components/auth/GoogleButton";
import AuthFooter from "../../components/auth/AuthFooter";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/users/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      socket.connect();

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message
      );

    }

  };

  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:2005/api/v1/auth/google";

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
          title="Sign in to DevFlow"
          subtitle="Track projects. Assign issues. Collaborate with your team."
        />

        <form
          onSubmit={handleSubmit}
        >

          <AuthInput
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            forgotPassword
          />

          <button
            type="submit"
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
              cursor-pointer
            "
          >
            Sign in
          </button>

        </form>

        <AuthDivider />

        <GoogleButton
          onClick={handleGoogleLogin}
        />

        <AuthFooter
          text="New to DevFlow?"
          linkText="Create an account"
          to="/register"
        />

      </AuthCard>

    </div>

  );

}