import { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    itemName = "",
    confirmLabel = "Delete Permanently",
    cancelLabel = "Cancel",
    isLoading = false,
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen && !isLoading) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs antialiased"
            onClick={() => {
                if (!isLoading) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-white border-[3px] border-black w-full max-w-md p-6 sm:p-7 shadow-[10px_10px_0px_#000] relative animate-neo-pop"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-4 right-4 p-1.5 bg-[#FFFDF5] hover:bg-[#FF5E7E] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all disabled:opacity-50"
                    aria-label="Close confirmation dialog"
                >
                    <X size={16} strokeWidth={2.5} />
                </button>

                {/* Warning Badge */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#FF5E7E] text-black border-2 border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                        <AlertTriangle size={12} strokeWidth={2.5} />
                        CAUTION // CONFIRM ACTION
                    </span>
                </div>

                {/* Title */}
                <h3 className="heading-font text-xl sm:text-2xl font-extrabold text-black tracking-tight flex items-center gap-2">
                    <Trash2 size={22} strokeWidth={2.5} className="text-[#FF5E7E]" />
                    {title}
                </h3>

                {/* Message Body */}
                <div className="mt-3 font-mono text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#FFFDF8] border-2 border-black p-3.5 shadow-[3px_3px_0px_#000]">
                    {itemName ? (
                        <>
                            <p>
                                Are you sure you want to permanently delete:
                            </p>
                            <p className="font-bold text-black text-sm mt-1 break-all bg-[#FFE600] border border-black px-2 py-1">
                                &quot;{itemName}&quot;
                            </p>
                            <p className="mt-2 text-xs text-red-600 font-bold uppercase">
                                This action is permanent and cannot be undone.
                            </p>
                        </>
                    ) : (
                        <p>{message}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="bg-white hover:bg-[#FFFDF5] text-black border-2 border-black font-mono text-xs uppercase font-bold tracking-wider px-5 py-2.5 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer disabled:opacity-50 text-center"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="bg-[#FF5E7E] hover:bg-[#ff476b] text-black border-2 border-black font-mono text-xs uppercase font-bold tracking-wider px-5 py-2.5 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 text-center"
                    >
                        <Trash2 size={14} strokeWidth={2.5} />
                        <span>{isLoading ? "Deleting..." : confirmLabel}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
