import React from 'react';

class ChatSelector extends React.Component {
    static defaultProps = {
        chatroomList: []
    }

    /* Create an option elem for each chatroom in the chatroom list */
    createSelectOptions = () => {
        return this.props.chatroomList.map((chatroomObj, i) => {
            return <option value={ chatroomObj.name } key={ i }>{ chatroomObj.name }</option>
        })
    }

    render() {
        let curChatroomDescription = null;
        this.props.chatroomList.forEach(chatroomObj => {
            if (chatroomObj.name === this.props.currentChatroom) {
                curChatroomDescription = chatroomObj.description;
            }
        })

        return (
            <div>
                <label htmlFor="chat-select">Chat Room</label>
                <select name="chat-select" id="chat-select" onChange= { e => this.props.updateCurrentChatroom(e.target.value) }>
                    { this.createSelectOptions() }
                </select>
                <p>{ curChatroomDescription }</p> 
            </div>
        )
    }
}

export default ChatSelector;