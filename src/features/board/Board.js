import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, findWords, saveWords, selectBoard, selectChar, selectCurrent, selectDisabled } from '../board/boardSlice';
import Difficulty from '../difficulty/Difficulty';
import Output from '../output/Output';
import Square from '../square/Square';
import './Board.scss';

let disabled, selected;

function Board() {

    const dispatch = useDispatch();
    const tiles = useSelector(selectBoard);
    const chars = useSelector(selectChar);
    const active = useSelector(selectDisabled);
    const current = useSelector(selectCurrent);

    // only run once!
    useEffect(() => {
        document.addEventListener('keydown', handleEnter);
        dispatch(findWords());
        // eslint-disable-next-line 
    }, [])

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            dispatch(saveWords());
            dispatch(clearBoard());
        }
    }

    return (
        <div className='board-wrap'>
            <Difficulty />
            <div className='board'>
                {tiles.map((tile, idx) => {
                    if (active.length > 0) {
                        // add disabled class to any squares not within reach of selected item
                        disabled = active.includes(idx) ? false : true;
                        selected = current.includes(idx) ? true : false;
                    } else {
                        disabled = false;
                    }
                    return (
                        <Square key={idx} tile={tile} id={idx} disabled={disabled} selected={selected} />
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