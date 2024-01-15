import { getPostsInitialState as initialState } from './initialState';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IgetChannelPostsParams {
  channelId: string;
  offset?: number;
  limit?: number;
}

export const getChannelPosts = createAsyncThunk(
  'getChannelPosts',
  async ({ channelId, offset = 0, limit = 10 }: IgetChannelPostsParams) => {
    const response = await getApi<IPost[]>(
      `/posts/channel/${channelId}?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  },
);

export const getChannelPostsSlice = createSlice({
  name: 'getChannelPostsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getChannelPosts.fulfilled,
      (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      },
    );
    builder.addCase(getChannelPosts.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
