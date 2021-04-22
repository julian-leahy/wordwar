import { createSlice } from "@reduxjs/toolkit";
import { shuffledTiles } from './../../app/letters';

const initialState = {
    tiles: shuffledTiles
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state) => {
            state.tiles = state
        }
    }
})

export const { setBoard } = boardSlice.actions;

export const selectBoard = (state) => state.board.tiles;

export default boardSlice.reducer;