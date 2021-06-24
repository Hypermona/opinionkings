import React from "react";
import "./postImage.css";

function PostImage({ image }) {
  return <img src={image} alt={image} className="post-image" />;
}

export default PostImage;
