import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ChatPage from "./ChatPage/ChatPage";

class App extends React.Component {
  state = {
    username: "NONAME",
  };

  updateUsername = (username) => {
    this.setState({ username: username });
  };

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
            <ChatPage {...props} username={this.state.username} />
          )}
        />
      </Switch>
    );
  }
}

export default App;
