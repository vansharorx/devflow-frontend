export default function AuthLogo({
  title,
  subtitle
}) {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        mb-8
      "
    >

      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-[#102C26]
          text-[#F7E7CE]
          flex
          items-center
          justify-center
          heading-font
          text-2xl
          shadow-md
          mb-5
        "
      >
        D
      </div>

      <h1
        className="
          heading-font
          text-3xl
          text-[#102C26]
          text-center
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-3
          text-gray-500
          text-center
          leading-relaxed
        "
      >
        {subtitle}
      </p>

    </div>

  );

}