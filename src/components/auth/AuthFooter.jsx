import { Link } from "react-router-dom";

export default function AuthFooter({ text, linkText, to }) {
    return (
        <p className="text-center font-mono text-xs text-gray-700 mt-6 pt-4 border-t-2 border-black/10">
            {text}{" "}
            <Link
                to={to}
                className="text-black font-bold uppercase underline decoration-2 decoration-[#FFE600] hover:bg-[#FFE600] px-1 py-0.5 transition-colors ml-1"
            >
                {linkText} →
            </Link>
        </p>
    );
}
