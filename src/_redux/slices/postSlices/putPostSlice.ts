import { putPostInitialState as initialState } from './initialState';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { putApiJWT } from '@/api/apis';
import { createFormData } from '@/utils/createFormData';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IputPostBody {
  title: string | IPostTitleCustom;
  postId: string;
  image: File | null;
  imageToDeletePublicId?: string;
  channelId: string;
}

// 포스트 수정
export const putPost = createAsyncThunk(
  'putPost',
  async (body: IputPostBody) => {
    const response = await putApiJWT<IPost, FormData>(
      `/posts/update`,
      createFormData(body),
    );
    return response.data;
  },
);

export const putPostSlice = createSlice({
  name: 'putPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(putPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      putPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.post = action.payload;
      },
    );
    builder.addCase(putPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
