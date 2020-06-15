import React from "react";
import DisplayError from "../../../shared-components/DisplayError/DisplayError";
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
      <form className="message-input-form">
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
        {this.state.touched && (
          <DisplayError message={this.validateUserInput()} />
        )}
      </form>
    );
  }
}

export default MessageInput;
