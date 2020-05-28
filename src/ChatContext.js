import React from 'react';

const ChatContext = React.createContext({
    name: '',
    updateName: () => {},
    chatroomList: [],
    currentChatroom: '',
    updateChatroom: () => {},
    messages: {}
});

export default ChatContext;