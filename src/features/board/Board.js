import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearBoard,
    saveWords,
    selectBoard,
    selectChar,
    selectCurrent,
    selectDisabled
} from '../board/boardSlice';
import Output from '../output/Output';
import Scorecard from '../scorecard/Scorecard';
import Square from '../square/Square';
import './Board.scss';


let disabled, selected;

function Board() {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

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

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            dispatch(saveWords());
            dispatch(clearBoard());
        }
    }

    return (
        <div className='board-wrap'>
            <div className='output'>
                {chars.map((char, idx) => <Output key={idx} char={char} />)}
            </div>
            <div className='board'>
                {tiles.map((tile, idx) => {
                    if (active.length > 0) {
                        // add disabled class to any squares not within reach of selected item
                        disabled = active.includes(idx) ? false : true;
                        selected = current.includes(idx) ? true : false;
                    } else {
                        disabled = false;
                        selected = false;
                    }
                    return (
                        <Square key={idx} tile={tile} id={idx} disabled={disabled} selected={selected} />
                    )
                })}

            </div>
            <div className="time" style={{ color: '#fff' }}>
                {
                    isActive && seconds === 60 ? setIsActive(false) : seconds

                }
            </div>

            {!isActive && <Scorecard />}
        </div>
    )
}

export default Board;