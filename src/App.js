import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Board from './features/board/Board';
import { selectGame } from './features/board/boardSlice';
import Difficulty from './features/difficulty/Difficulty';
import { CSSTransition } from 'react-transition-group';

function App() {
  const gameState = useSelector(selectGame);
  const nodeRef = React.createRef(null);
  return (
    <div className="App">
      {
        gameState && <Difficulty />
      }
      <CSSTransition
        nodeRef={nodeRef}
        in={!gameState}
        timeout={300}
        unmountOnExit
        classNames={'show'}
      >

        <div ref={nodeRef}>
          <Board roundTime={180} />
        </div>

      </CSSTransition>
    </div>
  )
}


export default App;
