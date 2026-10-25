import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ProjectActivityChart({ data = [] }) {
    return (
        <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6 h-[400px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#FF8A00] border border-black inline-block"></span>
                    Project Activity
                </h2>
                <span className="font-mono text-xs text-gray-500 font-bold">
                    // ISSUE DENSITY
                </span>
            </div>

            <div className="w-full flex-1 min-h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#000"
                            tick={{ fontFamily: "Space Mono, monospace", fontSize: 11, fontWeight: "bold" }}
                        />
                        <YAxis
                            stroke="#000"
                            tick={{ fontFamily: "Space Mono, monospace", fontSize: 11, fontWeight: "bold" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFE600",
                                border: "2px solid #000",
                                boxShadow: "3px 3px 0px #000",
                                borderRadius: "0px",
                                fontFamily: "Space Mono, monospace",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        />
                        <Bar
                            dataKey="issues"
                            fill="#00D2FF"
                            stroke="#000"
                            strokeWidth={2}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
