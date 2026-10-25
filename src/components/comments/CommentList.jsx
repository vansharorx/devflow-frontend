import { formatRelativeDate } from "../../utils/dateFormatter";
import { MessageSquare } from "lucide-react";

export default function CommentList({ comments = [] }) {
    if (comments.length === 0) {
        return (
            <div className="bg-white border-[3px] border-black p-8 text-center shadow-[5px_5px_0px_#000]">
                <MessageSquare size={24} strokeWidth={2.5} className="mx-auto text-gray-400 mb-2" />
                <p className="font-mono text-xs font-bold uppercase text-gray-500">
                    // No comments yet on this thread
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                // Timeline Activity ({comments.length})
            </p>

            {comments.map((comment, idx) => (
                <div
                    key={comment.id || idx}
                    className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_#000] relative hover:translate-x-0.5 transition-all"
                >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black/10">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                            COMMENT #{idx + 1}
                        </span>

                        <span className="bg-[#FFE600] text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold">
                            {formatRelativeDate(comment.created_at)}
                        </span>
                    </div>

                    <p className="font-mono text-sm text-black leading-relaxed whitespace-pre-wrap">
                        {comment.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}
