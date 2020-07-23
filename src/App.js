import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ChatPage from "./ChatPage/ChatPage";

class App extends React.Component {
  state = {
    username: "",
    userId: "",
  };

  // Update the username and id in state
  updateUsername = (username, id) => {
    this.setState({ username: username, userId: id });
  };

  // Check for username in local storage on mount
  componentDidMount() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (username && userId) {
      this.updateUsername(username, userId);
    }
  }

  // Render LandingPage or ChatPage
  // depending on the URL path
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage {...props} updateUsername={this.updateUsername} />
          )}
        />
        <Route
          exact
          path="/chat"
          render={(props) => (
            <ChatPage
              {...props}
              username={this.state.username}
              userId={this.state.userId}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
