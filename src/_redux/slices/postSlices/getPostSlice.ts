import { getPostInitialState as initialState } from './initialState';
import { IComment, IPost } from '@/api/_types/apiModels';
import { deleteApiJWT, getApi, postApiJWT } from '@/api/apis';
import { createNotification } from '@/api/createNotification';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IpostCommentParams {
  comment: string;
  postId: string;
  postAuthorId: string;
}

// 특정 포스트 상세보기
export const getPostDetail = createAsyncThunk(
  'getPostDetail',
  async (postId: string) => {
    const response = await getApi<IPost>(`/posts/${postId}`);
    return response.data;
  },
);

export const postComment = createAsyncThunk(
  'postComment',
  async ({ comment, postId, postAuthorId }: IpostCommentParams) => {
    const response = await postApiJWT<IComment>('/comments/create', {
      comment,
      postId,
    });
    // 댓글 알림 생성
    void createNotification({
      notificationType: 'COMMENT',
      notificationTypeId: response.data._id,
      userId: postAuthorId,
      postId,
    });
    return response.data;
  },
);

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async (id: string) => {
    const response = await deleteApiJWT<IComment>('/comments/delete', { id });
    return response.data;
  },
);

export const getPostDetailSlice = createSlice({
  name: 'getPostDetailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ### getPostDetail ###
    builder.addCase(getPostDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPostDetail.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.post = action.payload;
      },
    );
    builder.addCase(getPostDetail.rejected, (state) => {
      state.isLoading = false;
    });
    // ### postComment ###
    builder.addCase(postComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      postComment.fulfilled,
      (state, action: PayloadAction<IComment>) => {
        state.isLoading = false;
        if (state.post) {
          const comments = [
            ...(state.post.comments as IComment[]),
            action.payload,
          ];
          state.post = { ...state.post, comments };
        }
      },
    );
    builder.addCase(postComment.rejected, (state) => {
      state.isLoading = false;
    });
    // ### deleteComment ###
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<IComment>) => {
        state.isLoading = false;

        // console.log(action.payload._id);

        if (state.post && state.post.comments) {
          const comments = state.post.comments.filter(
            (comment) => comment._id !== action.payload._id,
          );
          state.post = { ...state.post, comments };
        }
      },
    );
    builder.addCase(deleteComment.rejected, (state) => {
      state.isLoading = false;
    });
  },
}).reducer;
