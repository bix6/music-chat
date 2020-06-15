import React from "react";
import DisplayError from "../../shared-components/DisplayError/DisplayError";

class NewChatroom extends React.Component {
  state = {
    newChatroom: "",
    chatroomTouched: false,
    newDescription: "",
    descriptionTouched: false,
    successMessage: "",
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
    return (
      <form
        className="new-chatroom-form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
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

export default NewChatroom;
