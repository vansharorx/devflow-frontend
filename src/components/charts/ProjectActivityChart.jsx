import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ProjectActivityChart({
  data
}) {

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
        Project Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="issues"
            fill="#102C26"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}