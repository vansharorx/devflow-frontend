import devflowLogo from "../../assets/devflow-login.png";

export default function AuthLogo({ title, subtitle }) {
    return (
        <div className="flex flex-col items-center mb-6 text-center">
            <div className="relative mb-2">
                <img
                    src={devflowLogo}
                    alt="DevFlow Logo"
                    className="w-24 h-24 object-contain filter drop-shadow-[3px_3px_0px_#000]"
                />
            </div>

            <div className="inline-block bg-black text-white px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-widest mb-3">
                DEVFLOW PLATFORM
            </div>

            <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                {title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm font-mono text-gray-600 max-w-xs leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}
