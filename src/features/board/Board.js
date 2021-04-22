import React from 'react';
import './Board.scss'
import { useSelector } from 'react-redux';
import Square from '../square/Square';
import { selectBoard, selectChar, selectDisabled } from '../board/boardSlice';
import Output from '../output/Output';

let disabled;

function Board() {

    const tiles = useSelector(selectBoard);
    const chars = useSelector(selectChar);
    const active = useSelector(selectDisabled)

    return (
        <div className='board-wrap'>
            <div className='board'>
                {tiles.map((tile, idx) => {
                    if (active.length > 0)
                        // add disabled class to any squares not within reach of selected item
                        disabled = active.includes(idx) ? false : true;
                    return (
                        <Square key={idx} tile={tile} id={idx} disabled={disabled} />
                    )
                })}
            </div>
            <div className='char'>
                {chars.map((char, idx) => <Output key={idx} char={char} />)}
            </div>
        </div>
    )
}

export default Board;