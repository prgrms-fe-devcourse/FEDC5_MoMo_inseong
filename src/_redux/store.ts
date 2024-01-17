import allUsersSlice from './slices/allUsersSlice';
import channelsSlice from './slices/channelsSlice';
import heartsSlice from './slices/heartsSlice';
import loginSlice from './slices/loginSlice';
import { postSlice } from './slices/postSlices/getPostSlice';
import { putPostSlice } from './slices/postSlices/putPostSlice';
import timeTableSlice from './slices/timeTableSlice';
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
  getPostDetail: postSlice,
  putPost: putPostSlice,
  today: todaySlice,
  allUsers: allUsersSlice,
  userInfo: userInfoSlice,
  cells: timeTableSlice,
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
