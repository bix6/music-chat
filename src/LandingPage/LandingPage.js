import React from 'react';
import './LandingPage.css';
import ValidationError from '../ValidationError/ValidationError';

class LandingPage extends React.Component {
    state = {
        name: '',
        touched: false
    };

    updateName = (name) => {
        this.setState({
            name: name,
            touched: true
        });
    }

    validateName = () => {
        const name = this.state.name.trim();

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
                        { this.state.touched && <ValidationError message={ this.validateName() }/> }
                        <button type="submit" disabled={ this.validateName() }>Chat</button>
                    </form>
                </main>
            </>
        )
    }
}

export default LandingPage;