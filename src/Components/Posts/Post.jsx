import React from "react";
import PostBody from "./PostBody";
import PostHead from "./PostHead";
import PostTail from "./PostTail";
import PostImage from "./PostImage";
import Paper from "@material-ui/core/Paper";
import "./post.css";
import State from "../../Store/state";
import { POSTS } from "../../data";

function Post() {
  const state = State.useContainer();
  const { posts, setPosts } = state.posts;
  React.useEffect(() => {
    setPosts(POSTS);
  }, [setPosts]);
  console.log(state.posts.posts);
  return (
    <>
      {posts &&
        posts.map((post, i) => (
          <Paper className="post-container" key={i}>
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

export default Post;
