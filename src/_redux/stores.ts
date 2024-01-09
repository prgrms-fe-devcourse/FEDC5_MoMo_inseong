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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;
