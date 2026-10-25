export default function DashboardStatCard({ title, value, color = "#000000" }) {
    return (
        <div
            className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_#000] relative hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all"
        >
            <div
                className="absolute top-0 left-0 bottom-0 w-2.5 border-r-2 border-black"
                style={{ backgroundColor: color }}
            />

            <div className="pl-3">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                    {title}
                </p>

                <h2 className="heading-font text-3xl sm:text-4xl font-extrabold mt-1 text-black tracking-tight">
                    {value}
                </h2>
            </div>
        </div>
    );
}
