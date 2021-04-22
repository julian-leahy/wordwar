import React from 'react';
import './Square.scss';

function Square({ tile }) {

    return (
        <div className='square'>
            {tile}
        </div>
    )
}

export default Square;