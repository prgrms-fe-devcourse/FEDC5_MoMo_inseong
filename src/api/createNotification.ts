import { postApiJWT } from './apis';

interface IcreateNotification {
  notificationType: 'COMMENT' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string;
}

export const createNotification = (body: IcreateNotification) => {
  try {
    void postApiJWT('/notifications/create', body);
  } catch (err) {
    console.error(err);
  }
};
