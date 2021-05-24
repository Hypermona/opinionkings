import React from "react";
import Category from "../Category/Category";
import "./body.css";

function Body() {
  return (
    <div className="container">
      <div className="category">
        <Category />
      </div>
      <div className="posts"></div>
      <div className="explore"></div>
    </div>
  );
}

export default Body;
