import React from 'react';

const ChatContext = React.createContext({
    username: '',
    chatroomList: [],
    currentChatroom: '',
    updateChatroom: () => {},
    messages: {},
    sendMessage: () => {}
});

export default ChatContext;