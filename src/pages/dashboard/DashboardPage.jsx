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
            value: dashboardData?.issuesByStatus?.open || 0,
        },
        {
            name: "In Progress",
            value: dashboardData?.issuesByStatus?.inProgress || 0,
        },
        {
            name: "Closed",
            value: dashboardData?.issuesByStatus?.closed || 0,
        },
    ];

    const weeklyActivityData = dashboardData?.weeklyActivity || [];
    const projectProgressData = dashboardData?.projectProgress || [];
    const recentActivities = dashboardData?.recentActivities || [];

    return (
        <div className="space-y-8">
            {/* Header / Hero Section in Reference Style */}
            <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] relative">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-[#FFE600] text-black border-2 border-black px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                        SYSTEM // OVERVIEW
                    </span>
                    <span className="bg-[#00D2FF] text-black border-2 border-black px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                        Q4 SPRINT
                    </span>
                </div>

                <h1 className="heading-font text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
                    Where developers{" "}
                    <span className="bg-[#FFE600] px-2 py-0.5 border-2 border-black inline-block shadow-[3px_3px_0px_#000]">
                        actually
                    </span>{" "}
                    ship code.
                </h1>

                <p className="mt-3 text-xs sm:text-sm font-mono text-gray-700 max-w-2xl font-bold">
                    Real-time pulse across projects, active bug triage, and contributor velocity.
                </p>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <StatCard
                    title="Active Members"
                    value={dashboardData?.totals?.users || 0}
                    color="#FFE600"
                />
                <StatCard
                    title="Total Projects"
                    value={dashboardData?.totals?.projects || 0}
                    color="#00D2FF"
                />
                <StatCard
                    title="Tracked Issues"
                    value={dashboardData?.totals?.issues || 0}
                    color="#FF5E7E"
                />
            </div>

            {/* Quick Status Cards - Reference High-Contrast Colors */}
            <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-black mb-3">
                    // Issue Status Breakdown
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Open */}
                    <div className="bg-[#FF5E7E] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black relative">
                        <div className="flex items-center justify-between">
                            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                                STATUS 01
                            </span>
                            <span className="text-xs font-mono font-bold uppercase">UNRESOLVED</span>
                        </div>
                        <h2 className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                            {dashboardData?.issuesByStatus?.open || 0}
                        </h2>
                        <p className="font-mono text-xs font-bold uppercase mt-1 tracking-wider">
                            Open Issues
                        </p>
                    </div>

                    {/* In Progress */}
                    <div className="bg-[#FFE600] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black relative">
                        <div className="flex items-center justify-between">
                            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                                STATUS 02
                            </span>
                            <span className="text-xs font-mono font-bold uppercase">ACTIVE SPRINT</span>
                        </div>
                        <h2 className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                            {dashboardData?.issuesByStatus?.inProgress || 0}
                        </h2>
                        <p className="font-mono text-xs font-bold uppercase mt-1 tracking-wider">
                            In Progress
                        </p>
                    </div>

                    {/* Closed */}
                    <div className="bg-[#00E676] border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] text-black relative">
                        <div className="flex items-center justify-between">
                            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                                STATUS 03
                            </span>
                            <span className="text-xs font-mono font-bold uppercase">COMPLETED</span>
                        </div>
                        <h2 className="heading-font text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">
                            {dashboardData?.issuesByStatus?.closed || 0}
                        </h2>
                        <p className="font-mono text-xs font-bold uppercase mt-1 tracking-wider">
                            Closed Issues
                        </p>
                    </div>
                </div>
            </div>

            {/* Row 1: Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <IssueStatusChart data={issueStatusData} />
                <WeeklyActivityChart data={weeklyActivityData} />
            </div>

            {/* Row 2: Progress & Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ProjectProgressChart data={projectProgressData} />
                <RecentActivity activities={recentActivities} />
            </div>

            {/* Row 3: Top Contributors & Top Projects */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Top Contributors */}
                <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                        <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#00D2FF] border border-black inline-block"></span>
                            Top Contributors
                        </h2>
                        <span className="font-mono text-xs text-gray-500 font-bold">
                            // RANKED BY ISSUES
                        </span>
                    </div>

                    <div className="divide-y-2 divide-black/10">
                        {dashboardData?.topUsers && dashboardData.topUsers.length > 0 ? (
                            dashboardData.topUsers.map((user, idx) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between py-3 font-mono hover:bg-[#FFFDF5] px-2 transition-colors"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-6 h-6 bg-black text-white text-xs font-bold flex items-center justify-center border border-black">
                                            #{idx + 1}
                                        </span>
                                        <span className="font-bold text-sm text-black">
                                            {user.name}
                                        </span>
                                    </div>

                                    <span className="bg-[#FFE600] text-black border-2 border-black px-2.5 py-0.5 text-xs font-bold shadow-[2px_2px_0px_#000]">
                                        {user.totalIssuesCreated} Issues
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs font-mono text-gray-500 py-4 text-center">
                                // No contributor data logged
                            </p>
                        )}
                    </div>
                </div>

                {/* Top Projects */}
                <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-6">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                        <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#FF5E7E] border border-black inline-block"></span>
                            Top Projects
                        </h2>
                        <span className="font-mono text-xs text-gray-500 font-bold">
                            // VOLUME LOAD
                        </span>
                    </div>

                    <div className="divide-y-2 divide-black/10">
                        {dashboardData?.topProjects && dashboardData.topProjects.length > 0 ? (
                            dashboardData.topProjects.map((project, idx) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between py-3 font-mono hover:bg-[#FFFDF5] px-2 transition-colors"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-6 h-6 bg-[#00E676] text-black text-xs font-bold flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_#000]">
                                            {idx + 1}
                                        </span>
                                        <span className="font-bold text-sm text-black">
                                            {project.name}
                                        </span>
                                    </div>

                                    <span className="bg-[#00D2FF] text-black border-2 border-black px-2.5 py-0.5 text-xs font-bold shadow-[2px_2px_0px_#000]">
                                        {project.totalIssues} Issues
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs font-mono text-gray-500 py-4 text-center">
                                // No project volume logged
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
