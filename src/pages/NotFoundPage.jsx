import {
  Link
} from "react-router-dom";

export default function NotFoundPage() {

  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      justify-center
      items-center
    "
    >

      <h1
        className="
        text-6xl
        heading-font
        text-[#102C26]
      "
      >
        404
      </h1>

      <p className="mt-4">
        Page not found
      </p>

      <Link
        to="/"
        className="
        mt-6
        bg-[#102C26]
        text-white
        px-5
        py-2
        rounded-lg
        "
      >
        Back Home
      </Link>

    </div>
  );
}