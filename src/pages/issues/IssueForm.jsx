import { useState, useEffect } from "react";

import api from "../../services/api";

export default function IssueForm({
  onCreate
}) {

  const [title, setTitle] = useState("");

  const [projects, setProjects] = useState([]);

  const [projectId, setProjectId] = useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await api.get("/projects");

      setProjects(res.data.data);

      if (res.data.data.length > 0) {

        setProjectId(res.data.data[0].id);

      }

    } catch (err) {

      console.log(err);

    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim() || !projectId) return;

    onCreate(title, projectId);

    setTitle("");

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >

      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
          flex-1
          border
          rounded-lg
          p-3
        "
      />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="
          border
          rounded-lg
          p-3
        "
      >

        {
          projects.map(project => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>

          ))
        }

      </select>

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