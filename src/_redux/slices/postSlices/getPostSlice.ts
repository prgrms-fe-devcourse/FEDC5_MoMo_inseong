import { getPostInitialState as initialState } from './initialState';
import {
  IComment,
  IPost,
  IPostTitleCustom,
  IVote,
} from '@/api/_types/apiModels';
import { deleteApiJWT, getApi, postApiJWT } from '@/api/apis';
import { parseTitle } from '@/utils/parseTitle';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IpostCommentParams {
  comment: string;
  postId: string;
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
  async ({ comment, postId }: IpostCommentParams) => {
    const response = await postApiJWT<IComment>('/comments/create', {
      comment,
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

//TODO: postSlice로 개명 예정
const getPostDetailSlice = createSlice({
  name: 'getPostDetailSlice',
  initialState,
  reducers: {
    modifyVoteState: (state, action: PayloadAction<IVote>) => {
      if (state.post != null) {
        const modifiedPostTitle: IPostTitleCustom = {
          ...parseTitle(state.post.title),
          vote: action.payload,
        };
        state.post = {
          ...state.post,
          title: JSON.stringify(modifiedPostTitle),
        };
      }
    },
  },
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
            (comment) => (comment as IComment)._id !== action.payload._id,
          ) as IComment[];
          state.post = { ...state.post, comments };
        }
      },
    );
    builder.addCase(deleteComment.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { modifyVoteState } = getPostDetailSlice.actions;

export const postSlice = getPostDetailSlice.reducer;
