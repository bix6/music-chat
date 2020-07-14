import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ChatPage from "./ChatPage/ChatPage";
// Setup WebSocket
import io from "socket.io-client";
import config from "./config";
const socket = io.connect(config.API_ENDPOINT);

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
