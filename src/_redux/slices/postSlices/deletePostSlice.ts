import { baseState as initialState } from './initialState';
import { deleteApiJWT } from '@/api/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 특정 포스트 상세보기
export const deletePost = createAsyncThunk(
  'deletePost',
  async (postId: string) => {
    const response = await deleteApiJWT(`/posts/delete`, { id: postId });
    return response.data;
  },
);

export const deletePostSlice = createSlice({
  name: 'deletePostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
