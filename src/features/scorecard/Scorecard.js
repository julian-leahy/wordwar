import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAIWords,
    selectAllWords,
    selectDuplicated,
    selectNotInDictionary,
    selectWordList,
    compareWordList
} from '../board/boardSlice';

import Words from '../words/Words';

function Scorecard() {

    const dispatch = useDispatch();
    // dispatch(compareWordList());

    // only run once!
    useEffect(() => {
        dispatch(compareWordList());
        // eslint-disable-next-line 
    }, [])

    const allWords = useSelector(selectAllWords);
    const wordList = useSelector(selectWordList);
    const AIWords = useSelector(selectAIWords);
    const duplicates = useSelector(selectDuplicated);
    const badWords = useSelector(selectNotInDictionary);

    return (
        <div className='scorecard'>
            <div className='scorecard__inner'>
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