export default function AuthDivider() {

  return (

    <div
      className="
        flex
        items-center
        my-6
      "
    >

      <div className="flex-1 h-px bg-gray-300" />

      <span
        className="
          px-4
          text-sm
          text-gray-500
        "
      >
        OR
      </span>

      <div className="flex-1 h-px bg-gray-300" />

    </div>

  );

}