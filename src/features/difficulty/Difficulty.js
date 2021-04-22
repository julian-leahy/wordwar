import React from 'react';
import { useDispatch } from 'react-redux';
import { difficulty, AIWords } from '../board/boardSlice';

function Difficulty() {

    const dispatch = useDispatch();

    const setDifficulty = (level) => {
        dispatch(difficulty(level));
        dispatch(AIWords());
    }

    return (
        <div>
            <button onClick={() => setDifficulty('easy')}>Easy</button>
            <button onClick={() => setDifficulty('hard')}>Hard</button>
            <button onClick={() => setDifficulty('expert')}>Expert</button>
        </div>
    )
}

export default Difficulty;