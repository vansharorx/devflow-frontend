import { useState } from "react";
import { Plus } from "lucide-react";

export default function ProjectForm({ onCreate }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onCreate(name.trim());
        setName("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border-[3px] border-black p-4 sm:p-5 shadow-[5px_5px_0px_#000]"
        >
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#00E676] border border-black inline-block"></span>
                Initialize New Project
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="e.g. backend-api, payment-gateway, design-system"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 border-2 border-black p-3 font-mono text-xs sm:text-sm shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000] transition-all"
                />

                <button
                    type="submit"
                    className="bg-black hover:bg-neutral-900 text-white px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Create Project</span>
                </button>
            </div>
        </form>
    );
}
