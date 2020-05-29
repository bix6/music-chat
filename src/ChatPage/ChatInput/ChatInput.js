import React from 'react';
import DisplayError from '../../shared-components/DisplayError/DisplayError';
import config from '../../config';

class ChatInput extends React.Component {
    state = {
        userInput: '',
        touched: false,
        error: ''
    };

    updateUserInput = (userInput) => {
        this.setState({ 
            userInput: userInput,
            touched: true
        });
    }

    validateUserInput = () => {
        if (this.state.userInput.trim().length < 1) {
            return 'Input cannot be empty'
        }
    }

    handleSendClicked = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.userInput);
        this.setState({
            userInput: '',
            touched: false,
        })
    }

    handleSearchClicked = (e) => {
        e.preventDefault();

        const queryString = `https://www.googleapis.com/youtube/v3/search?` + 
            `part=snippet&` +
            `maxResults=10&` +
            `key=${ config.YOUTUBE_API_KEY }&` +
            `q=${ this.state.userInput }`;

        // TODO why is this unsafe/can it be made safe?
        function unescapeHtml(unsafe) {
            return unsafe
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
        }

        fetch(queryString)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(resJson => {
                // thumbnail options are default (120, 90), medium (320, 180) or high (480, 360)
                let searchResults = resJson.items.map((item) => {
                    let title = unescapeHtml(item.snippet.title);
                    let channelTitle = unescapeHtml(item.snippet.channelTitle);
                    return {
                        videoId: item.id.videoId,
                        title: title,
                        channelTitle: channelTitle,
                        thumbnail: item.snippet.thumbnails.medium.url
                    }
                })
                this.props.setSearchResults(searchResults)
                this.setState({ 
                    userInput: '',
                    touched: false,
                    error: '' 
                })
            })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor='input-box'>Message:</label>
                    <textarea 
                        id='input-box' 
                        name='input-box' 
                        onChange={ e => this.updateUserInput(e.target.value) }
                        value={ this.state.userInput }/>
                    <button 
                        type='submit' 
                        onClick={ e => this.handleSendClicked(e) } 
                        disabled={ !this.state.touched || this.validateUserInput() }>
                            Send Message
                    </button>
                    <button 
                        type='submit' 
                        onClick={ e => this.handleSearchClicked(e) } 
                        disabled={ !this.state.touched || this.validateUserInput() }>
                            Search YouTube
                    </button>
                    { this.state.touched && <DisplayError message={ this.validateUserInput() }/> }
                    { !!this.state.error && <DisplayError message={ this.state.error }/> }
                </form>
            </div>
        )
    }
}

export default ChatInput;