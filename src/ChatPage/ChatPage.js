import React from "react";
import ChatSelector from "./ChatSelector/ChatSelector";
import ChatConvo from "./ChatConvo/ChatConvo";
import ChatInput from "./ChatInput/ChatInput";
import SearchResults from "./SearchResults/SearchResults";
import NewChatroom from "./NewChatroom/NewChatroom";
import "./ChatPage.css";
import config from "../config";

class ChatPage extends React.Component {
  state = {
    chatroomList: [],
    currentChatroom: {},
    newChatroomDisplayed: false,
    messages: {},
    searchResults: null,
    userId: 1, // TODO set this per user
  };

  // GET list of all chatrooms
  initChatrooms = () => {
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
        console.log(err);
      });
  };

  // GET messages for a given chatroom ID
  getMessagesByChatroomId = (chatroomId) => {
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
        console.log(err);
      });
  };

  // Get messages for chatroom #1 (global); default chatroom
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
    let chatroomList = this.state.chatroomList;
    let newChatroom = {
      name: chatroom,
      description: description,
    };
    let messages = this.state.messages;
    let newMessage = [
      {
        username: "Bixbot",
        contentType: "text",
        message: `Chatroom created by ${
          this.props.username
        } on ${new Date().toLocaleDateString()}`,
        contentId: null,
      },
    ];

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
        this.setState({
          chatroomList: [...chatroomList, resJson],
          messages: { ...messages, [resJson.name]: newMessage }, // TODO POST the new message
          currentChatroom: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET a message by id and add it to state
  // Used with postMessage() when a new message is POSTed
  getMessageById = (messageId) => {
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
        messages[resJson[0].chatroom_id].push(resJson[0]);
        this.setState({
          messages: messages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // POST a new message
  postMessage = (message) => {
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
        // success; update messages in state
        this.getMessageById(resJson.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create a new message and send it to postMessage()
  sendMessage = (messageIn) => {
    const message = {
      content_type: "text",
      message: messageIn,
      content_id: "",
      chatroom_id: this.state.currentChatroom.id,
      person_id: 1, // TODO retrieve this
    };
    this.postMessage(message);
  };

  // Set search results from youtube search
  setSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
  };

  // Create a new video embed message and send it to postMessage()
  embedVideo = (index) => {
    const message = {
      content_type: "youtube video",
      message: "",
      content_id: this.state.searchResults[index].videoId,
      chatroom_id: this.state.currentChatroom.id,
      person_id: 1, // TODO retrieve this
    };
    this.postMessage(message);
    this.setState({
      searchResults: null,
    });
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
