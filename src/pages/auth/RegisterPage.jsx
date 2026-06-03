import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

export default function RegisterPage() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/users",
        {
          name,
          email,
          password
        }
      );

      alert(
        "Registration successful"
      );

      navigate("/login");

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
          Register
        </h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-3
          mb-4
        "
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-3
          mb-4
        "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-3
          mb-4
        "
        />

        <button
          className="
          bg-[#102C26]
          text-white
          w-full
          p-3
        "
        >
          Register
        </button>

      </form>

    </div>
  );
}