import React from "react";
import "./ChatConvo.css";

class ChatConvo extends React.Component {
  static defaultProps = {
    messages: {
      Loading: ["Bixbot: Chat loading... "],
    },
    currentChatroom: "Loading",
  };

  createMessageLi = (messageObj, i) => {
    const message = messageObj.username + ": " + messageObj.message;

    return (
      <li key={i} className="chat-convo-li">
        {message}
      </li>
    );
  };

  createYoutubeVideoLi = (messageObj, i) => {
    const src = `https://www.youtube.com/embed/${messageObj.contentId}`;
    const title = `Embeded YouTube videoId: ${messageObj.contentId}`;

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
    return this.props.messages[this.props.currentChatroom].map(
      (messageObj, i) => {
        if (messageObj.contentType === "text") {
          return this.createMessageLi(messageObj, i);
        } else if (messageObj.contentType === "youtube video") {
          return this.createYoutubeVideoLi(messageObj, i);
        }
        return "Bixbot: Error Retrieving Message";
      }
    );
  };

  render() {
    return (
      <div className="chat-convo-div">
        <ol>{this.createConvoListElems()}</ol>
      </div>
    );
  }
}

export default ChatConvo;
