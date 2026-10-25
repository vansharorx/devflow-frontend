import SecurityCard from "../../components/settings/SecurityCard";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            WORKSPACE // PREFERENCES
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Settings
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#FFE600] text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        SYSTEM CONFIG
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                <SecurityCard />
            </div>
        </div>
    );
}
