import React from "react";

class ChatSelector extends React.Component {
  static defaultProps = {
    chatroomList: [],
    currentChatroom: {},
  };

  // Create an option elem for each chatroom in the chatroom list
  createSelectOptions = () => {
    return this.props.chatroomList.map((chatroomObj, i) => {
      return (
        <option value={chatroomObj.id} key={i}>
          {chatroomObj.name}
        </option>
      );
    });
  };

  render() {
    return (
      <>
        <form className="chat-selector-form">
          <label htmlFor="chat-select">Chatroom: </label>
          <select
            name="chat-select"
            id="chat-select"
            value={this.props.currentChatroom.id}
            onChange={(e) => this.props.updateCurrentChatroom(e.target.value)}
          >
            {this.createSelectOptions()}
          </select>
          <button type="button" onClick={this.props.displayNewChatroom}>
            + Room
          </button>
        </form>
        <h2 className="chat-selector-h2">
          {this.props.currentChatroom.description}
        </h2>
      </>
    );
  }
}

export default ChatSelector;
