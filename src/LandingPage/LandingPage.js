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
    loadingMessage: "",
  };

  // Update the username when the input onChange() fires
  updateUsername = (username) => {
    this.setState({
      username: username,
      touched: true,
      errorMessage: "",
      loadingMessage: "",
    });
  };

  // On component mount, check for username in local storage
  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username) {
      this.updateUsername(username);
    }
  }

  // Validate username
  // Returns an error message to conditionally display in the render
  validateUsername = () => {
    const username = this.state.username.trim();

    if (username.length < 1) {
      return "Name must be 1 character or more";
    }
    if (username.toLowerCase() === "bixbot") {
      return "This username is reserved";
    }
  };

  // Set the local storage on username submit
  // Called from handleSubmit() and createNewUser()
  setLocalStorage = (username, id) => {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", id);
  };

  // POST a new user to the server
  // Called from handleSubmit() when a username doesn't yet exist
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
        // resJson:
        // { id: #, name: "string"  }
        this.setLocalStorage(resJson.name, resJson.id);
        this.props.updateUsername(resJson.name, resJson.id);
        this.props.history.push("/chat");
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  };

  // Handle user submitting their username
  // Query the DB to check if the name already exists
  // Pass the username/id up to parent if name exists
  // Otherwise createNewUser()
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loadingMessage: "Loading..." });
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
        // resJson:
        // [] if user doesn't exist
        // { id: #, name: "string" } if user exists
        // if the username already exists, pass it up to parent component
        if (resJson.id) {
          this.setLocalStorage(resJson.name, resJson.id);
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

  // Render instructions and a form allowing the user to input their name
  // Conditionally display error and status messages
  render() {
    return (
      <>
        <HeaderComponent />
        <main className="landing-page-main">
          <p>
            Welcome to Music Chat Worldwide! Discuss music with friends and
            strangers across the globe. Swap between chat rooms at your leisure
            and easily embed videos from YouTube. Enter your name below to get
            started.
          </p>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="choose-username">Name / Nickname</label>
            <br />
            <input
              type="text"
              id="choose-username"
              name="choose-username"
              value={this.state.username}
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
            {this.state.loadingMessage && (
              <DisplayMessage message={this.state.loadingMessage} />
            )}
          </form>
        </main>
      </>
    );
  }
}

export default LandingPage;
