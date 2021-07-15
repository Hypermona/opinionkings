import React from "react";
import Category from "../Category/Category";
import CreatePostTab from "../CreatePosts/CreatePostTab";
import FollowCreators from "../FollowCreators/FollowCreators";
import { Switch, Route, Redirect } from "react-router-dom";
import "./body.css";
import PostForm from "../PostForm/PostForm";
import EditProfile from "../User/EditProfile";
import AuthModal from "../Auth/AuthModal";
import AuthComp from "../Auth/AuthComp";
import ForYouPosts from "../Posts/ForYouPosts/ForYouPosts";
import CategoryWisePost from "../Category/CategoryWisePost";
import Posts from "../Posts/Posts";

function Body() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">
          <div className="body-container">
            <div className="category">
              <Category />
            </div>
            <div className="posts">
              <Posts />
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
