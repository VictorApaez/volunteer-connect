import React from "react";
import "../../styles/Comment.css";

const Comment = ({ data }) => {
  const { author, timestamp, likes, content } = data;
  const userProfileImg = "https://randomuser.me/api/portraits/men/5.jpg";

  const formattedDate = new Date(timestamp).toLocaleString();
  return (
    <div className="comment">
      <img
        src={userProfileImg}
        alt="user profile"
        className="comment__profile-img"
      />
      <div className="comment__details">
        <h5 className="comment__username">{author.username}</h5>
        <p className="comment__timestamp">{formattedDate}</p>
        <p>{content}</p>

        <button className="comment__button comment__button--like">
          <i className="far fa-heart"></i> {likes} likes
        </button>
      </div>
    </div>
  );
};

export default Comment;
