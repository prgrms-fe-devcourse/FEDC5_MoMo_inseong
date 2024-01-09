import channelsSlice from './slices/channelsSlice';
import heartsSlice from './slices/heartsSlice';
import loginSlice from './slices/loginSlice';
import { configureStore } from '@reduxjs/toolkit';

const stores = configureStore({
  reducer: {
    channels: channelsSlice,
    auth: loginSlice,
    hearts: heartsSlice,
  },
});

export type RootStateType = ReturnType<typeof stores.getState>;
export type AppDispatchType = typeof stores.dispatch;
