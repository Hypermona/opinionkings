import React from "react";
import Category from "../Category/Category";
import CreatePost from "../CreatePosts/CreatePost";
import FollowCreators from "../FollowCreators/FollowCreators";
import Post from "../Posts/Post";
import { Switch, Route } from "react-router-dom";

import "./body.css";
import PostForm from "../PostForm/PostForm";
import Auth from "../Auth/Auth";
import EditProfile from "../User/EditProfile";

function Body() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div className="body-container">
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
          </div>
        </Route>
        <Route exact path="/edit">
          <PostForm />
        </Route>
        <Route exact path="/auth/:signUp">
          <Auth />
        </Route>
        <Route exact path="/editProfile">
          <EditProfile />
        </Route>
      </Switch>
    </div>
  );
}

export default Body;
