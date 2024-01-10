import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import {
  deleteApiJWT,
  getApi,
  getApiJWT,
  postApiJWT,
  putApiJWT,
} from '@/api/apis';
import { createFormData } from '@/utils/createFormData';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ICustomPost extends Omit<IPost, 'title'> {
  title: IPostTitleCustom;
}

interface IinitialState {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | Error | null;
  // createdPost?: IPost | null;
  // channalPosts?: IPost[];
  // authorPosts?: IPost[];
}

interface IpostState {
  post: IPost | null;
}

interface IpostsState {
  posts: IPost[];
}

const baseState: IinitialState = {
  isLoading: false,
  isError: false,
  error: null,
};

const initialState = {
  createPost: Object.assign(baseState, { post: null } as IpostState),
  getPost: Object.assign(baseState, { post: null } as IpostState),
  putPost: Object.assign(baseState, { post: null } as IpostState),
  getPosts: Object.assign(baseState, { posts: [] } as IpostsState),
};

// 채널 포스트 목록
export const getChannalPosts = createAsyncThunk(
  'getChannalPosts',
  async (channelId: string) => {
    const response = await getApi<IPost[]>(`/posts/channel/${channelId}`);
    return response.data;
  },
);

// 사용자 포스트 목록
export const getAuthorPost = createAsyncThunk(
  'getAuthorPost',
  async (authorId: string) => {
    const response = await getApi<IPost[]>(`/posts/author/${authorId}`);
    return response.data;
  },
);

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

// 특정 포스트 상세보기
export const getPostDetail = createAsyncThunk(
  'getPostDetail',
  async (postId: string) => {
    const response = await getApi<IPost>(`/posts/${postId}`);
    return response.data;
  },
);

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

interface IdeletePost {
  id: string;
}

// 포스트 삭제
export const deletePost = createAsyncThunk(
  'deletePost',
  async (body: IdeletePost) => {
    const response = await deleteApiJWT(`/posts/delete`, body);
    return response.data;
  },
);

const createPostSlice = createSlice({
  name: 'createPostSlice',
  initialState: initialState.createPost,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = true;
        state.post = action.payload;
      },
    );
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const putPostSlice = createSlice({
  name: 'putPostSlice',
  initialState: initialState.putPost,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(putPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      putPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = true;
        state.post = action.payload;
      },
    );
    builder.addCase(putPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const getPostSlice = createSlice({
  name: 'getPostSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = true;
        state.createdPost = action.payload;
      },
    );
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default postSlice.reducer;
