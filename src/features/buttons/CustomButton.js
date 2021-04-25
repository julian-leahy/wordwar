import React from 'react';
import './CustomButton.scss';

function CustomButton({ level, set }) {
    return (
        <button className="button" aria-label={`Level ${level}`} onClick={() => set(level)}>
            {level}
            <div className="button__horizontal"></div>
            <div className="button__vertical"></div>
        </button>
    )
}

export default CustomButton;