import React from 'react';
import { useDispatch } from 'react-redux';
import { findWords, difficulty, AIWords } from '../board/boardSlice';

function Difficulty({ toggle }) {

    const dispatch = useDispatch();

    const setDifficulty = (level) => {
        dispatch(findWords());
        dispatch(difficulty(level));
        dispatch(AIWords());
        toggle();

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