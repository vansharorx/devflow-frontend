import { useState } from "react";

export default function IssueForm({
  onCreate
}) {

  const [title, setTitle] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    onCreate(title);

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Issue Title"
        className="
        flex-1
        border
        p-3
        rounded-lg
      "
      />

      <button
        className="
        bg-[#102C26]
        text-white
        px-6
        rounded-lg
      "
      >
        Create
      </button>

    </form>
  );
}