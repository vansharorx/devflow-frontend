export default function StatCard({
  title,
  value
}) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-6

        hover:shadow-lg
        transition
        duration-300
        hover:-translate-y-1
      "
    >
      <p
        className="
          text-gray-500
          text-sm
        "
      >
        {title}
      </p>

      <h2
        className="
          text-3xl
          font-bold
          text-[#102C26]
          mt-2
        "
      >
        {value}
      </h2>
    </div>
  );
}