import { useEffect, useState } from "react";

import api from "../../services/api";

import StatCard from "../../components/ui/StatCard";
import IssueStatusChart from "../../components/charts/IssueStatusChart";
import WeeklyActivityChart from "../../components/charts/WeeklyActivityChart";
import ProjectProgressChart from "../../components/charts/ProjectProgressChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await api.get("/dashboard");

      setDashboardData(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <LoadingSpinner />;

  }

  const issueStatusData = [

    {
      name: "Open",
      value: dashboardData?.issuesByStatus?.open || 0
    },

    {
      name: "In Progress",
      value: dashboardData?.issuesByStatus?.inProgress || 0
    },

    {
      name: "Closed",
      value: dashboardData?.issuesByStatus?.closed || 0
    }

  ];

  const weeklyActivityData =
    dashboardData?.weeklyActivity || [];

  const projectProgressData =
    dashboardData?.projectProgress || [];

  const recentActivities =
    dashboardData?.recentActivities || [];

  return (

    <div className="space-y-10">

      {/* Header */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-center
        "
      >

        <div>

          <h1
            className="
              heading-font
              text-4xl
              text-[#102C26]
            "
          >
            Welcome Back 🍃
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Here's what's happening across your workspace today.
          </p>

        </div>

      </div>

      {/* KPI Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >

        <StatCard
          title="Users"
          value={dashboardData?.totals?.users || 0}
          color="#102C26"
        />

        <StatCard
          title="Projects"
          value={dashboardData?.totals?.projects || 0}
          color="#3F6B5E"
        />

        <StatCard
          title="Issues"
          value={dashboardData?.totals?.issues || 0}
          color="#C69C3F"
        />

      </div>

      {/* Quick Status */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            bg-[#102C26]
            rounded-2xl
            shadow-lg
            p-6
            text-white
          "
        >

          <p className="text-sm opacity-80">

            Open Issues

          </p>

          <h2
            className="
              heading-font
              text-4xl
              mt-3
            "
          >

            {dashboardData?.issuesByStatus?.open || 0}

          </h2>

        </div>

        <div
          className="
            bg-[#3F6B5E]
            rounded-2xl
            shadow-lg
            p-6
            text-white
          "
        >

          <p className="text-sm opacity-80">

            In Progress

          </p>

          <h2
            className="
              heading-font
              text-4xl
              mt-3
            "
          >

            {dashboardData?.issuesByStatus?.inProgress || 0}

          </h2>

        </div>

        <div
          className="
            bg-[#C69C3F]
            rounded-2xl
            shadow-lg
            p-6
            text-white
          "
        >

          <p className="text-sm opacity-80">

            Closed Issues

          </p>

          <h2
            className="
              heading-font
              text-4xl
              mt-3
            "
          >

            {dashboardData?.issuesByStatus?.closed || 0}

          </h2>

        </div>

      </div>

      {/* Row 1 */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >

        <IssueStatusChart
          data={issueStatusData}
        />

        <WeeklyActivityChart
          data={weeklyActivityData}
        />

      </div>

      {/* Row 2 */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >

        <ProjectProgressChart
          data={projectProgressData}
        />

        <RecentActivity
          activities={recentActivities}
        />

      </div>

      {/* Row 3 */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >

        {/* Top Contributors */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            border
            border-gray-100
            p-6
          "
        >

          <h2
            className="
              heading-font
              text-xl
              text-[#102C26]
              mb-5
            "
          >

            Top Contributors

          </h2>

          {

            dashboardData?.topUsers?.map(user => (

              <div

                key={user.id}

                className="
                  flex
                  items-center
                  justify-between
                  py-3
                  border-b
                  border-gray-100
                "

              >

                <span
                  className="
                    font-medium
                    text-[#102C26]
                  "
                >

                  {user.name}

                </span>

                <span
                  className="
                    bg-[#F7E7CE]
                    text-[#102C26]
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  {user.totalIssuesCreated}

                </span>

              </div>

            ))

          }

        </div>

        {/* Top Projects */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            border
            border-gray-100
            p-6
          "
        >

          <h2
            className="
              heading-font
              text-xl
              text-[#102C26]
              mb-5
            "
          >

            Top Projects

          </h2>

          {

            dashboardData?.topProjects?.map(project => (

              <div

                key={project.id}

                className="
                  flex
                  items-center
                  justify-between
                  py-3
                  border-b
                  border-gray-100
                "

              >

                <span
                  className="
                    font-medium
                    text-[#102C26]
                  "
                >

                  {project.name}

                </span>

                <span
                  className="
                    bg-[#F7E7CE]
                    text-[#102C26]
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  {project.totalIssues}

                </span>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}