import { Link } from "react-router-dom";

export default function AuthFooter({ text, linkText, to, className = "", onSwitch }) {
    const handleClick = (e) => {
        if (onSwitch) {
            e.preventDefault();
            onSwitch(to);
        }
    };

    return (
        <p
            className={`text-center font-mono text-xs text-gray-700 ${
                className || "mt-6 pt-4 border-t-2 border-black/10"
            }`}
        >
            {text}{" "}
            <Link
                to={to}
                onClick={handleClick}
                className="group inline-flex items-center text-black font-bold uppercase underline decoration-2 decoration-[#FFE600] hover:bg-[#FFE600] px-1 py-0.5 transition-all duration-150 ml-1 cursor-pointer"
            >
                <span>{linkText}</span>
                <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1 font-sans">
                    →
                </span>
            </Link>
        </p>
    );
}
