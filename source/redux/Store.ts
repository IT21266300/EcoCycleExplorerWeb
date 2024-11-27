import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import userReducer from './UserReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
