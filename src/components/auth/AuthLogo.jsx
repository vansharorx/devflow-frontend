import devflowLogo from "../../assets/devflow-login.png";

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

      <img
        src={devflowLogo}
        alt="DevFlow Logo"
        className="
          w-40
          h-40
          object-contain
          -mb-8
          -mt-6
        "
      />

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