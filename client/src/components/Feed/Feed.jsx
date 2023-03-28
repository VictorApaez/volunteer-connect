import React, { useEffect } from "react";
import PostForm from "./PostForm";
import Post from "./Post";
import { getPosts } from "../../services/postService";
import { setPosts, setComments } from "../../store";
import "../../styles/Feed.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../services/commentsService";

function Feed() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts()
      .then((res) => {
        dispatch(setPosts(res));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllComments()
      .then((res) => {
        dispatch(setComments(res));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="feed">
      <PostForm posts={posts} />
      {posts &&
        posts.allIds.map((id, i) => {
          return <Post key={id} data={posts.byId[id]} />;
        })}
    </div>
  );
}

export default Feed;
