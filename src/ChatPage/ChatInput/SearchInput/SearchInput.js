import React from "react";
import DisplayMessage from "../../../shared-components/DisplayMessage/DisplayMessage";
import config from "../../../config";
import "./SearchInput.css";

class SearchInput extends React.Component {
  state = {
    userInput: "",
    touched: false,
    error: "",
    loadingMessage: "",
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

  handleSearchClicked = (e) => {
    e.preventDefault();

    this.setState({
      loadingMessage: "Searching YouTube...",
    });

    const queryString =
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `maxResults=10&` +
      `type=video&` +
      `key=${config.YOUTUBE_API_KEY}&` +
      `q=${this.state.userInput}`;

    function unescapeHtml(unsafe) {
      return unsafe
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }

    console.log(queryString);

    fetch(queryString)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resJson) => {
        // thumbnail options are default (120, 90), medium (320, 180) or high (480, 360)
        let searchResults = resJson.items.map((item) => {
          let title = unescapeHtml(item.snippet.title);
          let channelTitle = unescapeHtml(item.snippet.channelTitle);
          return {
            videoId: item.id.videoId,
            title: title,
            channelTitle: channelTitle,
            thumbnail: item.snippet.thumbnails.medium.url,
          };
        });
        this.props.setSearchResults(searchResults);
        this.setState({
          userInput: "",
          touched: false,
          error: "",
          loadingMessage: "",
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <form className="chat-input-form">
        <div className="chat-input-flex-div">
          <label htmlFor="search-input">{"YouTube:"}</label>
          <input
            type="text"
            id="search-input"
            name="search-input"
            onChange={(e) => this.updateUserInput(e.target.value)}
            value={this.state.userInput}
          />
          <button
            type="submit"
            onClick={(e) => this.handleSearchClicked(e)}
            disabled={!this.state.touched || this.validateUserInput()}
          >
            Search
          </button>
        </div>
        {!!this.state.error && <DisplayMessage message={this.state.error} />}
        {!!this.state.loadingMessage && (
          <DisplayMessage message={this.state.loadingMessage} color="white" />
        )}
      </form>
    );
  }
}

export default SearchInput;
