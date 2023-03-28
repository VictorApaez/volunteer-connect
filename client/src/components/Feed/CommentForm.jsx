import React, { useRef, useState } from "react";
import "../../styles/CommentForm.css";
import { createComment } from "../../services/commentsService";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const CommentForm = ({ postId, setToggleComments }) => {
  // current users profile pic
  const userProfileImg = "https://randomuser.me/api/portraits/women/2.jpg";
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const [togglePicker, setTogglePicker] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    console.log(content);
    e.preventDefault();
    const commentRes = await createComment({
      content,
      postId,
    });
    dispatch(addComment(commentRes));
    setToggleComments(true);
    setContent("");
  }

  function handleChange(e) {
    setContent(e.target.value);
    e.target.style.height = "50px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleEmojiSelect(emoji) {
    const startPos = inputRef.current.selectionStart;
    const endPos = inputRef.current.selectionEnd;
    const startText = content.substring(0, startPos);
    const endText = content.substring(endPos, content.length);
    const newContent = startText + emoji.native + endText;
    setContent(newContent);
  }

  return (
    <div className="comment-form-container">
      <img
        src={userProfileImg}
        alt="user profile"
        className="comment-form__profile-img"
      />
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-form-text-area-container">
          <textarea
            ref={inputRef}
            className="comment-form__input"
            value={content}
            onChange={(e) => handleChange(e)}
            placeholder="Write a comment..."
          />
          <button
            type="button"
            className="comment-form__emoji-btn"
            onClick={(e) => setTogglePicker(!togglePicker)}
          >
            {togglePicker ? "❌" : "😀"}
          </button>
          {togglePicker && (
            <div className="emoji-picker">
              <Picker onEmojiSelect={(emoji) => handleEmojiSelect(emoji)} />
            </div>
          )}
        </div>

        <button type="submit" className="comment-form-post-btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
