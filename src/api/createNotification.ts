import { postApiJWT } from './apis';

interface IcreateNotification {
  notificationType: 'COMMENT' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string;
}

/**
 * @description 알림 요청 함수입니다. 비동기 요청이지만 반환값이 없어 async를 쓰지 않습니다.
 *
 * @param body IcreateNotification
 */
export const createNotification = (body: IcreateNotification) => {
  try {
    void postApiJWT('/notifications/create', body);
  } catch (err) {
    console.error(err);
  }
};
