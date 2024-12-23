import React from "react";
import { useHistory } from "react-router-dom";
import Token from "../../Store/token";
import AuthModal from "../../Store/authModal";

function CreatePost({ children }) {
  const { getUser } = Token.useContainer();
  const { push } = useHistory();
  const { handleOpen } = AuthModal.useContainer();
  const handleClick = () => {
    if (getUser()?.id) {
      push("/edit/new");
    } else {
      handleOpen();
    }
  };
  return <div onClick={handleClick}>{children}</div>;
}

export default CreatePost;
