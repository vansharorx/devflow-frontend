import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function WeeklyActivityChart({

  data

}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        border
        border-gray-100
        p-6
      "
    >

      <h2
        className="
          heading-font
          text-xl
          text-[#102C26]
          mb-6
        "
      >
        Weekly Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            tickFormatter={(value) => {

                return new Date(value).toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
                );

            }}
            />

          <YAxis
            allowDecimals={false}
          />

          <Tooltip

            labelFormatter={(value) =>

                new Date(value).toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "short"
                }
                )

            }

            />

          <Line

            type="monotone"

            dataKey="issues"

            stroke="#102C26"

            strokeWidth={3}

            dot={{
              r: 5
            }}

            activeDot={{
              r: 8
            }}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}