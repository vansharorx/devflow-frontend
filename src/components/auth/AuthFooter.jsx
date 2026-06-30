import { Link } from "react-router-dom";

export default function AuthFooter({

  text,
  linkText,
  to

}) {

  return (

    <p
      className="
        text-center
        text-sm
        text-gray-600
        mt-8
      "
    >

      {text}{" "}

      <Link
        to={to}
        className="
          text-[#102C26]
          font-semibold
          hover:underline
        "
      >
        {linkText}
      </Link>

    </p>

  );

}