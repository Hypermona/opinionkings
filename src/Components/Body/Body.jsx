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
import UserProfile from "../../Pages/User/UserProfile";

function Body() {
  const { setToken, getUser } = Token.useContainer();
  const [_, refresh] = useMutation(REFRESHTOKEN);

  useEffect(() => {
    refresh().then(({ data, error }) => {
      console.log(data, error);
      if (!error && data?.refreshToken?.token) {
        setToken(data.refreshToken.token, data.refreshToken.user);
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
              {getUser()?.id && <FollowCreators />}
            </div>
          </div>
        </Route>
        <Route exact path="/edit/:id">
          <PostForm />
        </Route>
        <Route exact path="/auth/:authType">
          <AuthComp />
        </Route>
        <Route exact path="/editProfile">
          <EditProfile />
        </Route>
        <Route exact path="/user/:id">
          <UserProfile />
        </Route>
      </Switch>
      <AuthModal />
    </div>
  );
}

export default Body;
