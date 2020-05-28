import React from 'react';

const headerStyles = {
    textAlign: 'center',
    margin: '2rem 0',
}

const h1Styles = {
    fontSize: '4rem',
    fontFamily: 'monospace'
}

export default function HeaderComponent() {
    return (
        <header style={ headerStyles }>
            <h1 style={ h1Styles }>Music Chat</h1>
        </header>
    );
}