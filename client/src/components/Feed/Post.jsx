import React, { useState, useContext, useEffect } from "react";
import "../../styles/Post.css";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";
import { AiFillLike } from "react-icons/ai";
import { likePost, unlikePost } from "../../services/postService";
import { UserContext } from "../../context/userContext";

const Post = ({ data, posts, setPosts }) => {
  const [toggleComments, setToggleComments] = useState(false);
  const { author, timestamp, likes, content, _id, comments } = data;
  const [like, setLike] = useState(false);
  const { user } = useContext(UserContext);
  const formattedDate = new Date(timestamp).toLocaleString();
  const userProfileImg = "https://randomuser.me/api/portraits/men/4.jpg";

  useEffect(() => {
    console.log(likes);
    console.log(user);
    if (user && likes.includes(user.userId)) {
      setLike(true);
    }
  }, [likes, user]);

  function handleLikeBtn() {
    const userId = user.userId;
    const updatedPost = posts.map((post) => {
      if (post._id === _id) {
        if (!post.likes.includes(userId)) {
          post.likes.push(userId);
          setLike(true);
          try {
            likePost(_id); // return promise
          } catch (error) {
            console.log(error);
          }
        } else {
          post.likes = post.likes.filter((id) => id !== userId);
          setLike(false);
          try {
            unlikePost(_id); // return promise
          } catch (error) {
            console.log(error);
          }
        }
      }
      return post;
    });
    setPosts(updatedPost);
  }

  return (
    <div className="post">
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
        <button
          className="post__button post__button--like"
          onClick={handleLikeBtn}
        >
          <AiFillLike color={like ? "#24A0ED" : "gray"} />
          {likes.length} likes
        </button>
        <button
          className="post__button post__button--comment"
          onClick={() => setToggleComments(!toggleComments)}
        >
          {comments.length} comments
        </button>
      </div>
      <CommentForm
        posts={posts}
        setPosts={setPosts}
        postId={_id}
        comments={comments}
        setToggleComments={setToggleComments}
      />
      {toggleComments && <CommentContainer comments={comments} />}
    </div>
  );
};

export default Post;
