import React, { useState, useContext, useEffect } from "react";
import "../../styles/Post.css";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";
import { AiFillLike } from "react-icons/ai";
import { likePostDB, unlikePostDB } from "../../services/postService";
import { likePost, unlikePost } from "../../store";
import { UserContext } from "../../context/userContext";
import { useDispatch } from "react-redux";
import LikesModal from "./LikesModal";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const [toggleComments, setToggleComments] = useState(false);
  const { author, timestamp, likes, content, _id } = data;

  const [like, setLike] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const { user } = useContext(UserContext);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = new Date(timestamp).toLocaleString("en-US", options);
  const userProfileImg = "https://randomuser.me/api/portraits/men/4.jpg";
  useEffect(() => {
    if (user && likes.includes(user.userId)) {
      setLike(true);
    }
  }, [likes, user]);

  function handleLikeBtn() {
    // const userId = user.userId;
    if (like) {
      setLike(false);
      dispatch(unlikePost({ postId: _id, userId: user.userId }));
      unlikePostDB(_id);
    } else {
      setLike(true);
      dispatch(likePost({ postId: _id, userId: user.userId }));
      likePostDB(_id);
    }
  }

  return (
    <div className="post">
      {showLikes && (
        <LikesModal
          showLikes={showLikes}
          setShowLikes={setShowLikes}
          postId={_id}
        />
      )}

      <div className="post__header">
        <img
          src={userProfileImg}
          alt="user profile"
          className="post__profile-img"
        />
        <h2 className="post__username">{author.username}</h2>
        <p className="post__timestamp">{formattedDate}</p>
      </div>
      <div className="post__body">{content}</div>
      <div className="post__footer">
        <button className="post__button post__button--like">
          <AiFillLike
            color={like ? "#24A0ED" : "gray"}
            onClick={handleLikeBtn}
          />
          <p onClick={() => setShowLikes(!showLikes)}>{likes.length} likes</p>
        </button>
        <button
          className="post__button post__button--comment"
          onClick={() => setToggleComments(!toggleComments)}
        >
          comments
        </button>
      </div>
      <CommentForm postId={_id} setToggleComments={setToggleComments} />
      {toggleComments && <CommentContainer postId={_id} />}
    </div>
  );
};

export default Post;
