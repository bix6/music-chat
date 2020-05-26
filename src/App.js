import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ChatPage from './ChatPage/ChatPage';
import ChatContext from './ChatContext';

class App extends React.Component {
    state = {
        name: ''
    };

    handleUpdateName = (name) => {
        this.setState({ name: name })
    };

    render() {
        const contextValue = {
            name: this.state.name,
            updateName: this.handleUpdateName
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