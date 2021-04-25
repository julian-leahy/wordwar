import boardReducer, {
    incrementRound,
    addChar,
    isActive,
    resetIsActive,
    isCurrent,
    allWords,
    difficulty,
    saveWords,
    calcScore
} from './boardSlice';

describe('board reducer', () => {
    const initialState = {
        rounds: 1,
        chars: ['p', 'i'],
        disabled: [4, 6],
        current: [2, 3],
        wordList: [],
        allWords: [],
        difficulty: 'easy',

    }
    it('should handle increment', () => {
        const actual = boardReducer(initialState, incrementRound());
        expect(actual.rounds).toEqual(2);
    });
    it('should handle adding characters', () => {
        const actual = boardReducer(initialState, addChar('g'));
        expect(actual.chars).toEqual(['p', 'i', 'g']);
    });
    it('should handle disabled squares', () => {
        const actual = boardReducer(initialState, isActive(1));
        expect(actual.disabled).toEqual([4, 6, 1]);
    });
    it('should handle reset disabled array', () => {
        const actual = boardReducer(initialState, resetIsActive());
        expect(actual.disabled).toEqual([]);
    });
    it('should handle tracking current item', () => {
        const actual = boardReducer(initialState, isCurrent(1));
        expect(actual.current).toEqual([2, 3, 1]);
    });
    it('should handle add all words', () => {
        const actual = boardReducer(initialState, allWords(['cat', 'horse']));
        expect(actual.allWords).toEqual(['cat', 'horse']);
    });
    it('should handle setting difficulty', () => {
        const actual = boardReducer(initialState, difficulty('hard'));
        expect(actual.difficulty).toEqual('hard');
    });
    it('should handle not saving words less than 3 chars', () => {
        const actual = boardReducer(initialState, saveWords());
        expect(actual.wordList).toEqual([]);
    });

});



