import React from 'react';

const ChatContext = React.createContext({
    name: '',
    updateName: () => {}
});

export default ChatContext;