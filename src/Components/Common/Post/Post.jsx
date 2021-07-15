import React, { memo } from "react";
import PostBody from "./PostBody";
import PostHead from "./PostHead";
import PostTail from "./PostTail";
import PostImage from "./PostImage";
import Paper from "@material-ui/core/Paper";
import "./post.css";

function Post({ post }) {
  return (
    <Paper className="post-container" key={post.id} elevation={0}>
      <div className="header">
        <PostHead user={post.author} dateAndTime={post.createdAt} />
      </div>
      <div className="body">
        <PostBody post={post} />
      </div>
      <div className="tail">
        <PostTail />
      </div>
      {post.image && (
        <div className="image">
          <PostImage image={post.image} />
        </div>
      )}
    </Paper>
  );
}

export default memo(Post);
