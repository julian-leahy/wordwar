import React, { useState } from 'react';
import './Difficulty.scss';
import { useDispatch } from 'react-redux';
import { findWords, difficulty, AIWords, isNewGame } from '../board/boardSlice';
import Rules from '../rules/Rules';

function Difficulty() {

    const dispatch = useDispatch();
    const [showRules, setShowRules] = useState(false)

    const setDifficulty = (level) => {
        dispatch(findWords());
        dispatch(difficulty(level));
        dispatch(AIWords());
        dispatch(isNewGame(false))
    }

    const toggleRules = () => {
        setShowRules(!showRules)
    }

    return (
        <div className='difficulty'>
            <div className='difficulty-inner'>
                <div className='title'> Word War</div>
                <div className='btn-group'>
                    <button className="button" aria-label="Level Easy" onClick={() => setDifficulty('easy')}>
                        Easy
	                    <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </button>
                    <button className="button" aria-label="Level Hard" onClick={() => setDifficulty('hard')}>
                        Hard
	                    <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </button>
                    <button className="button" aria-label="Level Expert" onClick={() => setDifficulty('expert')}>
                        Expert
	                    <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </button>
                </div>
                <button aria-label='open rules' onClick={toggleRules} className='btn-help show-rules'>Rules</button>
                {showRules && <Rules close={toggleRules} />}
            </div>

        </div>
    )
}

export default Difficulty;