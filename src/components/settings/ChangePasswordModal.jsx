import { useState } from "react";
import { Eye, EyeOff, Lock, X } from "lucide-react";

import api from "../../services/api";

export default function ChangePasswordModal({ open, onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await api.put("/users/change-password", {
                currentPassword,
                newPassword,
            });

            alert("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowCurrent(false);
            setShowNew(false);
            setShowConfirm(false);

            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Unable to change password.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 antialiased">
            <div className="bg-white border-[3px] border-black w-full max-w-md p-6 sm:p-8 shadow-[10px_10px_0px_#000] relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 bg-[#FF5E7E] text-black border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    aria-label="Close dialog"
                >
                    <X size={16} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#FFE600] text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                        SECURITY MODAL
                    </span>
                </div>

                <h2 className="heading-font text-2xl font-extrabold text-black tracking-tight mb-5 flex items-center gap-2">
                    <Lock size={22} strokeWidth={2.5} />
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1.5">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrent ? "text" : "password"}
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="border-2 border-black w-full p-2.5 pr-11 font-mono text-sm shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-black hover:bg-[#FFE600] border border-black cursor-pointer"
                            >
                                {showCurrent ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1.5">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="New password (8+ characters)"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-2 border-black w-full p-2.5 pr-11 font-mono text-sm shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-black hover:bg-[#FFE600] border border-black cursor-pointer"
                            >
                                {showNew ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-2 border-black w-full p-2.5 pr-11 font-mono text-sm shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-black hover:bg-[#FFE600] border border-black cursor-pointer"
                            >
                                {showConfirm ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t-2 border-black/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border-2 border-black font-mono text-xs uppercase font-bold tracking-wider bg-white shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#FFE600] hover:bg-[#ffe01a] text-black px-5 py-2 border-2 border-black font-mono text-xs uppercase font-bold tracking-wider shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
