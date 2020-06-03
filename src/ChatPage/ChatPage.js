import React from 'react';
import HeaderComponent from '../shared-components/HeaderComponent/HeaderComponent';
import ChatSelector from './ChatSelector/ChatSelector';
import ChatConvo from './ChatConvo/ChatConvo';
import ChatInput from './ChatInput/ChatInput';
import SearchResults from './SearchResults/SearchResults';
import { chatroomList, messages } from './DummyChatData';

class ChatPage extends React.Component {
    state = {
        chatroomList: ['Loading'],
        currentChatroom: 'Loading',
        messages: {
            Loading: ['Bixbot: Chat loading...']
        },
        searchResults: null
    }

    componentDidMount() {
        this.setState({
            chatroomList: chatroomList,
            currentChatroom: 'Global',
            messages: messages,
        })
    }

    updateCurrentChatroom = (chatroom) => {
        this.setState({ currentChatroom: chatroom });
    }

    sendMessage = (messageIn) => {
        const message = {
            username: this.props.username,
            contentType: 'text',
            message: messageIn,
            contentId: null
        }
        let messages = this.state.messages;
        messages[this.state.currentChatroom].push(message);
        this.setState({
            messages: messages
        })
    }

    setSearchResults = (searchResults) => {
        this.setState({ searchResults: searchResults})
    }

    embedVideo = (index) => {
        const message = {
            username: this.props.username,
            contentType: 'youtube video',
            message: null,
            contentId: this.state.searchResults[index].videoId
        }
        let messages = this.state.messages;
        messages[this.state.currentChatroom].push(message);
        this.setState({
            messages: messages,
            searchResults: null
        })
    }

    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <ChatSelector 
                        chatroomList={ this.state.chatroomList }
                        currentChatroom={ this.state.currentChatroom }
                        updateCurrentChatroom={ this.updateCurrentChatroom }/>
                    <ChatConvo 
                        currentChatroom={ this.state.currentChatroom }
                        messages={ this.state.messages }/>
                    <ChatInput 
                        sendMessage={ this.sendMessage }
                        setSearchResults={ this.setSearchResults }/>
                    { this.state.searchResults 
                        && <SearchResults 
                            searchResults={ this.state.searchResults }
                            embedVideo={ this.embedVideo }/> }
                </main>
            </>
        )
    }
}

export default ChatPage;