import React from 'react';
import './Output.scss';

function Output({ char }) {
    return (
        <span className='board__output-char'>
            {char}
        </span>
    )
}

export default Output;