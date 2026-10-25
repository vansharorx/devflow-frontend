export default function AuthCard({ children }) {
    return (
        <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 relative">
            {/* Top decorative badge */}
            <div className="absolute -top-3.5 right-6 bg-[#FFE600] border-2 border-black px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                AUTH // SECURE
            </div>
            {children}
        </div>
    );
}
