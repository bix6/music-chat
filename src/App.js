import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ChatPage from './ChatPage/ChatPage';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ LandingPage } />
                <Route exact path='/chat' component={ ChatPage } />
            </Switch>
        );
    }
}

export default App;