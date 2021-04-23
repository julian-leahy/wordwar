import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearBoard,
    compareWordList,
    saveWords,
    selectAIWords,
    selectAllWords,
    selectBoard,
    selectChar,
    selectCurrent,
    selectDisabled,
    selectDuplicated,
    selectNotInDictionary,
    selectWordList
} from '../board/boardSlice';
import Output from '../output/Output';
import Square from '../square/Square';
import Words from '../words/Words';
import './Board.scss';

let disabled, selected;

function Board() {

    const [showScore, setShowScore] = useState(false)

    const dispatch = useDispatch();
    const tiles = useSelector(selectBoard);
    const chars = useSelector(selectChar);
    const allWords = useSelector(selectAllWords);
    const active = useSelector(selectDisabled);
    const current = useSelector(selectCurrent);
    const wordList = useSelector(selectWordList);
    const AIWords = useSelector(selectAIWords);
    const duplicates = useSelector(selectDuplicated);
    const badWords = useSelector(selectNotInDictionary);

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

    const showScoreCard = () => {
        dispatch(compareWordList());
        setShowScore(true);
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
            <button onClick={showScoreCard}>SCORE</button>

            {
                showScore && (
                    <div className='scorecard'>
                        <div className='scorecard__inner'>
                            <Words list={AIWords} title='A.I' />
                            <Words list={allWords} title='All Words' />
                            <Words list={wordList} title='Your Words' />
                            <Words list={duplicates} title='Duplicates' />
                            <Words list={badWords} title='Bad Words' />
                        </div>
                        <button onClick={() => setShowScore(false)}>GAME</button>
                    </div>
                )
            }
        </div>
    )
}

export default Board;