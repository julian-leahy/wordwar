import React from 'react';
import './Rules.scss';

function Rules({ close }) {
    return (
        <div className='rules'>
            <div className='rules__inner'>
                <p>Create words from the randomly assorted letters in the grid. The longer the word, the higher the point value of the word (press Enter to submit word).</p>
                <p>A game consist of three rounds each lasting three minutes.</p>
                <p>
                    <table className='score-tables'>
                        <tr>
                            <th>No. of Letters</th>
                            <th>Points per Word</th>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>8+</td>
                            <td>11</td>
                        </tr>
                    </table>
                </p>
            </div>
            <button aria-label='close' onClick={close} className='btn-help close'>X</button>
        </div>
    )
}

export default Rules;