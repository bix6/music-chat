import React from "react";
import HeaderComponent from "../shared-components/HeaderComponent/HeaderComponent";
import DisplayMessage from "../shared-components/DisplayMessage/DisplayMessage";
import "./LandingPage.css";

class LandingPage extends React.Component {
  state = {
    username: "",
    touched: false,
  };

  updateUsername = (username) => {
    this.setState({
      username: username,
      touched: true,
    });
  };

  validateUsername = () => {
    const username = this.state.username.trim();

    if (username.length < 1) {
      return "Name must be 1 character or more";
    }
    if (
      username.toLowerCase() === "bix" ||
      username.toLowerCase() === "bix6" ||
      username.toLowerCase() === "bixbot" ||
      username.toLowerCase() === "bixby" ||
      username.toLowerCase() === "jack"
    ) {
      return "This username is reserved";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUsername(this.state.username);
    this.props.history.push("/chat");
  };

  render() {
    return (
      <>
        <HeaderComponent />
        <main className="landing-page-main">
          <p>
            Welcome to Your Musical Home on the Internet. Discuss music with
            friends and strangers across the globe. Swap between chat rooms at
            your leisure and easily embed music from your favorite services.
            Enter your name below to get started.
          </p>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="choose-username">Name / Nickname</label>
            <br />
            <input
              type="text"
              id="choose-username"
              name="choose-username"
              onChange={(e) => this.updateUsername(e.target.value)}
            />
            <br />
            <button type="submit" disabled={this.validateUsername()}>
              Chat
            </button>
            {this.state.touched && (
              <DisplayMessage message={this.validateUsername()} />
            )}
          </form>
        </main>
      </>
    );
  }
}

export default LandingPage;
