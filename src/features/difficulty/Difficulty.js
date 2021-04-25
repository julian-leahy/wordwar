import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AIWords, difficulty, findWords, isNewGame } from '../board/boardSlice';
import CustomButton from '../buttons/CustomButton';
import Rules from '../rules/Rules';
import './Difficulty.scss';

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
                <div className='title'>Word War</div>
                <div className='btn-group'>
                    <CustomButton level='easy' set={setDifficulty} />
                    <CustomButton level='hard' set={setDifficulty} />
                    <CustomButton level='expert' set={setDifficulty} />
                </div>
                <button aria-label='open rules' onClick={toggleRules} className='btn-help show-rules'>Rules</button>
                {showRules && <Rules close={toggleRules} />}
            </div>

        </div>
    )
}

export default Difficulty;