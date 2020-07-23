import React from "react";
import { Link } from "react-router-dom";
import "./HeaderComponent.css";

export default function HeaderComponent() {
  return (
    <header className="header-component">
      <Link to="/">
        <h1>Music Chat</h1>
      </Link>
    </header>
  );
}

// TODO just move this into LandingPage since
// this is no longer used on chat page
