import { useEffect, useState } from "react";

import api from "../../services/api";

import StatCard from "../../components/ui/StatCard";

import IssueStatusChart from "../../components/charts/IssueStatusChart";

import ProjectActivityChart from "../../components/charts/ProjectActivityChart";

export default function DashboardPage() {

  const [dashboardData,
    setDashboardData] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res =
        await api.get(
          "/dashboard"
        );

      setDashboardData(
        res.data.data
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <h2><LoadingSpinner /></h2>;
  }

  const issueStatusData = [

    {
      name: "Open",
      value:
        dashboardData
        ?.issuesByStatus
        ?.open || 0
    },

    {
      name: "In Progress",
      value:
        dashboardData
        ?.issuesByStatus
        ?.inProgress || 0
    },

    {
      name: "Closed",
      value:
        dashboardData
        ?.issuesByStatus
        ?.closed || 0
    }

  ];

  const projectActivityData =

    dashboardData
    ?.topProjects
    ?.map(project => ({

      name:
        project.name,

      issues:
        project.totalIssues

    })) || [];

  return (

    <div>

      <h1
        className="
        heading-font
        text-3xl
        text-[#102C26]
        mb-8
      "
      >
        Dashboard
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
      >

        <StatCard
          title="Users"
          value={
            dashboardData
              .totals
              .users
          }
        />

        <StatCard
          title="Projects"
          value={
            dashboardData
              .totals
              .projects
          }
        />

        <StatCard
          title="Issues"
          value={
            dashboardData
              .totals
              .issues
          }
        />

      </div>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        mt-8
      "
      >

        <IssueStatusChart
          data={
            issueStatusData
          }
        />

        <ProjectActivityChart
          data={
            projectActivityData
          }
        />

      </div>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        mt-8
      "
      >

        <div
          className="
          bg-white
          rounded-xl
          p-6
          shadow
        "
        >

          <h2
            className="
            heading-font
            mb-4
          "
          >
            Top Users
          </h2>

          {

            dashboardData
              .topUsers
              ?.map(user => (

              <div
                key={user.id}
                className="
                py-2
                border-b
              "
              >
                {user.name}
                {" - "}
                {
                  user.totalIssuesCreated
                }
              </div>

            ))
          }

        </div>

        <div
          className="
          bg-white
          rounded-xl
          p-6
          shadow
        "
        >

          <h2
            className="
            heading-font
            mb-4
          "
          >
            Top Projects
          </h2>

          {

            dashboardData
              .topProjects
              ?.map(project => (

              <div
                key={project.id}
                className="
                py-2
                border-b
              "
              >
                {project.name}
                {" - "}
                {
                  project.totalIssues
                }
              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}