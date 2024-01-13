import { IComment, ILike, IMessage } from './_types/apiModels';
import { postApiJWT } from './apis';
import { getItem } from '@/utils/storage';
import axios, { AxiosInstance } from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

export const customAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: VITE_API_BASE_URL,
  });

  return axiosInstance;
};
export const customAxiosJWT = (): AxiosInstance => {
  const jwt = getItem('JWT', '') as string;
  const axiosInstance = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return axiosInstance;
};

interface IbaseParams {
  userId: string;
  postId: string;
}

interface IcreateNotification extends IbaseParams {
  notificationType: 'COMMENT' | 'LIKE' | 'MENTION';
  notificationTypeId: string;
}

interface ICommentParams extends IbaseParams {
  comment: string;
}

interface ILikeParams extends IbaseParams {}

interface IMentionParams extends Omit<IbaseParams, 'userId'> {
  message: string;
  receiver: string;
}

export const notificationAxiosJWT = customAxiosJWT().interceptors.response.use(
  (response) => {
    const data = response.data as IComment | ILike | IMessage;
    const parameters = response.config.params as
      | ICommentParams
      | ILikeParams
      | IMentionParams;

    if ('comment' in parameters) {
      void postApiJWT('/notifications/create', {
        notificationType: 'COMMENT',
        notificationTypeId: data._id,
        userId: parameters.userId,
        postId: parameters.postId,
      } as IcreateNotification);
    } else if ('reciver' in parameters) {
      void postApiJWT('/notifications/create', {
        notificationType: 'MENTION',
        notificationTypeId: data._id,
        userId: parameters.reciver,
        postId: parameters.postId,
      } as IcreateNotification);
    } else {
      void postApiJWT('/notifications/create', {
        notificationType: 'LIKE',
        notificationTypeId: data._id,
        userId: (parameters as ILikeParams).userId,
        postId: parameters.postId,
      } as IcreateNotification);
    }

    return response;
  },
  (err) => Promise.reject(err),
);

notificationAxiosJWT;
