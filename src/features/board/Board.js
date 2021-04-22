import React from 'react';
import './Board.scss'
import { useSelector } from 'react-redux';
import Square from '../square/Square';
import { selectBoard } from '../board/boardSlice';

function Board() {

    const tiles = useSelector(selectBoard)

    return (
        <div className='board-wrap'>
            <div className='board'>
                {tiles.map((tile, idx) => <Square key={idx} tile={tile} />)}
            </div>
        </div>
    )
}

export default Board;