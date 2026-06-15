export default function EmptyState({
  title
}) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      p-8
      shadow
      text-center
    "
    >

      <p
        className="
        text-gray-500
      "
      >
        {title}
      </p>

    </div>
  );
}