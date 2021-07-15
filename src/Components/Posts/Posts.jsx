import React from "react";
import { Route, Switch } from "react-router-dom";
import CategoryWisePost from "../Category/CategoryWisePost";
import ForYouPosts from "./ForYouPosts/ForYouPosts";
import "./CSS/posts.css";
import TrendingPosts from "./TrendingPosts/TrendingPosts";

function Posts() {
  return (
    <div className="posts-container">
      <div className="posts-body">
        <Switch>
          <Route exact path="/home">
            <ForYouPosts />
          </Route>
          <Route exact path={`/home/category/:id`}>
            <CategoryWisePost />
          </Route>
          <Route exact path="/home/trending">
            <TrendingPosts />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Posts;
