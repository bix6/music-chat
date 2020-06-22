import React from "react";
import "./DisplayMessage.css";

export default function DisplayMessage(props) {
  if (props.message) {
    return <div className="display-message">{props.message}</div>;
  }

  return <></>;
}
