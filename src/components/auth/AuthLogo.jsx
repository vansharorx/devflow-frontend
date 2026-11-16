import devflowLogo from "../../assets/devflow-login.png";

export default function AuthLogo({ title, subtitle }) {
    return (
        <div className="flex flex-col items-center mb-6 text-center">
            <div className="relative mb-2">
                <img
                    src={devflowLogo}
                    alt="DevFlow Logo"
                    className="w-20 h-20 object-contain filter drop-shadow-[3px_3px_0px_#000]"
                />
            </div>

            <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                {title}
            </h1>

            {subtitle && (
                <p className="mt-2 text-xs sm:text-sm font-mono text-gray-600 max-w-xs leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
