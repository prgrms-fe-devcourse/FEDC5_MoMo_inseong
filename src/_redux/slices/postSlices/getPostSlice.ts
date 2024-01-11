import { getPostInitialState as initialState } from './initialState';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 특정 포스트 상세보기
export const getPostDetail = createAsyncThunk(
  'getPostDetail',
  async (postId: string) => {
    const response = await getApi<IPost>(`/posts/${postId}`);
    return response.data;
  },
);

export const getPostDetailSlice = createSlice({
  name: 'getPostDetailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPostDetail.fulfilled,
      (state, aciton: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.post = aciton.payload;
      },
    );
    builder.addCase(getPostDetail.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
