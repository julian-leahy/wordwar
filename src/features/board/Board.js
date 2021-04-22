import React, { useEffect } from 'react';
import './Board.scss'
import { useDispatch, useSelector } from 'react-redux';
import Square from '../square/Square';
import { selectBoard, selectChar, selectDisabled, selectCurrent, clearBoard, saveWords } from '../board/boardSlice';
import Output from '../output/Output';

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