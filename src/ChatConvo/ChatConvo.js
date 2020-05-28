import React from 'react';
import './ChatConvo.css';
import ChatContext from '../ChatContext';

class ChatConvo extends React.Component {
    static contextType = ChatContext;

   createListItems = () => {
       const currentChatroom = this.context.currentChatroom;
       const messages = this.context.messages[currentChatroom];
       const listItems = messages.map((message, i) => {
           return <li className="chat-convo-li" key={ i }>{ message }</li>
       })
       return listItems;
   }

    render() {
        return (
            <div className='chat-convo'>
                <ol className='chat-convo-ol'>
                    { this.createListItems() }
                </ol>
            </div>
        )
    }
}

export default ChatConvo;