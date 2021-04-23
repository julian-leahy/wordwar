import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, compareWordList, saveWords, selectAIWords, selectBoard, selectChar, selectCurrent, selectDisabled, selectDuplicated, selectNotInDictionary, selectWordList, selectAllWords } from '../board/boardSlice';
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

            {
                showScore && (
                    <div className='scorecard'>
                        <div className='scorecard__inner'>
                            <Words list={AIWords} title='A.I' />
                            <Words list={allWords} title='All Words' />
                            <Words list={allWords} title='Your Words' />
                            <Words list={allWords} title='Duplicates' />
                            <Words list={allWords} title='Bad Words' />
                        </div>
                    </div>
                )
            }


            {/* <button onClick={() => dispatch(compareWordList())}>CALC</button>

            <div className='wordlist' style={{ marginTop: '20px' }}>
                <h3>USER Words</h3>
                {wordList.map((char, idx) => <p key={idx}>{char}</p>)}
            </div>

            <div className='wordlist' style={{ marginTop: '20px' }}>
                <h3>AI Words</h3>
                {AIWords.map((char, idx) => <p key={idx}>{char}</p>)}
            </div>

            <div className='wordlist' style={{ marginTop: '20px' }}>
                <h3>Duplicated Words</h3>
                {duplicates.map((char, idx) => <p key={idx}>{char}</p>)}
            </div>

            <div className='wordlist' style={{ marginTop: '20px' }}>
                <h3>Bad Words</h3>
                {badWords.map((char, idx) => <p key={idx}>{char}</p>)}
            </div> */}

        </div>
    )
}

export default Board;