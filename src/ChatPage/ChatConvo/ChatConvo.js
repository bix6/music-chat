import React from 'react';
import './ChatConvo.css';

const chatConvoStyles = {
    textAlign: 'left',
    margin: '2rem auto',
    maxWidth: '600px',
    border: '1px solid black',
    overflowY: 'auto',
    padding: '1rem'
};

const chatConvoLiStyles = {
    lineHeight: '2rem',
}

class ChatConvo extends React.Component {
    static defaultProps = {
        messages: {
            loading: [
                'Bixbot: chat loading... (maybe)',
            ]
        },
        currentChatroom: 'loading'
    }

    createConvoListElems = () => {
       /* Create li elems for each message in the current chatroom */
       return this.props.messages[this.props.currentChatroom].map((message, i) => {
           return <li 
                key={ i } 
                style={ chatConvoLiStyles}
                id='chat-convo-li'>
                    { message }
                </li>
       })
   }

    render() {
        return (
            <div style={ chatConvoStyles}>
                <ol>
                    { this.createConvoListElems() }
                </ol>
            </div>
        )
    }
}

export default ChatConvo;