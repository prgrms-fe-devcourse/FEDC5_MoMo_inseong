import { IPost } from '@/api/_types/apiModels';
import { AxiosError } from 'axios';

// interface ICustomPost extends Omit<IPost, 'title'> {
//   title: IPostTitleCustom;
// }

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

export const baseState: IinitialState = {
  isLoading: false,
  isError: false,
  error: null,
};

export const createPostInitialState = Object.assign(baseState, {
  post: null,
} as IpostState);
export const getPostInitialState = Object.assign(baseState, {
  post: null,
} as IpostState);
export const putPostInitialState = Object.assign(baseState, {
  post: null,
} as IpostState);
export const getPostsInitialState = Object.assign(baseState, {
  posts: [],
} as IpostsState);
