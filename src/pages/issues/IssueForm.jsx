import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import api from "../../services/api";

export default function IssueForm({ onCreate }) {
    const [title, setTitle] = useState("");
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get("/projects");
            setProjects(res.data.data);

            if (res.data.data.length > 0) {
                setProjectId(res.data.data[0].id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !projectId) return;

        onCreate(title.trim(), projectId);
        setTitle("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border-[3px] border-black p-4 sm:p-5 shadow-[5px_5px_0px_#000]"
        >
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FF5E7E] border border-black inline-block"></span>
                Report New Issue
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Describe issue (e.g. Memory leak in background worker, broken OAuth redirect)..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 border-2 border-black p-3 font-mono text-xs sm:text-sm bg-white shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000] transition-all"
                />

                <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="border-2 border-black p-3 font-mono text-xs sm:text-sm font-bold bg-[#FFFDF5] shadow-[3px_3px_0px_#000] focus:outline-none cursor-pointer sm:max-w-xs truncate"
                >
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            Repo: {project.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-black hover:bg-neutral-900 text-white px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Create Issue</span>
                </button>
            </div>
        </form>
    );
}
