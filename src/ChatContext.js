import React from 'react';

const ChatContext = React.createContext({
    name: '',
    updateName: () => {},
    chatroomList: [],
    currentChatroom: '',
    updateChatroom: () => {}
});

export default ChatContext;