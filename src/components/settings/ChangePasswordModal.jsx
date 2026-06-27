import { useState } from "react";
import {
  Eye,
  EyeOff
} from "lucide-react";

import api from "../../services/api";

export default function ChangePasswordModal({
  open,
  onClose
}) {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      alert("All fields are required.");

      return;

    }

    if (newPassword.length < 8) {

      alert(
        "Password must be at least 8 characters."
      );

      return;

    }

    if (newPassword !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    try {

      await api.put(
        "/users/change-password",
        {
          currentPassword,
          newPassword
        }
      );

      alert(
        "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);

      onClose();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to change password."
      );

    }

  };

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-xl
          w-[450px]
          p-8
          shadow-xl
        "
      >

        <h2
          className="
            heading-font
            text-3xl
            text-[#102C26]
            mb-6
          "
        >
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="relative">

            <input
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e)=>
                setCurrentPassword(
                  e.target.value
                )
              }
              className="
                border
                w-full
                p-3
                pr-12
                rounded-lg
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  !showCurrent
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                cursor-pointer
              "
            >

              {
                showCurrent
                  ? <EyeOff size={20}/>
                  : <Eye size={20}/>
              }

            </button>

          </div>

          <div className="relative">

            <input
              type={
                showNew
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              value={newPassword}
              onChange={(e)=>
                setNewPassword(
                  e.target.value
                )
              }
              className="
                border
                w-full
                p-3
                pr-12
                rounded-lg
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(
                  !showNew
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                cursor-pointer
              "
            >

              {
                showNew
                  ? <EyeOff size={20}/>
                  : <Eye size={20}/>
              }

            </button>

          </div>

          <div className="relative">

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
                border
                w-full
                p-3
                pr-12
                rounded-lg
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                cursor-pointer
              "
            >

              {
                showConfirm
                  ? <EyeOff size={20}/>
                  : <Eye size={20}/>
              }

            </button>

          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              pt-2
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                px-5
                py-2
                border
                rounded-lg
                cursor-pointer
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-[#102C26]
                text-white
                px-5
                py-2
                rounded-lg
                cursor-pointer
                hover:bg-[#17453b]
              "
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}