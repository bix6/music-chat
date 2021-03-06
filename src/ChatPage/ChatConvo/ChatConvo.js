import React from "react";
import "./ChatConvo.css";

class ChatConvo extends React.Component {
  static defaultProps = {
    messages: {},
    currentChatroom: {},
  };

  // Scroll to the bottom of the chat convo using the ref convoEnd
  // convoEnd is just an empty div placed at the bottom of the convo
  // Had to do this because accessing the DOM directly wasn't working
  scrollToBottom = () => {
    if (this.convoEnd) {
      this.convoEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  createMessageLi = (messageObj, i) => {
    const message = messageObj.username + ": " + messageObj.message;

    return (
      <li key={i} className="chat-convo-li">
        {message}
      </li>
    );
  };

  createYoutubeVideoLi = (messageObj, i) => {
    const src = `https://www.youtube.com/embed/${messageObj.content_id}`;
    const title = `Embeded YouTube videoId: ${messageObj.content_id}`;
    return (
      <li key={i} className="chat-convo-li">
        {messageObj.username + ": "}
        <iframe
          width="480px" // Fallback size; gets set dynamically in css
          height="270px"
          src={src}
          frameBorder="0"
          encrypted-media="true"
          gyroscope="true"
          picture-in-picture="true"
          title={title}
          allowFullScreen
        />
      </li>
    );
  };

  /* Create li elems for each messageObj in the current chatroom */
  createConvoListElems = () => {
    if (this.props.messages[this.props.currentChatroom.id]) {
      return this.props.messages[this.props.currentChatroom.id].map(
        (messageObj, i) => {
          if (messageObj.content_type === "text") {
            return this.createMessageLi(messageObj, i);
          } else if (messageObj.content_type === "youtube video") {
            return this.createYoutubeVideoLi(messageObj, i);
          }
          return <></>;
        }
      );
    }
    return <></>;
  };

  render() {
    return (
      <div className="chat-convo-div">
        <ol>{this.createConvoListElems()}</ol>
        <div
          ref={(elem) => {
            this.convoEnd = elem;
          }}
        />
      </div>
    );
  }
}

export default ChatConvo;
