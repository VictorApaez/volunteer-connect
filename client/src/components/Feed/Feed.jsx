import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import Post from "./Post";
import { getPosts } from "../../services/postService";
import "../../styles/Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="feed">
      <PostForm posts={posts} setPosts={setPosts} />
      {posts.map((post, i) => (
        <Post key={i} data={post} posts={posts} setPosts={setPosts} />
      ))}
    </div>
  );
}

export default Feed;
