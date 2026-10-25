import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, ArrowRight, Trash2 } from "lucide-react";

import api from "../../services/api";
import ProjectForm from "./ProjectForm";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await api.get("/projects");
            setProjects(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (name) => {
        try {
            await api.post("/projects", {
                name,
            });

            fetchProjects();
        } catch (err) {
            console.log("Status:", err.response?.status);
            console.log("Response:", err.response?.data);
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-[3px] border-black">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                            WORKSPACE // REPOSITORIES
                        </span>
                    </div>
                    <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                        Projects
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-[#FFE600] border-2 border-black font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_#000]">
                        {projects.length} Active {projects.length === 1 ? "Project" : "Projects"}
                    </span>
                </div>
            </div>

            {/* Create Project Form */}
            <ProjectForm onCreate={createProject} />

            {/* Projects List */}
            {loading ? (
                <LoadingSpinner />
            ) : projects.length === 0 ? (
                <EmptyState title="No projects found. Create your first workspace project above." />
            ) : (
                <div className="grid gap-4">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="bg-white border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all"
                        >
                            <div className="flex items-start sm:items-center gap-3.5">
                                <div className="p-2.5 bg-[#00D2FF] border-2 border-black shadow-[2px_2px_0px_#000] text-black flex-shrink-0">
                                    <FolderKanban size={20} strokeWidth={2.5} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                                            #{String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <h2 className="heading-font text-xl font-bold text-black tracking-tight">
                                            {project.name}
                                        </h2>
                                    </div>
                                    <p className="text-xs font-mono text-gray-600 mt-0.5">
                                        ID: {project.id} // DevFlow Repository
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 self-end sm:self-center">
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="bg-[#FFE600] hover:bg-[#ffe01a] text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all flex items-center gap-1.5"
                                >
                                    <span>Details</span>
                                    <ArrowRight size={14} strokeWidth={2.5} />
                                </Link>

                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="bg-[#FF5E7E] hover:bg-[#ff476b] text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-wider p-2 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                                    title="Delete project"
                                >
                                    <Trash2 size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
