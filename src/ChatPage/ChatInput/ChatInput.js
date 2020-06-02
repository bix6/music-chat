import React from 'react';
import MessageInput from './MessageInput/MessageInput';
import SearchInput from './SearchInput/SearchInput';

export default function ChatInput(props) {
    return (
        <div>
            <MessageInput sendMessage={ props.sendMessage }/>
            <SearchInput setSearchResults={ props.setSearchResults }/>
        </div>
    );
}