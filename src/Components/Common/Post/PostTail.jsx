import React,{useState} from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import NearMeIcon from "@material-ui/icons/NearMe";
import IconButton from "@material-ui/core/IconButton";
import "./postTail.css";
import { useMutation } from "urql";
import { SAVE_POST } from "../../../Queries/User";
import Token from "../../../Store/token";
import { BookmarkRounded } from "@material-ui/icons";
import { Snackbar } from "@material-ui/core";

function PostTail({post}) {
  const [_,savePost] =  useMutation(SAVE_POST)
  const {getUser} = Token.useContainer()
  const [saved, setSaved] = useState(getUser().saved);
  const [showToast,setShowToast] = useState(false)
  async function onSave(){
    const res= await savePost({postId:post.id})
    if(res.data){
    setSaved(res?.data?.savePost?.saved);
    }
  }
  console.log("bbbbb", saved?.includes(post.id));
  function copyLink(){
    navigator.clipboard.writeText("http://localhost:3000/"+post.id)
    setShowToast(true)
  }
  
  function handleClose(){
    setShowToast(false)
  }
  return (
    <div className="tail-container">
      <div>
        {/* <IconButton>
          <PanToolOutlinedIcon />
        </IconButton>
        <IconButton>
          <QuestionAnswerIcon />
        </IconButton> */}
      </div>

      <div>
        <IconButton onClick={copyLink}>
          <NearMeIcon />
        </IconButton>
        <Snackbar
          open={showToast}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Link Copied"
          // action={action}
        />
        <IconButton onClick={onSave}>
          {saved?.includes(post.id) ? <BookmarkRounded /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default PostTail;
