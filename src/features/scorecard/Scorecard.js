import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAIWords,
    selectAllWords,
    selectDuplicated,
    selectNotInDictionary,
    selectWordList,
    compareWordList,
    selectUserScore,
    selectAIScore,
    calcScore
} from '../board/boardSlice';

import Words from '../words/Words';

function Scorecard() {

    const dispatch = useDispatch();
    // dispatch(compareWordList());

    // only run once!
    useEffect(() => {
        dispatch(compareWordList());
        dispatch(calcScore());
        // eslint-disable-next-line 
    }, [])

    const allWords = useSelector(selectAllWords);
    const wordList = useSelector(selectWordList);
    const AIWords = useSelector(selectAIWords);
    const duplicates = useSelector(selectDuplicated);
    const badWords = useSelector(selectNotInDictionary);
    const userScore = useSelector(selectUserScore);
    const AIScore = useSelector(selectAIScore)

    return (
        <div className='scorecard'>
            <div className='scorecard__inner'>
                <p>SCORE: {userScore} || {AIScore}</p>
                <Words list={AIWords} title='A.I' />
                <Words list={allWords} title='All Words' />
                <Words list={wordList} title='Your Words' />
                <Words list={duplicates} title='Duplicates' />
                <Words list={badWords} title='Bad Words' />
            </div>
        </div>
    )
}

export default Scorecard;