export default function WelcomeBanner({ user }) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div className="bg-[#FFE600] border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] text-black mb-8 relative">
            <div className="absolute top-3 right-4 bg-black text-white border-2 border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest hidden sm:block">
                LIVE WORKSPACE
            </div>

            <h2 className="heading-font text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
                {greeting},{" "}
                <span className="bg-black text-[#FFE600] px-2 py-0.5 inline-block border-2 border-black mt-1 sm:mt-0">
                    {user?.name || "Developer"}
                </span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm font-mono text-black font-bold max-w-xl">
                // System operational. Here is an overview of active projects, issues, and team velocity.
            </p>
        </div>
    );
}
