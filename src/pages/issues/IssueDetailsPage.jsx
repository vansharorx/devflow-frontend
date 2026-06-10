import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../services/api";

import CommentForm
from "../../components/comments/CommentForm";

import CommentList
from "../../components/comments/CommentList";

export default function IssueDetailsPage() {

  const { id } =
    useParams();

  const [comments,
    setComments] =
      useState([]);

  useEffect(() => {

    fetchComments();

  }, []);

  const fetchComments =
    async () => {

    try {

      const res =
        await api.get(
          `/comments/${id}`
        );

      setComments(
        res.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const addComment =
    async (content) => {

    try {

      await api.post(
        "/comments",
        {
          issueId: id,
          content
        }
      );

      fetchComments();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div>

      <h1
        className="
        heading-font
        text-3xl
        text-[#102C26]
        mb-6
      "
      >
        Issue Discussion
      </h1>

      <CommentForm
        onSubmit={
          addComment
        }
      />

      <CommentList
        comments={
          comments
        }
      />

    </div>
  );
}