import { getPostsInitialState as initialState } from './initialState';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IgetAuthorPostParams {
  authorId: string;
  offset?: number;
  limit?: number;
}

// 사용자 포스트 목록
export const getAuthorPost = createAsyncThunk(
  'getAuthorPost',
  async ({ authorId, offset = 0, limit = 10 }: IgetAuthorPostParams) => {
    const response = await getApi<IPost[]>(
      `/posts/author/${authorId}?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  },
);

export const getAuthorPostSlice = createSlice({
  name: 'getAuthorPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthorPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAuthorPost.fulfilled,
      (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      },
    );
    builder.addCase(getAuthorPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
