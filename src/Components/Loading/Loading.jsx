import { Height } from "@material-ui/icons";
import React from "react";
import loading from "../../Images/Loading.svg";

function Loading() {
  return (
    <div
      style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <img src={loading} alt="loading." />
    </div>
  );
}

export default Loading;
