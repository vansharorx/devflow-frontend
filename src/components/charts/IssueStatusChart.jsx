import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function IssueStatusChart({
  data
}) {

  const COLORS = [
    "#102C26",
    "#F7E7CE",
    "#D9D9D9"
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
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >

            {
              data.map(
                (_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />

              ))
            }

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}