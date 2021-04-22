import { createSlice } from "@reduxjs/toolkit";
import { shuffledTiles } from './../../app/letters';

const initialState = {
    tiles: shuffledTiles,
    chars: []
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state) => {
            state.tiles = state
        },
        // add selected character to array
        addChar: (state, action) => {
            state.chars.push(action.payload)
        }

    }
})

export const { setBoard, addChar } = boardSlice.actions;

export const selectBoard = (state) => state.board.tiles;
export const selectChar = (state) => state.board.chars;

export default boardSlice.reducer;