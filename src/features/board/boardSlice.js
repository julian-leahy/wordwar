import { createSlice } from "@reduxjs/toolkit";
import { shuffledTiles } from './../../app/letters';

const initialState = {
    tiles: shuffledTiles,
    chars: [],
    disabled: [],
    current: [],
    wordList: []
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
        // clear items for every new selection
        resetIsActive: (state) => {
            state.disabled = []
        },
        // track all selected items
        isCurrent: (state, action) => {
            state.current.push(action.payload);
        },
        // transfer selected letter and save as complete word
        saveWords: (state) => {
            const word = state.chars.join('');
            if (word.length > 2) {
                state.wordList.push(word)
            }
        },
        // reset board after word is selected
        clearBoard: (state) => {
            state.current = [];
            state.chars = [];
            state.disabled = [];
        }

    }
})

export const { setBoard, addChar, isActive, resetIsActive, isCurrent, clearBoard, saveWords } = boardSlice.actions;

export const selectBoard = (state) => state.board.tiles;
export const selectChar = (state) => state.board.chars;
export const selectDisabled = (state) => state.board.disabled;
export const selectCurrent = (state) => state.board.current;
export const selectWordList = (state) => state.board.wordList;

export default boardSlice.reducer;