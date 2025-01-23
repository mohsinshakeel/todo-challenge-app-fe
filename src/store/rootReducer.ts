import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
