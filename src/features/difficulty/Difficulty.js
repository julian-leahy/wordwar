import React from 'react';
import './Difficulty.scss';
import { useDispatch } from 'react-redux';
import { findWords, difficulty, AIWords, isNewGame } from '../board/boardSlice';

function Difficulty() {

    const dispatch = useDispatch();

    const setDifficulty = (level) => {
        dispatch(findWords());
        dispatch(difficulty(level));
        dispatch(AIWords());
        dispatch(isNewGame(false))
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
            </div>
        </div>
    )
}

export default Difficulty;