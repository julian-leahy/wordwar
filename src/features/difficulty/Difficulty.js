import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { difficulty, isNewGame } from '../board/boardSlice';
import CustomButton from '../buttons/CustomButton';
import Rules from '../rules/Rules';
import './Difficulty.scss';

function Difficulty() {

    const dispatch = useDispatch();
    const [showRules, setShowRules] = useState(false);
    const nodeRef = React.createRef(null);

    const setDifficulty = (level) => {
        dispatch(difficulty(level));
        dispatch(isNewGame(false));
    }

    const toggleRules = () => {
        setShowRules(!showRules);
    }

    return (
        <div className='difficulty'>
            <div className='difficulty-wrap'>
                <div className='difficulty-inner'>
                    <div className='title'>Word War</div>
                    <div className='btn-group'>
                        <CustomButton level='easy' set={setDifficulty} />
                        <CustomButton level='hard' set={setDifficulty} />
                        <CustomButton level='expert' set={setDifficulty} />
                    </div>

                    <button aria-label='open rules' onClick={toggleRules} className='btn-help show-rules'>Rules</button>
                </div>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={showRules}
                    timeout={300}
                    unmountOnExit
                    classNames={'loaded'}
                >

                    <div ref={nodeRef}>
                        <Rules close={toggleRules} />
                    </div>

                </CSSTransition>
            </div>



        </div>
    )
}

export default Difficulty;