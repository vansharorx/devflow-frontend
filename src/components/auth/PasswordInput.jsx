import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    forgotPassword = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4 text-left">
            <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                    <span className="inline-block w-2 h-2 bg-[#FF5E7E] border border-black mr-1.5"></span>
                    {label}
                </label>

                {forgotPassword && (
                    <Link
                        to="/forgot-password"
                        className="text-xs font-mono font-bold text-black underline decoration-2 decoration-[#FFE600] hover:bg-[#FFE600] px-1 transition-colors"
                    >
                        Forgot password?
                    </Link>
                )}
            </div>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3.5 py-2.5 pr-11 border-2 border-black bg-white font-mono text-sm text-black placeholder:text-gray-400 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000] transition-all"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-black hover:bg-[#FFE600] border border-black cursor-pointer transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                </button>
            </div>
        </div>
    );
}
