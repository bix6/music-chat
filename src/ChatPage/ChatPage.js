import React from 'react';
import HeaderComponent from '../shared-components/HeaderComponent/HeaderComponent';
import ChatSelector from './ChatSelector/ChatSelector';
import ChatConvo from './ChatConvo/ChatConvo';
import ChatInput from './ChatInput/ChatInput';

class ChatPage extends React.Component {
    state = {
        chatroomList: ['Global', 'Artists', 'Songs'],
        currentChatroom: 'Global',
        messages: {
            'Global': [
                'Jack: Music Chat',
                'Jac: Hear the sounds of the symphony',
                'Ja: Yes I can hear the cacophony',
                'J: Phony, real phony'
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
                'Chester: You, Hubert. It\'s about you Hubert',
            ]
        }
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

    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <ChatSelector 
                        chatroomList={ this.state.chatroomList }
                        updateCurrentChatroom={ this.updateCurrentChatroom }/>
                    <ChatConvo 
                        currentChatroom={ this.state.currentChatroom }
                        messages={ this.state.messages }/>
                    <ChatInput 
                        sendMessage={ this.sendMessage }/>
                </main>
            </>
        )
    }
}

export default ChatPage;