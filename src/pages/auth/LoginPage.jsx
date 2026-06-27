import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import socket from "../../services/socket";
import api from "../../services/api";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

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

      socket.connect();

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message
      );

    }

  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F7E7CE]
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-xl
          shadow
          w-96
        "
      >

        <h1
          className="
            heading-font
            text-3xl
            text-[#102C26]
            mb-6
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            border
            w-full
            p-3
            rounded-lg
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-[#102C26]
          "
        />

        <div className="relative mb-4">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              border
              w-full
              p-3
              pr-12
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-[#102C26]
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              hover:text-[#102C26]
              cursor-pointer
            "
          >

            {
              showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
            }

          </button>

        </div>

        <button
          className="
            bg-[#102C26]
            text-white
            w-full
            p-3
            rounded-lg
            cursor-pointer
            hover:bg-[#17453b]
            transition-colors
          "
        >
          Login
        </button>

      </form>

    </div>

  );

}