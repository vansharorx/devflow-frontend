export default function LoadingSpinner() {
    return (
        <div className="flex flex-col justify-center items-center py-12 gap-3">
            <div className="w-10 h-10 bg-[#FFE600] border-[3px] border-black shadow-[4px_4px_0px_#000] animate-spin" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black bg-white border border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                LOADING DATA...
            </span>
        </div>
    );
}
