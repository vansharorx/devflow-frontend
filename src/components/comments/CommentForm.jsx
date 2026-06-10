import { useState } from "react";

export default function CommentForm({
  onSubmit
}) {

  const [content,
    setContent] =
      useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!content.trim()) return;

    onSubmit(content);

    setContent("");
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="mb-6"
    >

      <textarea
        value={content}
        onChange={(e)=>
          setContent(
            e.target.value
          )
        }
        placeholder="Write a comment..."
        className="
        w-full
        border
        rounded-lg
        p-3
        min-h-[100px]
      "
      />

      <button
        className="
        mt-3
        bg-[#102C26]
        text-white
        px-5
        py-2
        rounded-lg
      "
      >
        Add Comment
      </button>

    </form>
  );
}