import React from "react";
import "./SearchResults.css";

class SearchResults extends React.Component {
  static defaultProps = {
    searchResults: [],
  };

  createListItems = () => {
    return this.props.searchResults.map((result, i) => {
      return (
        // Storing i in the id so we can access it onClick to determine
        // the li element that was clicked
        <li
          key={i}
          id={i}
          onClick={(e) => this.props.embedVideo(e.target.parentElement.id)}
        >
          <img alt="video thumbnail" src={result.thumbnail} />
          <br />
          {result.title}
          <br />
          {result.channelTitle}
          <br />
          <button type="button">Embed</button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="search-results-div">
        <ol className="search-results-ol">
          <button
            type="button"
            onClick={this.props.closeSearch}
            className="cancel-button"
          >
            Cancel
          </button>
          {this.createListItems()}
        </ol>
      </div>
    );
  }
}

export default SearchResults;
