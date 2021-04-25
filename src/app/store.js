import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

const combinedReducer = combineReducers({
  board: boardReducer
});

// reset initial state for new game
const rootReducer = (state, action) => {
  if (action.type === 'board/resetAll') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()]
});



