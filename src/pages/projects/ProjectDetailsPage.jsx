import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bug, CheckCircle, Clock } from "lucide-react";

import api from "../../services/api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";

export default function ProjectDetailsPage() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    const fetchProjectData = async () => {
        try {
            setLoading(true);
            const [projRes, issuesRes] = await Promise.all([
                api.get(`/projects/${id}`),
                api.get(`/issues`),
            ]);

            setProject(projRes.data.data);
            const filtered = issuesRes.data.data.filter((issue) => issue.projectId == id);
            setIssues(filtered);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!project) {
        return <EmptyState title="Project not found" />;
    }

    const openCount = issues.filter(i => i.status === "Open" || i.status === "open").length;
    const closedCount = issues.filter(i => i.status === "Closed" || i.status === "closed").length;

    return (
        <div className="space-y-6">
            {/* Navigation back */}
            <div>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] transition-colors"
                >
                    <ArrowLeft size={14} strokeWidth={2.5} />
                    <span>Back to Projects</span>
                </Link>
            </div>

            {/* Project Header Banner */}
            <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-[#00D2FF] text-black border-2 border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                        PROJECT REPO
                    </span>
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                        ID: {project.id}
                    </span>
                </div>

                <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                    {project.name}
                </h1>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-gray-600">
                            Total Issues
                        </span>
                        <Bug size={18} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl font-extrabold text-black mt-2">
                        {issues.length}
                    </p>
                </div>

                <div className="bg-[#FFE600] border-[3px] border-black p-5 shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-black">
                            Open Issues
                        </span>
                        <Clock size={18} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl font-extrabold text-black mt-2">
                        {openCount}
                    </p>
                </div>

                <div className="bg-[#00E676] border-[3px] border-black p-5 shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-black">
                            Resolved Issues
                        </span>
                        <CheckCircle size={18} strokeWidth={2.5} />
                    </div>
                    <p className="heading-font text-4xl font-extrabold text-black mt-2">
                        {closedCount}
                    </p>
                </div>
            </div>

            {/* Issues List */}
            <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] p-6">
                <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                    <h2 className="heading-font text-xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
                        <span className="w-3 h-3 bg-black inline-block"></span>
                        Project Issue Tracker
                    </h2>
                    <span className="font-mono text-xs font-bold text-gray-500">
                        {issues.length} items logged
                    </span>
                </div>

                {issues.length === 0 ? (
                    <EmptyState title="No issues linked to this project yet." />
                ) : (
                    <div className="divide-y-2 divide-black/10">
                        {issues.map((issue) => (
                            <div
                                key={issue.id}
                                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFFDF5] px-2 transition-colors font-mono"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-black inline-block flex-shrink-0"></span>
                                    <div>
                                        <p className="font-bold text-sm text-black">
                                            {issue.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Status: <span className="font-bold text-black uppercase">{issue.status}</span>
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to={`/issues/${issue.id}`}
                                    className="bg-[#FFE600] text-black border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 transition-all self-start sm:self-center"
                                >
                                    Discussion →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
