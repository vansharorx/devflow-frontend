import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function IssueStatusChart({ data = [] }) {
    const COLORS = [
        "#FF5E7E", // Open - vibrant coral
        "#FFE600", // In Progress - bright yellow
        "#00E676", // Closed - neon green
    ];

    return (
        <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6 h-[440px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-2">
                <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#FF5E7E] border border-black inline-block"></span>
                    Issues By Status
                </h2>
                <span className="font-mono text-xs text-gray-500 font-bold">
                    // DISTRIBUTION
                </span>
            </div>

            <div className="w-full flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={95}
                            innerRadius={30}
                            stroke="#000000"
                            strokeWidth={3}
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFFFFF",
                                border: "2px solid #000000",
                                boxShadow: "3px 3px 0px #000000",
                                borderRadius: "0px",
                                fontFamily: "Space Mono, monospace",
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                            itemStyle={{
                                color: "#000000",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => (
                                <span className="font-mono text-xs font-bold text-black uppercase">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
