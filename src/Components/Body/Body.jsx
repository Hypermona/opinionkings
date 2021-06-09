import React from "react";
import Category from "../Category/Category";
import CreatePost from "../CreatePosts/CreatePost";
import FollowCreators from "../FollowCreators/FollowCreators";
import Post from "../Posts/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./body.css";
import PostForm from "../PostForm/PostForm";

function Body() {
  return (
    <Router>
      <div className="body-container">
        <Switch>
          <Route exact path="/">
            <div className="category">
              <Category />
            </div>
            <div className="posts">
              <Post />
            </div>
            <div className="explore">
              <CreatePost />
              <FollowCreators />
            </div>
          </Route>
          <Route exact path="/edit">
            <PostForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Body;
