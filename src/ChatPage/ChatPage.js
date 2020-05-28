import React from 'react';
import './ChatPage.css';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import ChatSelector from '../ChatSelector/ChatSelector';
import ChatConvo from '../ChatConvo/ChatConvo';

class ChatPage extends React.Component {
    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <ChatSelector />
                    <ChatConvo />
                </main>
            </>
        )
    }
}

export default ChatPage;