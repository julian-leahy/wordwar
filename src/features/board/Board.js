import React from 'react';
import './Board.scss'
import { useSelector } from 'react-redux';
import Square from '../square/Square';
import { selectBoard, selectChar } from '../board/boardSlice';
import Output from '../output/Output';

function Board() {

    const tiles = useSelector(selectBoard);
    const chars = useSelector(selectChar);

    return (
        <div className='board-wrap'>
            <div className='board'>
                {tiles.map((tile, idx) => <Square key={idx} tile={tile} />)}
            </div>
            <div className='char'>

                {chars.map((char, idx) => <Output key={idx} char={char} />)}
            </div>
        </div>
    )
}

export default Board;