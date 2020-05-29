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

    // TODO make messages objects with keys for message, iframe, username, etc.
    createConvoListElems = () => {
       /* Create li elems for each message in the current chatroom */
       return this.props.messages[this.props.currentChatroom].map((message, i) => {
            const iframeStartIndex = message.search(`YOUTUBE_IFRAME`);

            if (iframeStartIndex === -1) {
                return (
                    <li 
                        key={ i } 
                        style={ chatConvoLiStyles}
                        id='chat-convo-li'>
                            { message }
                    </li>);
            }

            const usernameWithColon = message.slice(0, message.search(':') + 1);
            const videoId = message.slice(iframeStartIndex + 15); // TODO make this not arbitrary
            const embedURL = `https://www.youtube.com/embed/${ videoId }`

            return (
                <li 
                    key={ i } 
                    style={ chatConvoLiStyles}
                    id='chat-convo-li'>
                        { usernameWithColon }
                        <iframe width='480px' // TODO set this dynamically
                            height='270px' 
                            src={ embedURL } 
                            frameBorder='0'
                            encrypted-media="true" 
                            gyroscope="true" 
                            picture-in-picture="true"
                            allowFullScreen />
                </li>);
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