import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./postBody.css";

const useStyles = makeStyles((theme) => ({
  description: {
    height: "100%",
    width: "100%",
    display: "block",
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 255, 0) 10%, ${theme.palette.background.paper} 100%)`,
    },
  },
}));

function PostBody({ post }) {
  const classes = useStyles();

  return (
    <div className="content">
      <div className="title">{post.title}</div>
      <div className={classes.description} id="description">
        {post.shortDescription}
      </div>
    </div>
  );
}

export default PostBody;
