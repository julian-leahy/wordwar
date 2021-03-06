import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AIWords,
    clearAll, clearBoard,
    findWords, generateBoard,
    incrementRound,
    resetAll, saveWords,
    selectBoard,
    selectChar,
    selectCurrent,
    selectDisabled,
    selectRound
} from '../board/boardSlice';
import Output from '../output/Output';
import Scorecard from '../scorecard/Scorecard';
import Square from '../square/Square';
import './Board.scss';


let disabled, selected;

function Board({ roundTime }) {

    const [seconds, setSeconds] = useState(roundTime);
    const [isActive, setIsActive] = useState(true);
    const [timerWarning, setTimerWarning] = useState('#9acd32');

    const dispatch = useDispatch();

    const tiles = useSelector(selectBoard);
    const chars = useSelector(selectChar);
    const active = useSelector(selectDisabled);
    const current = useSelector(selectCurrent);
    const currentRound = useSelector(selectRound);


    // only run once!
    useEffect(() => {
        document.addEventListener('keydown', handleEnter);
        dispatch(generateBoard());
        dispatch(findWords());
        dispatch(AIWords());
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        let interval = null;
        if (isActive) {
            seconds <= 5 ? setTimerWarning('red') : setTimerWarning('#9acd32');
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, seconds]);


    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            dispatch(saveWords());
            dispatch(clearBoard());
        }
    }

    // reset round
    const reset = () => {
        if (currentRound === 3) {
            dispatch(resetAll());
        } else {
            dispatch(clearAll());
            dispatch(generateBoard());
            dispatch(findWords());
            dispatch(AIWords());
            dispatch(incrementRound());
            setSeconds(roundTime);
            setIsActive(true);
        }

    }

    return (
        <div className='board'>
            <div className='board__output'>
                {chars.map((char, idx) => <Output key={idx} char={char} />)}
            </div>
            <div className='progress-mobile'>
                <div className='progress-mobile__inner' style={{ width: (seconds / roundTime * 100) + '%' }}></div>
            </div>
            <div className='board__grid'>
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
                <div className='timer__inner' style={{ color: timerWarning }}>
                    {isActive && seconds === 0 ? setIsActive(false) : seconds}
                </div>
            </div>

            {!isActive && <Scorecard round={reset} />}
        </div>
    )
}

export default Board;