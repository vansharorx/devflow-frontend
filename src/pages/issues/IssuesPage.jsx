import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api from "../../services/api";

import IssueForm from "./IssueForm";

import UserSelect
from "../../components/ui/UserSelect";

export default function IssuesPage() {

  const [issues,
    setIssues] =
      useState([]);

  const [users,
    setUsers] =
      useState([]);

  const [search,
    setSearch] =
      useState("");

  const [statusFilter,
    setStatusFilter] =
      useState("All");

  useEffect(() => {

    fetchIssues();

    fetchUsers();

  }, []);

  const fetchIssues = async () => {

    try {

      const res =
        await api.get(
          "/issues"
        );

      setIssues(
        res.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const fetchUsers = async () => {

    try {

      const res =
        await api.get(
          "/users"
        );

      setUsers(
        res.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const createIssue =
    async (title) => {

    try {

      await api.post(
        "/issues",
        {
          title
        }
      );

      fetchIssues();

    } catch (err) {

      console.log(err);
    }
  };

  const updateStatus =
    async (
      id,
      status
    ) => {

    try {

      await api.put(
        `/issues/${id}`,
        {
          status
        }
      );

      fetchIssues();

    } catch (err) {

      console.log(err);
    }
  };

  const assignIssue =
    async (
      issueId,
      userId
    ) => {

    try {

      await api.put(
        `/issues/${issueId}`,
        {
          assignedTo: userId
        }
      );

      fetchIssues();

    } catch (err) {

      console.log(err);
    }
  };

  const deleteIssue =
    async (id) => {

    try {

      await api.delete(
        `/issues/${id}`
      );

      fetchIssues();

    } catch (err) {

      console.log(err);
    }
  };

  const filteredIssues =
    issues.filter(issue => {

      const matchesSearch =

        issue.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "All"
        ||
        issue.status ===
        statusFilter;

      return (
        matchesSearch
        &&
        matchesStatus
      );
    });

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
        Issues
      </h1>

      <IssueForm
        onCreate={
          createIssue
        }
      />

      <span
        className="
        bg-[#102C26]
        text-white
        px-3
        py-1
        rounded-full
        inline-block
        mb-4
      "
      >
        {issues.length} Issues
      </span>

      <div
        className="
        flex
        gap-4
        mb-6
      "
      >

        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded-lg
          flex-1
        "
        />

        <select
          value={statusFilter}
          onChange={(e)=>
            setStatusFilter(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded-lg
        "
        >

          <option>
            All
          </option>

          <option>
            Open
          </option>

          <option>
            In Progress
          </option>

          <option>
            Closed
          </option>

        </select>

      </div>

      {
        filteredIssues.length === 0 && (

          <div
            className="
            bg-white
            rounded-xl
            p-6
            shadow
          "
          >

            No issues found.

          </div>

        )
      }

      <div
        className="
        grid
        gap-4
      "
      >

        {
          filteredIssues.map(
            issue => (

            <div
              key={issue.id}
              className="
              bg-white
              rounded-xl
              shadow
              p-5
            "
            >

              <div
                className="
                flex
                justify-between
              "
              >

                <h2
                  className="
                  font-semibold
                "
                >
                  {issue.title}
                </h2>

                <button
                  onClick={() =>
                    deleteIssue(
                      issue.id
                    )
                  }
                  className="
                  text-red-500
                "
                >
                  Delete
                </button>

              </div>

              <div
                className="
                mt-3
              "
              >

                <UserSelect

                  users={users}

                  value={
                    issue.assignedTo
                  }

                  onChange={(e)=>

                    assignIssue(
                      issue.id,
                      e.target.value
                    )

                  }

                />

              </div>

              <div
                className="
                mt-4
              "
              >

                <select
                  value={
                    issue.status
                  }
                  onChange={(e)=>

                    updateStatus(
                      issue.id,
                      e.target.value
                    )

                  }
                  className="
                  border
                  p-2
                "
                >

                  <option>
                    Open
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Closed
                  </option>

                </select>

              </div>

              <Link
                to={`/issues/${issue.id}`}
                className="
                text-[#102C26]
                underline
                text-sm
                mt-2
                inline-block
              "
              >
                Open Discussion
              </Link>

            </div>

          ))
        }

      </div>

    </div>
  );
}