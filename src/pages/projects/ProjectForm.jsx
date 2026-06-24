import { useState } from "react";

export default function ProjectForm({
  onCreate
}) {

  const [name, setName] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name.trim()) return;

    onCreate(name);

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      gap-3
      mb-6
    "
    >

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e)=>
          setName(e.target.value)
        }
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
          cursor-pointer
          hover:bg-[#17453b]
          transition-colors
        "
      >
        Create
      </button>

    </form>
  );
}