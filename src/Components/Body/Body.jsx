import React, { useEffect } from "react";
import Category from "../Category/Category";
import CreatePostTab from "../CreatePosts/CreatePostTab";
import FollowCreators from "../FollowCreators/FollowCreators";
import { Switch, Route, Redirect } from "react-router-dom";
import "./body.css";
import PostForm from "../PostForm/PostForm";
import EditProfile from "../User/EditProfile";
import AuthModal from "../Auth/AuthModal";
import AuthComp from "../Auth/AuthComp";
import Posts from "../Posts/Posts";
import { useMutation } from "urql";
import { REFRESHTOKEN } from "../../Queries/Auth";
import Token from "../../Store/token";

function Body() {
  const { setToken } = Token.useContainer();
  const [_, refresh] = useMutation(REFRESHTOKEN);

  useEffect(() => {
    refresh().then(({ data, error }) => {
      if (!error && data?.refreshToken?.token) {
        setToken(data.refreshToken.token, data.refreshToken.id);
      }
    });
  }, []);
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
        <Route exact path="/auth/:authType">
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
