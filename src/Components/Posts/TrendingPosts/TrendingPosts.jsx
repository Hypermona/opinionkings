import React, { memo } from "react";
import Post from "../../Common/Post/Post";
import { useQuery } from "urql";
import { GET_POSTS } from "../../../Queries/Post";
import Category from "../../../Store/category";
import Error from "../../Errors/Error";
import Loading from "../../Loading/Loading";

const tabsCategory = ["For You", "Trending", "Following"];

const Tab = ({ title }) => {
  return <div className="post-header-tab">{title}</div>;
};

function TrendingPosts() {
  const { category } = Category.useContainer();

  const [result] = useQuery({ query: GET_POSTS });
  const { data, fetching, error } = result;

  console.log(result.data);
  return (
    <>
      <div className="posts-header">
        {tabsCategory.map((title) => (
          <Tab title={title} />
        ))}
        <Tab title={category.name} />
      </div>
      {fetching && <Loading />}
      {data && data.posts && data.posts.map((post, i) => <Post post={post} />)}
      {error && <Error type="404" />}
    </>
  );
}

export default memo(TrendingPosts);
