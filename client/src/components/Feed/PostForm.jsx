import React, { useRef } from "react";
import { createPost } from "../../services/postService";
import "../../styles/PostForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store";

function PostForm({ setPosts, posts }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const content = inputRef.current.value;
    const res = await createPost({ content });

    dispatch(addPost(res));
    // WILL NOT USE THE NEXT LINE ANYMORE
    setPosts([res, ...posts]);
    inputRef.current.value = "";
  }
  return (
    <form className="post-form post-form--small" onSubmit={handleSubmit}>
      <img
        className="post-form__avatar"
        src="https://randomuser.me/api/portraits/men/10.jpg"
        alt="User Avatar"
      />
      <input
        className="post-form__input"
        type="text"
        ref={inputRef}
        placeholder="Write a post..."
      />
    </form>
  );
}

export default PostForm;
