import React from 'react';
import './ChatSelector.css';
import ChatContext from '../ChatContext';

class ChatSelector extends React.Component {
    static contextType = ChatContext;

    createSelectOptions = () => {
        const selectOptions = this.context.chatroomList.map((chatroomName, i) => {
            return <option value={ chatroomName } className="chat-select-option" key={ i }>{ chatroomName }</option>
        })
        return selectOptions;
    }

    render() {
        return (
            <div className="chat-selector">
                <label htmlFor="chat-select">Chat Room:</label>
                <select name="chat-select" id="chat-select" onChange= { e => this.context.updateChatroom(e.target.value) }>
                    { this.createSelectOptions() }
                </select>
            </div>
        )
    }
}

export default ChatSelector;