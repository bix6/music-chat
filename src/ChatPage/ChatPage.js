import React from "react";
import ChatSelector from "./ChatSelector/ChatSelector";
import ChatConvo from "./ChatConvo/ChatConvo";
import ChatInput from "./ChatInput/ChatInput";
import SearchResults from "./SearchResults/SearchResults";
import NewChatroom from "./NewChatroom/NewChatroom";
import DisplayMessage from "../shared-components/DisplayMessage/DisplayMessage";
import "./ChatPage.css";
import config from "../config";

// Socket setup
import io from "socket.io-client";
const socket = io(config.API_ENDPOINT_FOR_SOCKET);

class ChatPage extends React.Component {
  state = {
    chatroomList: [],
    currentChatroom: {},
    newChatroomDisplayed: false,
    messages: {},
    searchResults: null,
    error: null,
  };

  // Init state on component mount and setup socket listener
  componentDidMount() {
    // Only initialize if we don't need to navigate home
    // due to username not being sent.
    // Prevents memory leak error that was caused
    // by fetching on the component after it was unmounted.
    if (!this.navigateHome()) {
      this.initChatrooms();
      this.initMessages();
      // Set the socket listener
      this.receiveMessage();
    }
  }

  // Socket emit message
  emitMessage = (message) => {
    socket.emit("emit message from client", message);
  };

  // Socket receive message listener
  receiveMessage = () => {
    socket.on("emit message from server", (message) => {
      // Add to state
      let messages = this.state.messages;
      const chatroomId = message.chatroom_id;
      // Need the else statement when creating a new chatroom
      // since the chatroomId doesn't exist in the messages array yet
      if (messages[chatroomId]) {
        messages[chatroomId].push(message);
      } else {
        messages[chatroomId] = [message];
      }
      this.setState({
        messages: messages,
      });
    });
  };

  // Clear error from state
  clearError = () => {
    this.setState({ error: null });
  };

  // Set error in state
  setError = (error) => {
    this.setState({ error: error.message });
  };

  // Init chatroom list in state
  // GET list of all chatrooms
  initChatrooms = () => {
    this.clearError();
    const url = config.API_ENDPOINT + `/chatrooms`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
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
        this.setState({
          chatroomList: resJson,
          currentChatroom: resJson[0],
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  // GET messages for a given chatroom ID
  getMessagesByChatroomId = (chatroomId) => {
    this.clearError();
    const url = config.API_ENDPOINT + `/messages/chatroom/${chatroomId}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
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
        let messages = this.state.messages;
        messages[resJson[0].chatroom_id] = resJson;
        this.setState({
          messages: messages,
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  // Init messages in state
  // GET messages for default chatroom (#1, global)
  initMessages = () => {
    this.getMessagesByChatroomId(1);
  };

  // Navigate the user to the landing page
  // if username doesn't exist.
  // Return true so we can prevent other methods
  // from being called in componentDidMount().
  // This was causing a memory leak error because
  // fetches were being called on the component
  // even though it had already been unmounted.
  navigateHome = () => {
    if (!this.props.username) {
      // Need the check on history to pass tests
      // otherwise undefined error
      if (this.props.history) {
        this.props.history.push("/");
      }

      return true;
    }
  };

  // Change to a different chatroom
  // Update the chatroom and GET messages
  updateCurrentChatroom = (chatroomId) => {
    this.clearError();
    let chatroom = {};
    for (let i = 0; i < this.state.chatroomList.length; i++) {
      if (this.state.chatroomList[i].id === Number(chatroomId)) {
        chatroom = this.state.chatroomList[i];
        break;
      }
    }
    this.getMessagesByChatroomId(chatroomId);
    this.setState({ currentChatroom: chatroom });
  };

  // POST a new message
  postMessage = (message) => {
    this.clearError();
    const url = config.API_ENDPOINT + `/messages`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(message),
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((resJson) => {
        // message POSTed, do nothing
        // message gets added to state by emit
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  // Create a new message then emit and POST it
  sendMessage = (messageIn) => {
    const message = {
      content_type: "text",
      message: messageIn,
      content_id: "",
      chatroom_id: this.state.currentChatroom.id,
      person_id: this.props.userId,
      username: this.props.username,
    };
    // emit to socket, POST to server
    this.emitMessage(message);
    // Don't include username for payload to postMessage()
    delete message["username"];
    this.postMessage(message);
  };

  // Create a new video embed message then emit and POST it
  embedVideo = (index) => {
    const message = {
      content_type: "youtube video",
      message: "",
      content_id: this.state.searchResults[index].videoId,
      chatroom_id: this.state.currentChatroom.id,
      person_id: this.props.userId,
      username: this.props.username,
    };
    this.emitMessage(message);
    // Don't include username for payload to postMessage()
    delete message["username"];
    this.postMessage(message);
    this.setState({
      searchResults: null,
    });
  };

  // Display interface for creating a new chatroom
  displayNewChatroom = () => {
    this.setState({ newChatroomDisplayed: true });
  };

  // Hide interface for creating a new chatroom
  closeNewChatroom = () => {
    this.setState({ newChatroomDisplayed: false });
  };

  // POST a new chatroom
  createChatroom = (chatroom, description) => {
    this.clearError();
    let chatroomList = this.state.chatroomList;
    let newChatroom = {
      name: chatroom,
      description: description,
    };

    const url = config.API_ENDPOINT + `/chatrooms`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newChatroom),
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((resJson) => {
        // Set the chatroom in state
        // Then post the first message
        this.setState({
          chatroomList: [...chatroomList, resJson],
          currentChatroom: resJson,
        });
        const newMessage = {
          content_type: "text",
          message: `Chatroom created by ${
            this.props.username
          } on ${new Date().toLocaleDateString()}`,
          content_id: "",
          chatroom_id: resJson.id,
          person_id: 1, // bixbot
        };
        this.postMessage(newMessage);
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  // Set search results from youtube search
  setSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
  };

  // Close the search interface
  closeSearch = () => {
    this.setState({
      searchResults: null,
    });
  };

  // Render the Chat Page
  render() {
    return (
      <main className="chat-page-main">
        <ChatSelector
          chatroomList={this.state.chatroomList}
          currentChatroom={this.state.currentChatroom}
          updateCurrentChatroom={this.updateCurrentChatroom}
          displayNewChatroom={this.displayNewChatroom}
        />
        {this.state.error && <DisplayMessage message={this.state.error} />}
        {this.state.newChatroomDisplayed && (
          <NewChatroom
            createChatroom={this.createChatroom}
            closeNewChatroom={this.closeNewChatroom}
          />
        )}
        <ChatConvo
          currentChatroom={this.state.currentChatroom}
          messages={this.state.messages}
        />
        <ChatInput
          sendMessage={this.sendMessage}
          setSearchResults={this.setSearchResults}
        />
        {this.state.searchResults && (
          <SearchResults
            searchResults={this.state.searchResults}
            embedVideo={this.embedVideo}
            closeSearch={this.closeSearch}
          />
        )}
      </main>
    );
  }
}

export default ChatPage;
