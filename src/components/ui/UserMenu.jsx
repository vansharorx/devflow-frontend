import {
  useNavigate
} from "react-router-dom";

export default function UserMenu() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

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
        onClick={logout}
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