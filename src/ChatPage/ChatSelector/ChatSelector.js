import React from "react";
import DisplayError from "../../shared-components/DisplayError/DisplayError";

class ChatSelector extends React.Component {
  static defaultProps = {
    chatroomList: [],
  };

  state = {
    newChatroom: "",
    chatroomTouched: false,
    newDescription: "",
    descriptionTouched: false,
    successMessage: "",
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

  updateNewChatroom = (chatroom) => {
    this.setState({
      newChatroom: chatroom,
      chatroomTouched: true,
    });
  };

  validateNewChatroom = () => {
    const chatroom = this.state.newChatroom.trim();

    if (chatroom.length < 1) {
      return "Chatroom must be 1 character or more";
    }
  };

  updateNewChatroomDescription = (description) => {
    this.setState({
      newDescription: description,
      descriptionTouched: true,
    });
  };

  validateNewChatroomDescription = () => {
    const description = this.state.newDescription.trim();

    if (description.length < 1) {
      return "Description must be 1 character or more";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createChatroom(
      this.state.newChatroom,
      this.state.newDescription
    );
    this.setState({
      newChatroom: "",
      chatroomTouched: false,
      newDescription: "",
      descriptionTouched: false,
      successMessage: "Chatroom Created",
    });
    setTimeout(() => {
      this.setState({
        successMessage: "",
      });
    }, 3000);
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
      // TODO split this into a NewChatroom Component and refactor to shorter names
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="chat-select">Chat Room</label>
        <select
          name="chat-select"
          id="chat-select"
          onChange={(e) => this.props.updateCurrentChatroom(e.target.value)}
        >
          {this.createSelectOptions()}
        </select>
        <p>{curChatroomDescription}</p>
        <label htmlFor="new-chatroom">New Chatroom:</label>
        <input
          type="text"
          name="new-chatroom"
          id="new-chatroom"
          value={this.state.newChatroom}
          onChange={(e) => this.updateNewChatroom(e.target.value)}
        />
        <label htmlFor="new-chatroom-description">Description:</label>
        <input
          type="text"
          name="new-chatroom-description"
          id="new-chatroom-description"
          value={this.state.newDescription}
          onChange={(e) => this.updateNewChatroomDescription(e.target.value)}
        />
        <button
          type="submit"
          disabled={
            this.validateNewChatroom() || this.validateNewChatroomDescription()
          }
        >
          Create Chatroom
        </button>
        {this.state.chatroomTouched && (
          <DisplayError message={this.validateNewChatroom()} />
        )}
        {this.state.descriptionTouched && (
          <DisplayError message={this.validateNewChatroomDescription()} />
        )}
        {!!this.state.successMessage && <div>{this.state.successMessage}</div>}
      </form>
    );
  }
}

export default ChatSelector;
