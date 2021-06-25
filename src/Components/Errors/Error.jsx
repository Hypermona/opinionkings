import React from "react";
import errorSvg from "../../Images/error.svg";
import pnf404 from "../../Images/404.svg";
import Button from "@material-ui/core/Button";
import "./error.css";

const handleRefresh = () => {
  window.location.reload();
};

const ErrorComonent = ({ image, message }) => (
  <div className="error">
    <img src={image} alt="something went wrong | error 404" width="50%" />
    <p align="center">
      {message}{" "}
      <Button style={{ textTransform: "none", textDecoration: "underline" }} variant="text">
        Report here
      </Button>{" "}
      or{" "}
      <Button
        style={{ textTransform: "none", textDecoration: "underline" }}
        variant="text"
        onClick={handleRefresh}
      >
        Refresh
      </Button>{" "}
      the page
    </p>
  </div>
);

function Error({ type }) {
  switch (type) {
    case "404":
      return <ErrorComonent image={pnf404} message="Page not found" />;

    default:
      return <ErrorComonent image={errorSvg} message="Something Went Wrong" />;
  }
}

export default Error;
