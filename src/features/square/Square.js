import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChar, isActive, resetIsActive } from '../board/boardSlice';
import './Square.scss';

function Square({ tile, id, disabled }) {

    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    const selectedChar = () => {
        dispatch(addChar(tile));
        setActive(true);
        freeSquares(id)
    }

    // checks for squares that are within 1 square of selected
    const freeSquares = (index) => {
        // reset active squares from previous selection
        dispatch(resetIsActive());
        const up = index - 4;
        const down = index + 4;
        const validation = [[up, '^'], [down, 'v'], [index - 1, '<'], [up - 1, '<'], [down - 1, '<'], [index + 1, '>'], [up + 1, '>'], [down + 1, '>']];
        validation.forEach(e => availableTiles(e))
    }

    const availableTiles = (arr = []) => {
        const [i, dir] = arr;
        if (i < 0 || i >= 4 * 4) return;
        if (dir === '<' && (i + 1) % 4 === 0) return;
        if (dir === '>' && i % 4 === 0) return;
        // add to redux all available squares (by id)
        dispatch(isActive(i));
    };



    return (
        <div
            className={`square ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            aria-label='Select Letter'
            role='button'
            onClick={selectedChar}
        >
            {tile}
        </div>
    )
}

export default Square;