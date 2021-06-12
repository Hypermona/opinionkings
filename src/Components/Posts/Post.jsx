import React from "react";
import PostBody from "./PostBody";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Redux/posts";
import PostHead from "./PostHead";
import PostTail from "./PostTail";
import PostImage from "./PostImage";
import Paper from "@material-ui/core/Paper";
import "./post.css";

function Post() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const { posts, loading } = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      {!loading &&
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
