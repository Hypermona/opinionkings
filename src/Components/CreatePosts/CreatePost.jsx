import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React from "react";
import { useHistory } from "react-router-dom";
import Token from "../../Store/token";
import AuthModal from "../../Store/authModal";

function CreatePost({ children }) {
  const { getUser } = Token.useContainer();
  const user = getUser();
  const { push } = useHistory();
  const { handleOpen } = AuthModal.useContainer();

  const handleClick = () => {
    if (user) {
      push("/edit");
    } else {
      handleOpen();
    }
  };
  return <div onClick={handleClick}>{children}</div>;
}

export default CreatePost;
