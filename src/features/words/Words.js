import React from 'react';
import './Words.scss'

function Words({ list, title }) {
    return (
        <div className='word-list'>
            <h3 className='word-list__title'>{title}</h3>
            {
                list.map((word, idx) => <span key={idx}> {word} </span>)
            }
        </div>
    )
}

export default Words;