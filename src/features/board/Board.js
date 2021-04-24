import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearBoard,
    generateBoard,
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
let time = 600;

function Board() {

    const [seconds, setSeconds] = useState(time);
    const [isActive, setIsActive] = useState(true);
    const [timerWarning, setTimerWarning] = useState('#9acd32')

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
            if (seconds <= 5) setTimerWarning('red');
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
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
            <button onClick={() => dispatch(generateBoard())}>FOO</button>
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
            <div className="timer">
                <div className='timer__inner' style={{
                    color: timerWarning
                }}>
                    {isActive && seconds === 0 ? setIsActive(false) : seconds}
                </div>
            </div>


            {!isActive && <Scorecard />}
        </div>
    )
}

export default Board;