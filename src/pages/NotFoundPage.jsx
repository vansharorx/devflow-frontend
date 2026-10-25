import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-6 antialiased">
            <div className="bg-white border-[3px] border-black p-8 sm:p-12 shadow-[8px_8px_0px_#000] max-w-md w-full">
                <div className="inline-block bg-[#FF5E7E] text-black border-2 border-black px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
                    HTTP ERROR // 404
                </div>

                <h1 className="text-7xl sm:text-8xl heading-font font-extrabold text-black tracking-tighter">
                    404
                </h1>

                <p className="mt-3 font-mono text-sm font-bold text-gray-700 uppercase">
                    The requested route does not exist in workspace.
                </p>

                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#FFE600] hover:bg-[#ffe01a] text-black px-6 py-3 border-2 border-black font-mono text-xs uppercase font-bold tracking-wider shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                    >
                        <ArrowLeft size={16} strokeWidth={2.5} />
                        <span>Return to Dashboard</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
