import React from "react";
import { Route, Switch } from "react-router-dom";
import CategoryWisePost from "../Category/CategoryWisePost";
import ForYouPosts from "./ForYouPosts/ForYouPosts";
import Category from "../../Store/category";
import "./CSS/posts.css";

const tabsCategory = ["For You", "Trending", "Following"];

const Tab = ({ title }) => {
  return <div className="post-header-tab">{title}</div>;
};

function Posts() {
  const { category } = Category.useContainer();
  return (
    <div className="posts-container">
      <div className="posts-header">
        {tabsCategory.map((title) => (
          <Tab title={title} />
        ))}
        <Tab title={category.name} />
      </div>
      <div className="posts-body">
        <Switch>
          <Route exact path="/home">
            <ForYouPosts />
          </Route>
          <Route exact path={`/home/category/:id`}>
            <CategoryWisePost />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Posts;
