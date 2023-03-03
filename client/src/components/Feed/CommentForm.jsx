import React, { useRef } from "react";
import "../../styles/CommentForm.css";
import { createComment } from "../../services/commentsService";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/slices/postSlice";

const CommentForm = ({ postId, setToggleComments, posts, setPosts }) => {
  // current users profile pic
  const userProfileImg = "https://randomuser.me/api/portraits/women/2.jpg";
  const commentRef = useRef();
  const dispatch = useDispatch();
  const postsTest = useSelector((state) => state.posts);
  const commentsTest = useSelector((state) => state.comments);
  console.log(postsTest);
  async function handleSubmit(e) {
    e.preventDefault();
    const commentRes = await createComment({
      content: commentRef.current.value,
      postId,
    });
    // console.log(commentRes);
    // console.log(postId);
    dispatch(addComment(commentRes, postId));

    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const updatedComments = [commentRes, ...post.comments];
        return { ...post, comments: updatedComments };
      } else {
        return post; // Return the original post
      }
    });
    setPosts(updatedPosts);

    setToggleComments(true);
    commentRef.current.blur();
    commentRef.current.value = "";
  }

  return (
    <div className="comment-form-container">
      <img
        src={userProfileImg}
        alt="user profile"
        className="comment-form__profile-img"
      />
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          ref={commentRef}
          type="text"
          className="comment-form__input"
          placeholder="Write a comment..."
        />
      </form>
    </div>
  );
};

export default CommentForm;
