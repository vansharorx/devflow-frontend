export default function CommentList({
  comments
}) {

  return (

    <div
      className="
      space-y-4
    "
    >

      {
        comments.map(
          comment => (

          <div
            key={comment.id}
            className="
            bg-white
            p-4
            rounded-xl
            shadow
          "
          >

            <p>
              {comment.comment}
            </p>

            <p
              className="
              text-sm
              text-gray-500
              mt-2
            "
            >
              {
                comment.created_at
              }
            </p>

          </div>

        ))
      }

    </div>
  );
}