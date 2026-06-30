export default function GoogleButton({ onClick }) {

  return (

    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        border
        border-gray-300
        rounded-lg
        py-3
        bg-white
        hover:bg-gray-50
        transition
        cursor-pointer
        font-medium
        text-[#102C26]
      "
    >
      Continue with Google
    </button>

  );

}