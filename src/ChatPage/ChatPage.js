import React from "react";
import ChatSelector from "./ChatSelector/ChatSelector";
import ChatConvo from "./ChatConvo/ChatConvo";
import ChatInput from "./ChatInput/ChatInput";
import SearchResults from "./SearchResults/SearchResults";
import { messages } from "./DummyChatData";
import NewChatroom from "./NewChatroom/NewChatroom";
import "./ChatPage.css";
import config from "../config";

class ChatPage extends React.Component {
  state = {
    chatroomList: [],
    currentChatroom: "",
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
        let currentChatroom = resJson[0].name;
        this.setState({
          chatroomList: resJson,
          currentChatroom: currentChatroom,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.initChatrooms();
    console.log(this.state.chatroomList);
    this.setState({
      messages: messages,
    });
  }

  updateCurrentChatroom = (chatroom) => {
    this.setState({ currentChatroom: chatroom });
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

    this.setState({
      chatroomList: [...chatroomList, newChatroom],
      messages: { ...messages, [chatroom]: newMessage },
      currentChatroom: chatroom,
    });
  };

  sendMessage = (messageIn) => {
    const message = {
      username: this.props.username,
      contentType: "text",
      message: messageIn,
      contentId: null,
    };
    let messages = this.state.messages;
    messages[this.state.currentChatroom].push(message);
    this.setState({
      messages: messages,
    });
  };

  setSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
  };

  embedVideo = (index) => {
    const message = {
      username: this.props.username,
      contentType: "youtube video",
      message: null,
      contentId: this.state.searchResults[index].videoId,
    };
    let messages = this.state.messages;
    messages[this.state.currentChatroom].push(message);
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
