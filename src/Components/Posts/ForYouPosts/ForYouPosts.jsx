import React, { memo } from "react";
import Posts from "../../../Store/posts";
import Post from "../../Common/Post/Post";
import { useQuery } from "urql";
import { GET_POSTS } from "../../../Queries/Post";
import Error from "../../Errors/Error";
import Loading from "../../Loading/Loading";

function ForYouPost() {
  const _Posts = Posts.useContainer();
  const { posts, setPosts } = _Posts;
  const [result] = useQuery({ query: GET_POSTS });

  React.useEffect(() => {
    setPosts(result); // {data:{posts:{ your actual data}},fetching:Boolean, error:{Object}}
  }, [setPosts, result]);
  console.log(result.data);
  return (
    <>
      {posts.fetching && <Loading />}
      {posts.data && posts.data.posts && posts.data.posts.map((post, i) => <Post post={post} />)}
      {posts.error && <Error type="404" />}
    </>
  );
}

export default memo(ForYouPost);
