import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import CreatePost from "./CreatePost";

const CreateIcon = ({ theme }) => (
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

function CreatePostTab() {
  const theme = useTheme();

  return (
    <CreatePost>
      <CreateIcon theme={theme} />
    </CreatePost>
  );
}

export default CreatePostTab;
