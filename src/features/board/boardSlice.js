import { createSlice } from "@reduxjs/toolkit";
import { shuffledTiles } from './../../app/letters';

const initialState = {
    tiles: shuffledTiles,
    chars: [],
    disabled: []
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
            state.chars.push(action.payload);
        },
        // array of possible squares within reach of selected item
        isActive: (state, action) => {
            state.disabled.push(action.payload);
        },
        resetIsActive: (state) => {
            state.disabled = []
        }

    }
})

export const { setBoard, addChar, isActive, resetIsActive } = boardSlice.actions;

export const selectBoard = (state) => state.board.tiles;
export const selectChar = (state) => state.board.chars;
export const selectDisabled = (state) => state.board.disabled;

export default boardSlice.reducer;