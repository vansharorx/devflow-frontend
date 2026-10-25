import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

export default function UserMenu() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="flex items-center">
            <button
                onClick={handleLogout}
                className="bg-[#FF5E7E] hover:bg-[#ff476b] text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer flex items-center gap-1.5"
                title="Sign out of session"
            >
                <LogOut size={14} strokeWidth={2.5} />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
    );
}
