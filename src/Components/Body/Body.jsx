import React from "react";
import Category from "../Category/Category";
import CreatePost from "../CreatePosts/CreatePost";
import FollowCreators from "../FollowCreators/FollowCreators";
import Post from "../Posts/Post";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./body.css";
import PostForm from "../PostForm/PostForm";

function Body() {
  return (
    <Router>
      <div className="body-container">
        <div className="category">
          <Switch>
            <Route exact path="/">
              <Category />
            </Route>
            <Route exact path="/edit">
              <div></div>
            </Route>
          </Switch>
        </div>
        <div className="posts">
          <Switch>
            <Route exact path="/">
              <Post />
            </Route>
            <Route exact path="/edit">
              <PostForm />
            </Route>
          </Switch>
        </div>
        <div className="explore">
          <Switch>
            <Route exact path="/">
              <CreatePost />
              <FollowCreators />
            </Route>
            <Route exact path="/edit">
              <div></div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Body;
