import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ChatPage from './ChatPage/ChatPage';
import ChatContext from './ChatContext';

class App extends React.Component {
    state = {
        username: '',
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
    };

    updateUsername = (username) => {
        this.setState({ username: username });
    }

    handleUpdateChatroom = (chatroom) => {
        this.setState({ currentChatroom: chatroom });
    }

    handleSendMessage = (messageIn) => {
        let message = this.state.username + ': ' + messageIn;
        const currentChatroom = this.state.currentChatroom;
        let messages = this.state.messages;
        messages[currentChatroom].push(message);
        this.setState({
            messages: messages
        })
    }

    render() {
        const contextValue = {
            username: this.state.username,
            chatroomList: this.state.chatroomList,
            currentChatroom: this.state.currentChatroom,
            updateChatroom: this.handleUpdateChatroom,
            messages: this.state.messages,
            sendMessage: this.handleSendMessage
        };
        
        return (
            <ChatContext.Provider value={ contextValue }>
                <Switch>
                    <Route 
                        exact path='/' 
                        render={ (props) => <LandingPage {...props} updateUsername={ this.updateUsername }/> } 
                    />
                    <Route exact path='/chat' component={ ChatPage } />
                </Switch>
            </ChatContext.Provider>
        );
    }
}

export default App;