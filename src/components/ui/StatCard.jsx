export default function StatCard({

  title,
  value,
  color = "#102C26"

}) {

  return (

    <div
      className="
        relative
        overflow-hidden
        bg-white
        rounded-2xl
        p-6
        shadow-md
        border
        border-gray-100
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      <div
        className="
          absolute
          top-0
          left-0
          w-2
          h-full
        "
        style={{
          backgroundColor: color
        }}
      />

      <p
        className="
          text-sm
          font-medium
          text-gray-500
          uppercase
          tracking-wide
          ml-2
        "
      >
        {title}
      </p>

      <h2
        className="
          heading-font
          text-4xl
          text-[#102C26]
          mt-3
          ml-2
        "
      >
        {value}
      </h2>

    </div>

  );

}