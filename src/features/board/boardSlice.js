import { createSlice } from "@reduxjs/toolkit";
import AIGenerateWords from "../../app/AIGenerateWords";
import getAvailableWords from './../../app/findAllWords';
import { shuffledTiles } from './../../app/letters';

const initialState = {
    tiles: shuffledTiles,
    chars: [],
    disabled: [],
    current: [],
    wordList: [], // players words
    allWords: [],
    difficulty: 'easy',
    AI: [] // 🤖 words
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
        },
        allWords: (state, action) => {
            state.allWords = action.payload
        },
        // impacts the percentage of words found by AI
        difficulty: (state, action) => {
            state.difficulty = action.payload
        },
        // words `found` by AI 🦾
        aiWords: (state, action) => {
            state.AI = action.payload
        }

    }
})

export const { setBoard, addChar, isActive, resetIsActive, isCurrent, clearBoard, saveWords, allWords, aiWords, difficulty } = boardSlice.actions;

export const selectBoard = (state) => state.board.tiles;
export const selectChar = (state) => state.board.chars;
export const selectDisabled = (state) => state.board.disabled;
export const selectCurrent = (state) => state.board.current;
export const selectWordList = (state) => state.board.wordList;
export const selectAllWords = (state) => state.board.allWords;
export const selectDifficulty = (state) => state.board.difficulty;
export const selectAIWords = (state) => state.board.AI;

// finds all available words from current board state
export const findWords = () => (dispatch, getState) => {
    const currentValue = selectBoard(getState());
    const words = getAvailableWords(currentValue);
    dispatch(allWords(words))
};

// 🤖 will find a percentage of random words from possible selection based on difficulty level
export const AIWords = () => (dispatch, getState) => {
    const currentValue = selectAllWords(getState());
    const level = selectDifficulty(getState());
    let percent;
    switch (level) {
        case 'easy':
            percent = 0.2;
            break;
        case 'hard':
            percent = 0.5;
            break;
        default:
            percent = 0.7;
            break;
    }
    const numberWordsToSelect = Math.floor(percent * currentValue.length);
    const AI = AIGenerateWords(currentValue, numberWordsToSelect);
    dispatch(aiWords(AI))
};



export default boardSlice.reducer;