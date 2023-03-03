import React from "react";
import Comment from "./Comment";
import "../../styles/CommentContainer.css";
function CommentContainer({ comments }) {
  return (
    <div className="comment-container">
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment} />;
      })}
    </div>
  );
}

export default CommentContainer;
