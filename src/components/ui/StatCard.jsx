export default function StatCard({ title, value, color = "#FFE600" }) {
    return (
        <div className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_#000] relative group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all">
            {/* Top colored accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-2 border-b-2 border-black"
                style={{ backgroundColor: color }}
            />

            <div className="mt-1 flex items-center justify-between">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
                    // {title}
                </p>
                <span
                    className="w-3 h-3 border border-black inline-block"
                    style={{ backgroundColor: color }}
                />
            </div>

            <h2 className="heading-font text-4xl sm:text-5xl font-extrabold text-black mt-2 tracking-tight">
                {value}
            </h2>
        </div>
    );
}
