import { configureStore } from '@reduxjs/toolkit';
import graphSlice from './graphSlice';

export const store = configureStore({
  reducer: {
    graph: graphSlice,
  },
});
