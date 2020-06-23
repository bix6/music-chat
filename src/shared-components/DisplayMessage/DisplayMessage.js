import React from "react";
import "./DisplayMessage.css";

export default function DisplayMessage(props) {
  if (props.message) {
    if (props.color) {
      return (
        <div className="display-message" style={{ color: props.color }}>
          {props.message}
        </div>
      );
    }
    return <div className="display-message">{props.message}</div>;
  }

  return <></>;
}
