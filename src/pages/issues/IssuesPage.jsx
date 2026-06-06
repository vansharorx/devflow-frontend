import {
  useEffect,
  useState
} from "react";

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

      <div
        className="
        grid
        gap-4
      "
      >

        {
          issues.map(
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

            </div>

          ))
        }

      </div>

    </div>
  );
}