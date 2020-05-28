import React from 'react';

class ChatSelector extends React.Component {
    static defaultProps = {
        chatroomList: []
    }

    createSelectOptions = () => {
        /* Create an option elem for each chatroom in the chatroom list */
        return this.props.chatroomList.map((chatroomName, i) => {
            return <option value={ chatroomName } key={ i }>{ chatroomName }</option>
        })
    }

    render() {
        return (
            <div>
                <label htmlFor="chat-select">Chat Room:</label>
                <select name="chat-select" id="chat-select" onChange= { e => this.props.updateCurrentChatroom(e.target.value) }>
                    { this.createSelectOptions() }
                </select>
            </div>
        )
    }
}

export default ChatSelector;