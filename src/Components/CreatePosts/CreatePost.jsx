import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

function CreatePost() {
  const theme = useTheme();
  return (
    <Link
      to="/edit"
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
    </Link>
  );
}

export default CreatePost;
