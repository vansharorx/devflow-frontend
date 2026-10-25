import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

import api from "../../services/api";

import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";

export default function IssueDetailsPage() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [id]);

    const fetchComments = async () => {
        try {
            const res = await api.get(`/comments/${id}`);
            setComments(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addComment = async (content) => {
        try {
            await api.post("/comments", {
                issueId: id,
                comment: content,
            });

            fetchComments();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Back link */}
            <div>
                <Link
                    to="/issues"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] transition-colors"
                >
                    <ArrowLeft size={14} strokeWidth={2.5} />
                    <span>Back to Issues</span>
                </Link>
            </div>

            {/* Header Card */}
            <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-[#FFE600] text-black border-2 border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                        ISSUE #{id}
                    </span>
                    <span className="bg-[#00D2FF] text-black border-2 border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                        THREAD // {comments.length} Comments
                    </span>
                </div>

                <h1 className="heading-font text-2xl sm:text-4xl font-extrabold text-black tracking-tight flex items-center gap-2.5">
                    <MessageSquare size={28} strokeWidth={2.5} className="text-black" />
                    Issue Discussion
                </h1>
                <p className="font-mono text-xs text-gray-600 mt-2">
                    Collaborate with assignees and document investigation steps or bug fixes.
                </p>
            </div>

            {/* Post comment card */}
            <CommentForm onSubmit={addComment} />

            {/* Comments list card */}
            <CommentList comments={comments} />
        </div>
    );
}
