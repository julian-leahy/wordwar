import React, { useEffect } from 'react';
import './Scorecard.scss';
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
    calcScore,
    selectRound
} from '../board/boardSlice';

import Words from '../words/Words';

function Scorecard({ round }) {

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
    const AIScore = useSelector(selectAIScore);
    const rounds = useSelector(selectRound);

    const displayWinner = () => {
        if (userScore > AIScore) {
            return 'Player Wins!'
        } else if (AIScore > userScore) {
            return 'A.I Wins!'
        } else {
            return 'The game was a draw!'
        }
    }


    return (
        <div className='scorecard'>
            <div className='current-round'>{rounds === 3 ? <span className='over'>Game Over. <span className='winner'>{displayWinner()}</span></span> : <span className='round-text'>{`Round ${rounds}`}</span>}</div>
            <div className='scorecard__inner'>
                <div className='scorecard__inner-score'>
                    <div className='players-scores'>
                        <div className='user score'>Players Score: <span className='pts'>{userScore} pts.</span></div>
                        <div className='AI score'>A.I Score: <span className='pts'>{AIScore} pts.</span></div>
                    </div>
                    <div className='action'>
                        <div className='round score' onClick={round}>{rounds === 3 ? 'New Game' : 'Next Round'}</div>
                    </div>
                </div>
                <div className='scorecard__inner-words'>
                    <Words list={wordList} title='Your Words' />
                    <Words list={AIWords} title='A.I' />
                    <Words list={allWords} title='All Words' />
                    <Words list={duplicates} title='Duplicates' />
                    <Words list={badWords} title='Bad Words' />
                </div>
            </div>
        </div>
    )
}

export default Scorecard;