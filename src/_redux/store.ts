import allUsersSlice from './slices/allUsersSlice';
import channelsSlice from './slices/channelsSlice';
import heartsSlice from './slices/heartsSlice';
import loginSlice from './slices/loginSlice';
import { createPostSlice } from './slices/postSlices/createPostSlice';
import { deletePostSlice } from './slices/postSlices/deletePostSlice';
import { getAuthorPostSlice } from './slices/postSlices/getAuthorPostSlice';
import { getChannelPostsSlice } from './slices/postSlices/getChannelPostSlice';
import { postSlice } from './slices/postSlices/getPostSlice';
import { putPostSlice } from './slices/postSlices/putPostSlice';
import todaySlice from './slices/todaySlice';
import userInfoSlice from './slices/userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  channels: channelsSlice,
  auth: loginSlice,
  hearts: heartsSlice,
  createPost: createPostSlice,
  deletePost: deletePostSlice,
  getAuthorPost: getAuthorPostSlice,
  getChannelPost: getChannelPostsSlice,
  getPostDetail: postSlice,
  putPost: putPostSlice,
  today: todaySlice,
  allUsers: allUsersSlice,
  userInfo: userInfoSlice,
});
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
