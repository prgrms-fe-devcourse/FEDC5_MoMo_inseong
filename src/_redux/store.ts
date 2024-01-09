import channelsSlice from './slices/channelsSlice';
import heartsSlice from './slices/heartsSlice';
import loginSlice from './slices/loginSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    channels: channelsSlice,
    auth: loginSlice,
    hearts: heartsSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
