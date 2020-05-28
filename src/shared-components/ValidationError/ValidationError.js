import React from 'react';

const errorStyles = {
    color: 'red',
    fontSize: '1.8rem',
    margin: '1rem 0',
}

export default function ValidationError(props) {
    if (props.message) {
        return (
            <div style={ errorStyles }>{ props.message }</div>
        );
    }

    return <></>;
}