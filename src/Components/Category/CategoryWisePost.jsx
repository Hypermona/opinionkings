import React from "react";
import Post from "../Common/Post/Post";
import { useQuery } from "urql";
import { CATEGORY } from "../../Queries/Category";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Errors/Error";
import "./CSS/categoryWisePost.css";

function CategoryWisePost() {
  const { id } = useParams();
  console.log(id);
  const [result] = useQuery({ query: CATEGORY, variables: { id: id } });
  const { data, fetching, error } = result;
  console.log(result);
  return (
    <div>
      {/* <p className="category-name">{data && data.category.name} /</p>
      <hr />
      <br /> */}
      {fetching && <Loading />}
      {data && data.category.posts.length > 0 ? (
        data.category.posts.map((post, i) => <Post post={post} />)
      ) : (
        <p className="category-nopost">No Posts in this category</p>
      )}
      {error && <Error type="404" />}
    </div>
  );
}

export default CategoryWisePost;
