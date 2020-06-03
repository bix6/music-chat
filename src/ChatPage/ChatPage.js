import React from 'react';
import HeaderComponent from '../shared-components/HeaderComponent/HeaderComponent';
import ChatSelector from './ChatSelector/ChatSelector';
import ChatConvo from './ChatConvo/ChatConvo';
import ChatInput from './ChatInput/ChatInput';
import SearchResults from './SearchResults/SearchResults';

class ChatPage extends React.Component {
    state = {
        chatroomList: [
            {
                name: 'Global',
                description: 'Welcome to the World Wide Music Chat!'
            },
            {
                name: 'Playlists',
                description: 'A place to discuss your favorite playlists.'
            },
            {
                name: 'Mood',
                description: 'How do you feel today?'
            },
            {
                name: 'Artists',
                description: 'Keep up to date on your favorite artists.'
            },
            {
                name: 'Songs',
                description: 'All the single songs'
            },
            {
                name: 'Doin\' Time',
                description: 'Chat about Doin\' time by Sublime (and now Lana)'
            }
        ],
        currentChatroom: 'Global',
        messages: {
            'Global': [
                'Jack: Music Chat Baby!!!!!',
                'Jac: Just gonna talk to myself',
                'Ja: A cacophony of Jacks',
                'J: Phony, real phony'
            ],
            'Playlists': [
                'Dalbert: Please let me share playlists',
                'Jack: Ok',
                'Dalbert: Please send Lorde to my estate',
                'Jack: She will be escorted by 20 Golden Kiwis'
            ],
            'Mood': [
                'Brownie: My mood is sassy cuz it is hot and I\'m listening to Milkshake',
                'Basil: I am so chilled out listening to Baby Take Off Your Cool',
                'Brownie: Damn that\'s fresh Basil'
            ],
            'Artists': [
                'Jerry: Have you heard of Timbo?',
                'Timbo: Yes',
                'Jerry: He is really good',
                'Timbo: No'
            ],
            'Songs': [
                'Chester: I wrote a song',
                'Hubert: About what?',
                'Chester: You, Hubert. It\'s about you Hubert.',
            ],
            'Doin\' Time': [
                'Nick: Alright! Now we can chat about individual songs.',
                'Jack: Summertime and the coding is not easy.',
                'Nick: Ain\'t no thang.',
                'Jack: So which version would you pick: Sublime or Lana?',
                'Nick: ...'

            ]
        },
        searchResults: null
    }

    updateCurrentChatroom = (chatroom) => {
        this.setState({ currentChatroom: chatroom });
    }

    sendMessage = (messageIn) => {
        let message = this.props.username + ': ' + messageIn;
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
        const videoId = this.state.searchResults[index].videoId;
        this.sendMessage(`YOUTUBE_IFRAME ${ videoId }`)
        this.setState({ searchResults: null})
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