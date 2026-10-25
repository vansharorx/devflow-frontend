export default function EmptyState({ title = "No records found" }) {
    return (
        <div className="border-[3px] border-dashed border-black bg-white p-8 sm:p-10 text-center shadow-[4px_4px_0px_#000]">
            <div className="w-12 h-12 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] mx-auto mb-3 flex items-center justify-center font-mono font-bold text-lg">
                !
            </div>
            <p className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                {title}
            </p>
            <p className="text-xs font-mono text-gray-500 mt-1">
                // No entries currently logged in this view
            </p>
        </div>
    );
}
