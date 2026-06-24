import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function IssueStatusChart({
  data
}) {

  const COLORS = [
    "#102C26", // Open
    "#F4A261", // In Progress
    "#E63946"  // Closed
  ];

  return (

    <div
      className="
        bg-white
        p-6
        rounded-xl
        shadow
      "
    >

      <h2
        className="
          heading-font
          mb-4
        "
      >
        Issues by Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          >

            {
              data.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))
            }

          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#102C26",
              border: "none",
              borderRadius: "8px",
              color: "#fff"
            }}
            labelStyle={{
              color: "#fff"
            }}
            itemStyle={{
              color: "#fff"
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}