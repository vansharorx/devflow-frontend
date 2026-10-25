export default function AuthDivider() {
    return (
        <div className="flex items-center my-5">
            <div className="flex-1 h-[2px] bg-black" />
            <span className="px-3 py-0.5 mx-2 bg-[#F5F0E6] border-2 border-black font-mono text-[11px] font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_#000]">
                OR
            </span>
            <div className="flex-1 h-[2px] bg-black" />
        </div>
    );
}
