import {
  useEffect,
  useState
} from "react";

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

      console.log(err);
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

              </div>

              <button
                onClick={() =>
                  deleteProject(
                    project.id
                  )
                }
                className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded
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