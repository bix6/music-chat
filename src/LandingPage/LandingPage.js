import React from 'react';
import HeaderComponent from '../shared-components/HeaderComponent/HeaderComponent';
import ValidationError from '../shared-components/ValidationError/ValidationError';

class LandingPage extends React.Component {
    state = {
        username: '',
        touched: false
    };

    updateUsername = (username) => {
        this.setState({
            username: username,
            touched: true
        });
    }

    validateUsername = () => {
        const username = this.state.username.trim();

        if (username.length < 2) {
            return 'Name must be 2 characters or more'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUsername(this.state.username);
        this.props.history.push('/chat');
    }

    render() {
        return (
            <>
                <HeaderComponent />
                <main>
                    <p>Share music across the globe. <br />Enter a name to get started.</p>
                    <form onSubmit={ e => this.handleSubmit(e) }>
                        <label htmlFor="choose-username">Name / Nickname:</label>
                        <input type="text" id="choose-username" name="choose-username" 
                            onChange= { e =>  this.updateUsername(e.target.value) }/>
                        <button type="submit" disabled={ this.validateUsername() }>Chat</button>
                        { this.state.touched && <ValidationError message={ this.validateUsername() }/> }
                    </form>
                </main>
            </>
        )
    }
}

export default LandingPage;