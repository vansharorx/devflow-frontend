import { useState } from "react";
import { Send } from "lucide-react";

export default function CommentForm({ onSubmit }) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        onSubmit(content.trim());
        setContent("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000]"
        >
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FFE600] border border-black inline-block"></span>
                Add to Discussion
            </p>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your diagnostic logs, PR references, or update notes..."
                className="w-full border-2 border-black p-3.5 font-mono text-xs sm:text-sm bg-white shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000] transition-all min-h-[110px]"
            />

            <div className="flex justify-end mt-3">
                <button
                    type="submit"
                    className="bg-black hover:bg-neutral-900 text-white px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center gap-2"
                >
                    <Send size={14} strokeWidth={2.5} />
                    <span>Post Comment</span>
                </button>
            </div>
        </form>
    );
}
