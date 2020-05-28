import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ChatPage from './ChatPage/ChatPage';
import ChatContext from './ChatContext';

class App extends React.Component {
    state = {
        name: '',
        chatroomList: ['Global', 'Artists', 'Songs'],
        currentChatroom: 'Global',
        messages: {
            'Global': [
                'Jack: Music Chat',
                'Jac: Hear the sounds of the symphony',
                'Ja: Yes I can hear',
                'J: The end'
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

    handleUpdateName = (name) => {
        this.setState({ name: name });
    }

    handleUpdateChatroom = (chatroom) => {
        this.setState({ currentChatroom: chatroom });
    }

    render() {
        const contextValue = {
            name: this.state.name,
            updateName: this.handleUpdateName,
            chatroomList: this.state.chatroomList,
            currentChatroom: this.state.currentChatroom,
            updateChatroom: this.handleUpdateChatroom,
            messages: this.state.messages
        };
        
        return (
            <ChatContext.Provider value={ contextValue }>
                <Switch>
                    <Route exact path='/' component={ LandingPage } />
                    <Route exact path='/chat' component={ ChatPage } />
                </Switch>
            </ChatContext.Provider>
        );
    }
}

export default App;