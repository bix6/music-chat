import React from "react";
import DisplayMessage from "../../../shared-components/DisplayMessage/DisplayMessage";
import "./MessageInput.css";

class MessageInput extends React.Component {
  state = {
    userInput: "",
    touched: false,
  };

  updateUserInput = (userInput) => {
    this.setState({
      userInput: userInput,
      touched: true,
    });
  };

  validateUserInput = () => {
    if (this.state.userInput.trim().length < 1) {
      return "Input cannot be empty";
    }
  };

  handleSendClicked = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.userInput);
    this.setState({
      userInput: "",
      touched: false,
    });
  };

  render() {
    return (
      <form className="chat-input-form">
        <div className="chat-input-flex-div">
          <label htmlFor="message-input">Chat:</label>
          <input
            type="text"
            id="message-input"
            name="message-input"
            onChange={(e) => this.updateUserInput(e.target.value)}
            value={this.state.userInput}
          />
          <button
            type="submit"
            onClick={(e) => this.handleSendClicked(e)}
            disabled={!this.state.touched || this.validateUserInput()}
          >
            Send
          </button>
        </div>
        {this.state.touched && (
          <DisplayMessage message={this.validateUserInput()} />
        )}
      </form>
    );
  }
}

export default MessageInput;
