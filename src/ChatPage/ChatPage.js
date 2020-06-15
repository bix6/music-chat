import React from "react";
import HeaderComponent from "../shared-components/HeaderComponent/HeaderComponent";
import ChatSelector from "./ChatSelector/ChatSelector";
import ChatConvo from "./ChatConvo/ChatConvo";
import ChatInput from "./ChatInput/ChatInput";
import SearchResults from "./SearchResults/SearchResults";
import { chatroomList, messages } from "./DummyChatData";
import NewChatroom from "./NewChatroom/NewChatroom";

class ChatPage extends React.Component {
  state = {
    chatroomList: ["Loading"],
    currentChatroom: "Loading",
    newChatroomDisplay: "none",
    messages: {
      Loading: ["Bixbot: Chat loading..."],
    },
    searchResults: null,
  };

  componentDidMount() {
    this.setState({
      chatroomList: chatroomList,
      currentChatroom: "Global",
      messages: messages,
    });
  }

  updateCurrentChatroom = (chatroom) => {
    this.setState({ currentChatroom: chatroom });
  };

  displayNewChatroom = () => {
    this.setState({ newChatroomDisplay: "block" });
  };

  hideNewChatroom = () => {
    this.setState({ newChatroomDisplay: "none" });
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
      <>
        <HeaderComponent />
        <main>
          <ChatSelector
            chatroomList={this.state.chatroomList}
            currentChatroom={this.state.currentChatroom}
            updateCurrentChatroom={this.updateCurrentChatroom}
          />
          <button type="button" onClick={this.displayNewChatroom}>
            Create Chatroom
          </button>
          <NewChatroom
            createChatroom={this.createChatroom}
            newChatroomDisplay={this.state.newChatroomDisplay}
            hideNewChatroom={this.hideNewChatroom}
          />
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
      </>
    );
  }
}

export default ChatPage;
