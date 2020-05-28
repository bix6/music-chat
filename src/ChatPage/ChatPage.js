import React from 'react';
import './ChatPage.css';
import HeaderComponent from '../shared-components/HeaderComponent/HeaderComponent';
import ChatSelector from '../ChatSelector/ChatSelector';
import ChatConvo from '../ChatConvo/ChatConvo';
import ChatInput from '../ChatInput/ChatInput';

class ChatPage extends React.Component {
    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <ChatSelector />
                    <ChatConvo />
                    <ChatInput />
                </main>
            </>
        )
    }
}

export default ChatPage;