import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getUser } from "../../Store/token";
import AuthModal from "../../Store/authModal";

function CreatePost() {
  const user = getUser();
  const { push } = useHistory();
  const { setAuthModal } = AuthModal.useContainer();
  const theme = useTheme();

  const handleClick = () => {
    if (user) {
      push("/edit");
    } else {
      setAuthModal(true);
    }
  };
  return (
    <div
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "center",
        justifyContent: "center",
        width: "90%",
        height: "10%",
        margin: "10px auto",
        padding: 5,
        cursor: "pointer",
        background: theme.palette.primary.main,
      }}
      onClick={handleClick}
    >
      <IconButton>
        <AddBoxIcon color="secondary" fontSize="large" />
      </IconButton>
      <p
        style={{
          margin: "auto 5px",
          fontSize: "1.4rem",
          fontWeight: "600",
          color: theme.palette.secondary.main,
        }}
      >
        Ask Opinion
      </p>
    </div>
  );
}

export default CreatePost;
