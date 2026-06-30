import { useState } from "react";
import {
  Eye,
  EyeOff
} from "lucide-react";

export default function PasswordInput({

  label,
  placeholder,
  value,
  onChange,
  forgotPassword = false

}) {

  const [showPassword, setShowPassword] =
    useState(false);

  return (

    <div className="mb-5">

      <div
        className="
          flex
          items-center
          justify-between
          mb-2
        "
      >

        <label
          className="
            text-sm
            font-medium
            text-[#102C26]
          "
        >
          {label}
        </label>

        {

          forgotPassword && (

            <button
              type="button"
              className="
                text-sm
                text-[#102C26]
                hover:underline
              "
            >
              Forgot password?
            </button>

          )

        }

      </div>

      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            px-4
            py-3
            pr-12
            rounded-lg
            border
            border-gray-300
            bg-white
            text-[#102C26]
            placeholder:text-gray-400
            transition
            focus:outline-none
            focus:border-[#102C26]
            focus:ring-2
            focus:ring-[#102C26]/20
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

    </div>

  );

}