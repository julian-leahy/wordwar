import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChar } from '../board/boardSlice';
import './Square.scss';

function Square({ tile }) {

    const dispatch = useDispatch();
    const [active, setActive] = useState(false)

    const selectedChar = () => {
        dispatch(addChar(tile));
        setActive(true);
    }

    return (
        <div
            className={`square ${active ? 'active' : ''}`}
            aria-label='Select Letter'
            role='button'
            onClick={selectedChar}
        >
            {tile}
        </div>
    )
}

export default Square;