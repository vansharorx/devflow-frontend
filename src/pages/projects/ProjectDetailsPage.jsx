import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../services/api";

export default function ProjectDetailsPage() {

  const { id } =
    useParams();

  const [project,
    setProject] =
      useState(null);

  const [issues,
    setIssues] =
      useState([]);

  useEffect(() => {

    fetchProject();

    fetchIssues();

  }, []);

  const fetchProject =
    async () => {

    try {

      const res =
        await api.get(
          `/projects/${id}`
        );

      setProject(
        res.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const fetchIssues =
    async () => {

    try {

      const res =
        await api.get(
          `/issues`
        );

      const filtered =
        res.data.data.filter(
          issue =>
            issue.projectId ==
            id
        );

      setIssues(
        filtered
      );

    } catch (err) {

      console.log(err);
    }
  };

  if (!project) {
    return <h2>Loading...</h2>;
  }

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
        {project.name}
      </h1>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mb-8
      "
      >

        <div
          className="
          bg-white
          p-6
          rounded-xl
          shadow
        "
        >
          <h3>Total Issues</h3>

          <p
            className="
            text-3xl
            font-bold
            text-[#102C26]
          "
          >
            {issues.length}
          </p>

        </div>

      </div>

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
      "
      >

        <h2
          className="
          heading-font
          mb-4
        "
        >
          Issues
        </h2>

        {

          issues.map(issue => (

            <div
              key={issue.id}
              className="
              py-3
              border-b
            "
            >
              {issue.title}
            </div>

          ))
        }

      </div>

    </div>
  );
}