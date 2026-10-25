import { useState } from "react";
import { Lock } from "lucide-react";

import ChangePasswordModal from "./ChangePasswordModal";

export default function SecurityCard() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="w-16 h-16 bg-[#FFE600] border-[3px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black flex-shrink-0">
                        <Lock size={32} strokeWidth={2.5} />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-[#FF5E7E] text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                                CREDENTIALS
                            </span>
                        </div>

                        <h2 className="heading-font text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                            Account Security
                        </h2>

                        <p className="font-mono text-xs sm:text-sm text-gray-600 mt-2 max-w-xl">
                            Regularly rotate your password to protect repositories, issue comments, and administrative workspace capabilities.
                        </p>

                        <hr className="my-6 border-t-2 border-black" />

                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-black hover:bg-neutral-900 text-white px-6 py-3 border-2 border-black font-mono text-xs uppercase font-bold tracking-wider shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center gap-2"
                        >
                            <Lock size={16} strokeWidth={2.5} />
                            <span>Change Password →</span>
                        </button>
                    </div>
                </div>
            </div>

            <ChangePasswordModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}
