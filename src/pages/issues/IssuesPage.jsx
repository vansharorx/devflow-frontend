import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bug, Search, Trash2, MessageSquare } from "lucide-react";

import api from "../../services/api";

import IssueForm from "./IssueForm";
import UserSelect from "../../components/ui/UserSelect";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function IssuesPage() {
    const [issues, setIssues] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [issuesRes, usersRes] = await Promise.all([
                api.get("/issues"),
                api.get("/users"),
            ]);

            setIssues(issuesRes.data.data);
            setUsers(usersRes.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchIssues = async () => {
        try {
            const res = await api.get("/issues");
            setIssues(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const createIssue = async (title, projectId) => {
        try {
            await api.post("/issues", {
                title,
                projectId,
            });

            fetchIssues();
        } catch (err) {
            console.log(err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/issues/${id}/status`, {
                status,
            });

            fetchIssues();
        } catch (err) {
            console.log(err);
        }
    };

    const assignIssue = async (issueId, userId) => {
        try {
            await api.put(`/issues/${issueId}/assign`, {
                userId,
            });

            fetchIssues();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteIssue = async (id) => {
        if (!window.confirm("Are you sure you want to delete this issue?")) return;

        try {
            await api.delete(`/issues/${id}`);
            fetchIssues();
        } catch (err) {
            console.log(err);
        }
    };

    const filteredIssues = issues.filter((issue) => {
        const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || issue.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status = "") => {
        const s = status.toLowerCase();
        if (s === "open") {
            return "bg-[#FF5E7E] text-black";
        }
        if (s === "in progress") {
            return "bg-[#FFE600] text-black";
        }
        if (s === "closed") {
            return "bg-[#00E676] text-black";
        }
        return "bg-white text-black";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            WORKSPACE // TRACKER
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Issue Tracker
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#FF5E7E] text-black border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        {issues.length} Total {issues.length === 1 ? "Issue" : "Issues"}
                    </span>
                </div>
            </div>

            {/* Create Issue Form */}
            <IssueForm onCreate={createIssue} />

            {/* Filter and Search Bar */}
            <div className="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        strokeWidth={2.5}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black"
                    />
                    <input
                        type="text"
                        placeholder="Search issues by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border-2 border-black font-mono text-xs sm:text-sm bg-[#FFFDF8] shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#000] transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-black hidden md:inline">
                        Filter:
                    </span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border-2 border-black px-4 py-2.5 font-mono text-xs sm:text-sm font-bold bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] focus:outline-none cursor-pointer"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Open">Open Only</option>
                        <option value="In Progress">In Progress Only</option>
                        <option value="Closed">Closed Only</option>
                    </select>
                </div>
            </div>

            {/* Issues List */}
            {loading ? (
                <LoadingSpinner />
            ) : filteredIssues.length === 0 ? (
                <EmptyState title="No matching issues found" />
            ) : (
                <div className="grid gap-4">
                    {filteredIssues.map((issue) => (
                        <div
                            key={issue.id}
                            className="bg-white border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col gap-4"
                        >
                            {/* Card Top: Title & Delete */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-[#FF5E7E] border-2 border-black shadow-[2px_2px_0px_#000] text-black flex-shrink-0 mt-0.5">
                                        <Bug size={18} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                                                ISSUE #{issue.id}
                                            </span>
                                            <span
                                                className={`border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${getStatusBadge(
                                                    issue.status
                                                )}`}
                                            >
                                                {issue.status}
                                            </span>
                                        </div>
                                        <h2 className="heading-font text-lg sm:text-xl font-bold text-black mt-1 tracking-tight">
                                            {issue.title}
                                        </h2>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteIssue(issue.id)}
                                    className="bg-[#FF5E7E] hover:bg-[#ff476b] text-black border-2 border-black p-2 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 transition-all cursor-pointer flex-shrink-0"
                                    title="Delete issue"
                                >
                                    <Trash2 size={16} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Card Controls: Assignee & Status changer & Open Discussion */}
                            <div className="pt-3 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-mono font-bold uppercase text-gray-500">
                                            Assignee:
                                        </span>
                                        <UserSelect
                                            users={users}
                                            value={issue.assigned_to}
                                            onChange={(e) => assignIssue(issue.id, e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-mono font-bold uppercase text-gray-500">
                                            Update:
                                        </span>
                                        <select
                                            value={issue.status}
                                            onChange={(e) => updateStatus(issue.id, e.target.value)}
                                            className="border-2 border-black bg-[#FFFDF5] px-2.5 py-1.5 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] focus:outline-none cursor-pointer"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                <Link
                                    to={`/issues/${issue.id}`}
                                    className="bg-[#FFE600] hover:bg-[#ffe01a] text-black border-2 border-black px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1.5 ml-auto"
                                >
                                    <MessageSquare size={14} strokeWidth={2.5} />
                                    <span>Discussion</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
