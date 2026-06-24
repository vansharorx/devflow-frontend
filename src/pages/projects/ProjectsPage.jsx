import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api from "../../services/api";

import ProjectForm from "./ProjectForm";

export default function ProjectsPage() {

  const [projects,
    setProjects] =
      useState([]);

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res =
        await api.get(
          "/projects"
        );

      setProjects(
        res.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const createProject =
    async (name) => {

    try {

      await api.post(
        "/projects",
        {
          name
        }
      );

      fetchProjects();

    } catch (err) {
        console.log("Status:", err.response?.status);
        console.log("Response:", err.response?.data);
      }
  };

  const deleteProject =
    async (id) => {

    try {

      await api.delete(
        `/projects/${id}`
      );

      fetchProjects();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div>

      <h1
        className="
        heading-font
        text-3xl
        text-[#102C26]
        mb-6
      "
      >
        Projects
      </h1>

      <ProjectForm
        onCreate={
          createProject
        }
      />

      <div
        className="
        grid
        gap-4
      "
      >

        {
          projects.map(
            project => (

            <div
              key={project.id}
              className="
              bg-white
              shadow
              rounded-xl
              p-5
              flex
              justify-between
              items-center
            "
            >

              <div>

                <h2
                  className="
                  font-semibold
                  text-lg
                "
                >
                  {project.name}
                </h2>

                <Link
                  to={`/projects/${project.id}`}
                  className="
                  text-[#102C26]
                  underline
                  text-sm
                "
                >
                  View Details
                </Link>

              </div>

              <button
                onClick={() => deleteProject(project.id)}
                className="
                  text-red-500
                  cursor-pointer
                  hover:underline
                  transition-colors
                "
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>
  );
}