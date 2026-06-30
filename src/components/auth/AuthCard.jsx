export default function AuthCard({ children }) {

  return (

    <div
      className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-gray-200
        px-8
        py-10
      "
    >

      {children}

    </div>

  );

}