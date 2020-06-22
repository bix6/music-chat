import React from "react";

class ChatSelector extends React.Component {
  static defaultProps = {
    chatroomList: [],
  };

  // Create an option elem for each chatroom in the chatroom list
  createSelectOptions = () => {
    return this.props.chatroomList.map((chatroomObj, i) => {
      return (
        <option value={chatroomObj.name} key={i}>
          {chatroomObj.name}
        </option>
      );
    });
  };

  render() {
    // TODO is there a better way to handle this?
    let curChatroomDescription = null;
    this.props.chatroomList.forEach((chatroomObj) => {
      if (chatroomObj.name === this.props.currentChatroom) {
        curChatroomDescription = chatroomObj.description;
      }
    });

    return (
      <form className="chat-selector-form">
        <label htmlFor="chat-select">Chatroom: </label>
        <select
          name="chat-select"
          id="chat-select"
          value={this.props.currentChatroom}
          onChange={(e) => this.props.updateCurrentChatroom(e.target.value)}
        >
          {this.createSelectOptions()}
        </select>
        <button type="button" onClick={this.props.displayNewChatroom}>
            Create Chatroom
        </button>
        <p>{curChatroomDescription}</p>
      </form>
    );
  }
}

export default ChatSelector;
