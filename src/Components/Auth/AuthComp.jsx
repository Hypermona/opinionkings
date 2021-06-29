import React from "react";
import Auth from "./Auth";

function AuthComp() {
  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Auth />
    </div>
  );
}

export default AuthComp;
