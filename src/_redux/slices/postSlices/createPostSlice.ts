import { createPostInitialState as initialState } from './initialState';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { postApiJWT } from '@/api/apis';
import { createFormData } from '@/utils/createFormData';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IcreatePostBody {
  title: string | IPostTitleCustom;
  image: File | 'null';
  channelId: string;
}

// 포스트 생성
export const createPost = createAsyncThunk(
  'createPost',
  async (body: IcreatePostBody) => {
    if (body == null) throw new Error('잘못된 입력값입니다.');

    const response = await postApiJWT<IPost>(
      '/posts/create',
      createFormData(body),
    );

    return response.data;
  },
);

export const createPostSlice = createSlice({
  name: 'createPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.post = action.payload;
      },
    );
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
