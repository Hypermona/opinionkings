import React, { memo } from "react";
import PostBody from "./PostBody";
import PostHead from "./PostHead";
import PostTail from "./PostTail";
import PostImage from "./PostImage";
import Paper from "@material-ui/core/Paper";
import "./post.css";
import Posts from "../../Store/posts";
// import { POSTS } from "../../data";
import { useQuery } from "urql";
import { GET_POSTS } from "../../Queries/Post";
import Error from "../Errors/Error";

function Post() {
  const _Posts = Posts.useContainer();
  const { posts, setPosts } = _Posts;
  const [result] = useQuery({ query: GET_POSTS });

  React.useEffect(() => {
    setPosts(result); // {data:{posts:{ your actual data}},fetching:Boolean, error:{Object}}
  }, [setPosts, result]);
  console.log(result);
  return (
    <>
      {!posts.fetching &&
        posts.data &&
        posts.data.posts.map((post, i) => (
          <Paper className="post-container" key={i} elevation={0}>
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
        ))}
      {posts.error && <Error type="404" />}
    </>
  );
}

export default memo(Post);
