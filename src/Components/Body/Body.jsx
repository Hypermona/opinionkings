import React from "react";
import Category from "../Category/Category";
import CreatePostTab from "../CreatePosts/CreatePostTab";
import FollowCreators from "../FollowCreators/FollowCreators";
import Post from "../Posts/Post";
import { Switch, Route } from "react-router-dom";
import "./body.css";
import PostForm from "../PostForm/PostForm";
import EditProfile from "../User/EditProfile";
import AuthModal from "../Auth/AuthModal";
import AuthComp from "../Auth/AuthComp";

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
              <CreatePostTab />
              <FollowCreators />
            </div>
          </div>
        </Route>
        <Route exact path="/edit">
          <PostForm />
        </Route>
        <Route exact path="/auth/:signUp">
          <AuthComp />
        </Route>
        <Route exact path="/editProfile">
          <EditProfile />
        </Route>
      </Switch>
      <AuthModal />
    </div>
  );
}

export default Body;
