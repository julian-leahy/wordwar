import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Board from './features/board/Board';
import { selectGame } from './features/board/boardSlice';
import Difficulty from './features/difficulty/Difficulty';

function App() {
  const gameState = useSelector(selectGame)
  return (
    <div className="App">
      {
        !gameState ? <Board roundTime={3} /> : <Difficulty />
      }
    </div>
  )
}


export default App;
