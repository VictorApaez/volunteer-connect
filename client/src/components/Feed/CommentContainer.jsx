import React from "react";
import Comment from "./Comment";
import "../../styles/CommentContainer.css";
import { useSelector } from "react-redux";
import { getCommentsByPostId } from "../../store";

function CommentContainer({ postId }) {
  const comments = useSelector((state) => getCommentsByPostId(state, postId));
  return (
    <div className="comment-container">
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment} />;
      })}
    </div>
  );
}

export default CommentContainer;
