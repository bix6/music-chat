import React from 'react';
import './LandingPage.css';
import ValidationError from '../ValidationError/ValidationError';
import ChatContext from '../ChatContext';

class LandingPage extends React.Component {
    static contextType = ChatContext;

    state = {
        touched: false
    };

    updateName = (name) => {
        this.setState({
            touched: true
        });

        this.context.updateName(name)
    }

    validateName = () => {
        const name = this.context.name.trim();

        if (name.length < 2) {
            return 'Name must be 2 characters or more'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/chat');
    }

    render() {
        return (
            <>
                <header>
                    <h1>Music Chat</h1>
                </header>
                <main>
                    <p>Share music across the globe. Choose a name to get started.</p>
                    <form onSubmit={ e => this.handleSubmit(e) }>
                        <label htmlFor="choose-name">Name / Nickname:</label>
                        <input type="text" id="choose-name" name="choose-name" 
                            onChange= { e => { this.updateName(e.target.value) } }/>
                        <button type="submit" disabled={ this.validateName() }>Chat</button>
                        { this.state.touched && <ValidationError message={ this.validateName() }/> }
                    </form>
                </main>
            </>
        )
    }
}

export default LandingPage;