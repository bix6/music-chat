import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ChatPage from "./ChatPage/ChatPage";

class App extends React.Component {
  state = {
    username: "",
    userId: "",
  };

  updateUsername = (username, id) => {
    this.setState({ username: username, userId: id });
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
