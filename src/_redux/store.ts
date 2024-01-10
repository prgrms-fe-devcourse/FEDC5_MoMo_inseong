import channelsSlice from './slices/channelsSlice';
import heartsSlice from './slices/heartsSlice';
import loginSlice from './slices/loginSlice';
import { createPostSlice } from './slices/postSlices/createPostSlice';
import { deletePostSlice } from './slices/postSlices/deletePostSlice';
import { getAuthorPostSlice } from './slices/postSlices/getAuthorPostSlice';
import { getChannelPostsSlice } from './slices/postSlices/getChannelPostSlice';
import { getPostDetailSlice } from './slices/postSlices/getPostSlice';
import { putPostSlice } from './slices/postSlices/putPostSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    channels: channelsSlice,
    auth: loginSlice,
    hearts: heartsSlice,
    createPost: createPostSlice,
    deletePost: deletePostSlice,
    getAuthorPost: getAuthorPostSlice,
    getChannelPost: getChannelPostsSlice,
    getPostDetail: getPostDetailSlice,
    putPost: putPostSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
