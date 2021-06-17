import React, { memo } from "react";
import PostBody from "./PostBody";
import PostHead from "./PostHead";
import PostTail from "./PostTail";
import PostImage from "./PostImage";
import Paper from "@material-ui/core/Paper";
import "./post.css";
import Posts from "../../Store/posts";
import { POSTS } from "../../data";

function Post() {
  const _Posts = Posts.useContainer();
  const { posts, setPosts } = _Posts;
  React.useEffect(() => {
    setPosts(POSTS);
  }, [setPosts]);
  return (
    <>
      {posts &&
        posts.map((post, i) => (
          <Paper className="post-container" key={i} elevation={0}>
            <div className="header">
              <PostHead userId={post.author} dateAndTime={post.dateAndTime} />
            </div>
            <div className="body">
              <PostBody post={post} />
            </div>
            <div className="tail">
              <PostTail />
            </div>
            <div className="image">
              <PostImage image={post.image} />
            </div>
          </Paper>
        ))}
    </>
  );
}

export default memo(Post);
