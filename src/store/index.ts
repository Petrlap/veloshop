import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalogSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;