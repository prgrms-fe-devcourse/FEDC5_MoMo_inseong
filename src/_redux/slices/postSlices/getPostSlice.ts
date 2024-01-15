import { getPostInitialState as initialState } from './initialState';
import {
  IComment,
  IMessage,
  IPost,
  IPostTitleCustom,
  IVote,
} from '@/api/_types/apiModels';
import { deleteApiJWT, getApi, postApiJWT, putApiJWT } from '@/api/apis';
import { createNotification } from '@/api/createNotification';
import { createFormData } from '@/utils/createFormData';
import { parseTitle } from '@/utils/parseTitle';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IpostCommentParams {
  comment: string;
  postId: string;
  postAuthorId: string;
}

interface IputPostBody {
  title: string | IPostTitleCustom;
  postId: string;
  image: File | null;
  imageToDeletePublicId?: string;
  channelId: string;
}

interface IcreatePostBody {
  title: string | IPostTitleCustom;
  image: File | 'null';
  channelId: string;
}

export const createPost = createAsyncThunk(
  'createPost',
  async (body: IcreatePostBody) => {
    if (body == null) throw new Error('잘못된 입력값입니다.');

    const response = await postApiJWT<IPost>(
      '/posts/create',
      createFormData(body),
    );

    const { mentions } =
      typeof body.title === 'string' ? parseTitle(body.title) : body.title;

    const notificateAllMentions = () => {
      const allMentions = mentions.map((mention) =>
        postApiJWT<IMessage>('/messages/create', {
          message: '@MENTION',
          receiver: mention._id,
        }).then((res) => {
          void createNotification({
            notificationType: 'MESSAGE',
            notificationTypeId: res.data._id,
            userId: mention._id,
            postId: response.data._id,
          });
        }),
      );

      void Promise.all(allMentions);
    };

    notificateAllMentions();

    return response.data;
  },
);

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
    void createNotification({
      notificationType: 'COMMENT',
      notificationTypeId: response.data._id,
      userId: postAuthorId,
      postId,
    });
    return response.data;
  },
);

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
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<IComment>) => {
        state.isLoading = false;

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
