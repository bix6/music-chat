import React from 'react';
import ValidationError from '../../shared-components/ValidationError/ValidationError';

class ChatInput extends React.Component {
    state = {
        userInput: '',
        touched: false
    };

    updateUserInput = (userInput) => {
        this.setState({ 
            userInput: userInput,
            touched: true
        });
    }

    validateUserInput = () => {
        const userInput = this.state.userInput.trim();

        if (userInput.length < 1) {
            return 'Input cannot be empty'
        }
    }

    handleSendClicked = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.userInput);
        this.setState({
            userInput: '',
            touched: false
        })
    }

    handleSearchClicked = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor='input-box'>Message:</label>
                    <textarea 
                        id='input-box' 
                        name='input-box' 
                        onChange={ e => this.updateUserInput(e.target.value) }
                        value={ this.state.userInput }/>
                    <button 
                        type='submit' 
                        onClick={ e => this.handleSendClicked(e) } 
                        disabled={ !this.state.touched }>
                            Send
                    </button>
                    <button 
                        type='submit' 
                        onClick={ e => this.handleSearchClicked(e) } 
                        disabled={ !this.state.touched }>
                            Search
                    </button>
                    { this.state.touched && <ValidationError message={ this.validateUserInput() }/> }
                </form>
            </div>
        )
    }
}

export default ChatInput;