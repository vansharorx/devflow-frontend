import SecurityCard from "../../components/settings/SecurityCard";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Settings
                    </h1>
                </div>
            </div>

            <div className="space-y-6">
                <SecurityCard />
            </div>
        </div>
    );
}
