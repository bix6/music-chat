import React from 'react';
import './ChatInput.css';
import ChatContext from '../ChatContext';
import ValidationError from '../shared-components/ValidationError/ValidationError';

class ChatInput extends React.Component {
    static contextType = ChatContext;

    state = {
        userInput: '',
        touched: false
    };

    updateUserInput = (e) => {
        this.setState({ 
            userInput: e.target.value,
            touched: true
        });
    }

    handleSendClicked = (e) => {
        e.preventDefault();
        this.context.sendMessage(this.state.userInput);
    }

    handleSearchClicked = (e) => {
        e.preventDefault();
    }

    validateUserInput = () => {
        const userInput = this.state.userInput.trim();

        if (userInput.length < 1) {
            return 'Input cannot be empty'
        }
    }

    render() {
        return (
            <div className="ChatInput">
                <form className='chat-input-form' >
                    <label htmlFor='input-box'>Message:</label>
                    <textarea id='input-box' name='input-box' onChange={ e => this.updateUserInput(e) }/>
                    <button type='submit' onClick={ e => this.handleSendClicked(e) } disabled={ !this.state.touched }>Send</button>
                    <button type='submit' onClick={ e => this.handleSearchClicked(e) } disabled={ !this.state.touched }>Search</button>
                    { this.state.touched && <ValidationError message={ this.validateUserInput() }/> }
                </form>
            </div>
        )
    }
}

export default ChatInput;