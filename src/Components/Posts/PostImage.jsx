import React from "react";
import "./postImage.css";

function PostImage({ image }) {
  return <img src={image} alt={image} style={{ height: "100%", width: "100%" }} />;
}

export default PostImage;
