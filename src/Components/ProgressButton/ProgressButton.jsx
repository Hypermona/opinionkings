import { Button } from "@material-ui/core";
import React from "react";
import "./progress-button.css";
import { RadioButtonUncheckedOutlined } from "@material-ui/icons";
import FinalTheme from "../../Store/finalTheme";
import { CheckCircleRounded } from "@material-ui/icons";

function ProgressButton({ children, style, percentage, showValues, isSelected, ...rest }) {
    const { finalTheme } = FinalTheme.useContainer();
  const cStyle = { ...style, borderColor: isSelected ? "#3EA6FF" : "3f3f3f" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {isSelected ? (
        <CheckCircleRounded style={{ color: "#3EA6FF" }} />
      ) : (
        <RadioButtonUncheckedOutlined />
      )}
      <Button {...rest} style={cStyle} className="progress_button">
        <span
          style={{
            zIndex: 10,
            color: isSelected
              ? finalTheme
                ? "#3EA6FF"
                : "rgb(2 101 186)"
              : finalTheme
              ? "white"
              : "black",
          }}
        >
          {children}
        </span>
        {showValues && (
          <span
            className="progress_button__overlay"
            style={{
              background: isSelected ? "rgb(0 84 196 / 32%)" : "rgb(116 116 116 / 20%)",
              transform: `scaleX(${percentage})`,
              transformOrigin: "left",
            }}
          ></span>
        )}
        {showValues && (
          <span
            style={{
              zIndex: 10,
              marginLeft: "auto",
              color: isSelected
                ? finalTheme
                  ? "#3EA6FF"
                  : "rgb(2 101 186)"
                : finalTheme
                ? "white"
                : "black",
            }}
          >
            {percentage} %
          </span>
        )}
      </Button>
    </div>
  );
}

export default ProgressButton;
