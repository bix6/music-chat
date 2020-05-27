import React from 'react';
import './ChatPage.css';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import ChatSelector from '../ChatSelector/ChatSelector';

class ChatPage extends React.Component {
    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <ChatSelector />
                </main>
            </>
        )
    }
}

export default ChatPage;