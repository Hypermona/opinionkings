import React from "react";
import Category from "../Category/Category";
import FollowCreators from "../FollowCreators/FollowCreators";
import Post from "../Posts/Post";

import "./body.css";

function Body() {
  return (
    <div className="body-container">
      <div className="category">
        <Category />
      </div>
      <div className="posts">
        <Post />
      </div>
      <div className="explore">
        <FollowCreators />
      </div>
    </div>
  );
}

export default Body;
