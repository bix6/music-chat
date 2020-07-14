import React from "react";
import ChatSelector from "./ChatSelector/ChatSelector";
import ChatConvo from "./ChatConvo/ChatConvo";
import ChatInput from "./ChatInput/ChatInput";
import SearchResults from "./SearchResults/SearchResults";
import NewChatroom from "./NewChatroom/NewChatroom";
import DisplayMessage from "../shared-components/DisplayMessage/DisplayMessage";
import "./ChatPage.css";
import config from "../config";

// TODO socket
import io from "socket.io-client";
const socket = io(config.API_ENDPOINT);
socket.on("connect", () => {
  socket.emit("connect message", "Hello!");
  socket.on("connect message", (msg) => {
    console.log("connect message: " + msg);
  });
});

class ChatPage extends React.Component {
  state = {
    chatroomList: [],
    currentChatroom: {},
    newChatroomDisplayed: false,
    messages: {},
    searchResults: null,
    error: null,
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

  // Init state on component mount
  componentDidMount() {
    this.initChatrooms();
    this.initMessages();
  }

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

  // GET a message by id and add it to state
  // Used with postMessage() when a new message is POSTed
  getMessageById = (messageId) => {
    this.clearError();
    const url = config.API_ENDPOINT + `/messages/${messageId}`;
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
        const chatroomId = resJson[0].chatroom_id;
        // Need the else statement when creating a new chatroom
        // since the chatroomId doesn't exist in the messages array yet
        if (messages[chatroomId]) {
          messages[chatroomId].push(resJson[0]);
        } else {
          messages[chatroomId] = [resJson[0]];
        }

        this.setState({
          messages: messages,
        });
      })
      .catch((err) => {
        this.setError(err);
      });
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
        // TODO socket
        console.log("emit");
        console.log("socket");
        console.log(socket);
        console.log("stringify");
        console.log(JSON.stringify(message));
        console.log("done");
        socket.emit("chat message", JSON.stringify(message));
        // success; update messages in state
        this.getMessageById(resJson.id);
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  // Create a new message and send it to postMessage()
  sendMessage = (messageIn) => {
    const message = {
      content_type: "text",
      message: messageIn,
      content_id: "",
      chatroom_id: this.state.currentChatroom.id,
      person_id: this.props.userId,
    };
    this.postMessage(message);
  };

  // Create a new video embed message and send it to postMessage()
  embedVideo = (index) => {
    const message = {
      content_type: "youtube video",
      message: "",
      content_id: this.state.searchResults[index].videoId,
      chatroom_id: this.state.currentChatroom.id,
      person_id: this.props.userId,
    };
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

  scrollChatPage() {
    var chatConvoDiv = document.getElementsByClassName("chat-convo-div")[0];
    if (chatConvoDiv) {
      console.log("chatConvoDiv", chatConvoDiv);
      console.log("scroll height", chatConvoDiv.scrollHeight);
      console.log("scroll top", chatConvoDiv.scrollTop);
      chatConvoDiv.scrollTop = chatConvoDiv.scrollHeight;
      chatConvoDiv.scrollTop = 200;
      console.log("scroll top", chatConvoDiv.scrollTop);
    }
  }

  scrollChatPage2() {
    console.log("lis", document.getElementsByClassName("chat-convo-li"));
    console.log(
      "li 0",
      document.getElementsByClassName("chat-convo-li").item(0)
    );
    console.log("li 0", document.getElementsByClassName("chat-convo-li")[0]);
    console.log(
      "lis length",
      document.getElementsByClassName("chat-convo-li").length
    );
    if (document.getElementsByClassName("chat-convo-li").length > 0) {
      var chatConvoLi = document
        .getElementsByClassName("chat-convo-li")
        .item(chatConvoLi.length - 1);
      console.log("chatConvoLi", chatConvoLi);
    }
  }

  // Render the Chat Page
  render() {
    // TODO make scroll page work
    // this.scrollChatPage();
    // this.scrollChatPage2();

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
