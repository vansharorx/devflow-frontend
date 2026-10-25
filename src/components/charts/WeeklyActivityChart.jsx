import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function WeeklyActivityChart({ data = [] }) {
    return (
        <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6 h-[440px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-2">
                <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#00D2FF] border border-black inline-block"></span>
                    Weekly Activity
                </h2>
                <span className="font-mono text-xs text-gray-500 font-bold">
                    // VELOCITY
                </span>
            </div>

            <div className="w-full flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" opacity={0.2} />

                        <XAxis
                            dataKey="day"
                            stroke="#000000"
                            tick={{ fontFamily: "Space Mono, monospace", fontSize: 11, fontWeight: "bold" }}
                            tickFormatter={(value) => {
                                try {
                                    return new Date(value).toLocaleDateString("en-US", {
                                        weekday: "short",
                                    });
                                } catch {
                                    return value;
                                }
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                            stroke="#000000"
                            tick={{ fontFamily: "Space Mono, monospace", fontSize: 11, fontWeight: "bold" }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFE600",
                                border: "2px solid #000000",
                                boxShadow: "3px 3px 0px #000000",
                                borderRadius: "0px",
                                fontFamily: "Space Mono, monospace",
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                            labelFormatter={(value) => {
                                try {
                                    return new Date(value).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "short",
                                    });
                                } catch {
                                    return value;
                                }
                            }}
                        />

                        <Line
                            type="linear"
                            dataKey="issues"
                            stroke="#000000"
                            strokeWidth={3}
                            dot={{
                                r: 5,
                                fill: "#FFE600",
                                stroke: "#000000",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 8,
                                fill: "#FF5E7E",
                                stroke: "#000000",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
