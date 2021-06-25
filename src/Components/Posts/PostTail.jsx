import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import NearMeIcon from "@material-ui/icons/NearMe";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import IconButton from "@material-ui/core/IconButton";
import PanToolIcon from "@material-ui/icons/PanTool";
import PanToolRoundedIcon from "@material-ui/icons/PanToolRounded";
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import "./postTail.css";

function PostTail() {
  return (
    <div className="tail-container">
      <div>
        <IconButton>
          <PanToolOutlinedIcon />
        </IconButton>
        <IconButton>
          <QuestionAnswerIcon />
        </IconButton>
        <IconButton>
          <NearMeIcon />
        </IconButton>
      </div>

      <div>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default PostTail;
