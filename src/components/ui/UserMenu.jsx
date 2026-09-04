import {
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  AuthContext
} from "../../context/AuthContext";

export default function UserMenu() {

  const navigate =
    useNavigate();

  const {
    logout
  } = useContext(AuthContext);

  const handleLogout = async () => {

    await logout();

    navigate("/login");
  };

  return (

    <div
      className="
      flex
      items-center
      gap-4
    "
    >

      <button
        onClick={handleLogout}
        className="
          text-red-500
          cursor-pointer
          hover:underline
          transition
        "
      >
        Logout
      </button>

    </div>
  );
}