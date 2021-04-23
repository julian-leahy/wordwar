import React from 'react';
import './Output.scss';

function Output({ char }) {
    return (
        <span className='char'>
            {char}
        </span>
    )
}

export default Output;