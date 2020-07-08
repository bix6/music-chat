import React from "react";
import HeaderComponent from "../shared-components/HeaderComponent/HeaderComponent";
import DisplayMessage from "../shared-components/DisplayMessage/DisplayMessage";
import "./LandingPage.css";
import config from "../config";

class LandingPage extends React.Component {
  state = {
    username: "",
    touched: false,
    errorMessage: "",
  };

  componentDidMount() {
    // TODO check for cookie
  }

  updateUsername = (username) => {
    this.setState({
      username: username,
      touched: true,
      errorMessage: "",
    });
  };

  validateUsername = () => {
    const username = this.state.username.trim();

    if (username.length < 1) {
      return "Name must be 1 character or more";
    }
    if (username.toLowerCase() === "bixbot") {
      return "This username is reserved";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username exists
    const url = config.API_ENDPOINT + `/persons/name/${this.state.username}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
        credentials: "include",
      },
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((resJson) => {
        // if the username already exists, pass it up to parent component
        if (resJson.id) {
          this.props.updateUsername(resJson.name, resJson.id);
          this.props.history.push("/chat");
        }
        // username doesn't exist so POST it
        else {
          this.createNewUser();
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  };

  createNewUser = () => {
    const newUser = {
      name: this.state.username,
    };
    const url = config.API_ENDPOINT + `/persons`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
        credentials: "include",
      },
      body: JSON.stringify(newUser),
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((resJson) => {
        this.props.updateUsername(resJson.name, resJson.id);
        this.props.history.push("/chat");
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
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
            {this.state.errorMessage && (
              <DisplayMessage message={this.state.errorMessage} />
            )}
          </form>
        </main>
      </>
    );
  }
}

export default LandingPage;
