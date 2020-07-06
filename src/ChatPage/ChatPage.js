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
  };

  initChatrooms() {
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
  }

  getMessagesByChatroom(chatroomId) {
    const url = config.API_ENDPOINT + `/messages/${chatroomId}`;
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
  }

  // Get messages for chatroom #1 (global); default chatroom
  initMessages() {
    this.getMessagesByChatroom(1);
  }

  componentDidMount() {
    this.initChatrooms();
    this.initMessages();
  }

  updateCurrentChatroom = (chatroomId) => {
    let chatroom = {};
    for (let i = 0; i < this.state.chatroomList.length; i++) {
      if (this.state.chatroomList[i].id === Number(chatroomId)) {
        chatroom = this.state.chatroomList[i];
        break;
      }
    }
    this.setState({ currentChatroom: chatroom });
    // Fetch new messages if needed
  };

  displayNewChatroom = () => {
    this.setState({ newChatroomDisplayed: true });
  };

  closeNewChatroom = () => {
    this.setState({ newChatroomDisplayed: false });
  };

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
        console.log("resJson", resJson);
        this.setState({
          chatroomList: [...chatroomList, resJson],
          messages: { ...messages, [resJson.name]: newMessage }, // TODO add the message in properly
          currentChatroom: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO POST Message
  sendMessage = (messageIn) => {
    const message = {
      username: this.props.username,
      contentType: "text",
      message: messageIn,
      contentId: null,
    };
    let messages = this.state.messages;
    messages[this.state.currentChatroom].push(message); // TODO message format in state is changing
    this.setState({
      messages: messages,
    });
  };

  setSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
  };

  // TODO POST Video
  embedVideo = (index) => {
    const message = {
      username: this.props.username,
      contentType: "youtube video",
      message: null,
      contentId: this.state.searchResults[index].videoId,
    };
    let messages = this.state.messages;
    messages[this.state.currentChatroom].push(message); // TODO message format in state is changing
    this.setState({
      messages: messages,
      searchResults: null,
    });
  };

  closeSearch = () => {
    this.setState({
      searchResults: null,
    });
  };

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
