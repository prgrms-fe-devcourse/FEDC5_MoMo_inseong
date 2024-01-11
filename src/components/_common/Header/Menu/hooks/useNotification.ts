import { useEffect, useState } from 'react';
import type { NotificationExtractType } from '../Notification';
import type { INotification, IPost } from '@/api/_types/apiModels';
import { getApi, getApiJWT } from '@/api/apis';
import useAxios from '@/api/useAxios';

export const useNotification = () => {
  const {
    response: notificationResponse,
    fetchData,
    isLoading: isNotificationLoading,
    error,
  } = useAxios(() => getApiJWT<INotification[]>(`/notifications`));

  const [isLoading, setIsLoading] = useState(false);

  const [notifications, setNotifications] = useState<NotificationExtractType[]>(
    [],
  );

  const getNotificationsPostTitle = async (postId: string) => {
    const res = await getApi<IPost>(`/posts/${postId}`);
    return { id: res.data._id, title: res.data.title };
  };

  useEffect(() => {
    if (!isNotificationLoading) {
      const fetchNotifications = async () => {
        setIsLoading(true);
        try {
          // 포스트 id의 중복을 제거
          const modifiedDuplication = [
            ...new Set(
              notificationResponse
                .filter((post) => 'post' in post)
                .map(({ post }) => post as string),
            ),
          ];
          const postIds = modifiedDuplication.map((postId) =>
            getNotificationsPostTitle(postId),
          );
          const postTitles = await Promise.all(postIds);

          const modifiedNotifications = notificationResponse.map(
            (notification) => {
              const {
                seen: isSeen,
                _id,
                post,
                author: { _id: userId, fullName },
                comment,
                createdAt,
                updatedAt,
              } = notification;

              const props = {
                _id,
                userId,
                fullName,
                when: updatedAt || createdAt,
                isSeen,
              } as NotificationExtractType;

              // COMMENT | LIKE | METION 각 케이스에 맞는 데이터 가공
              if ('comment' in notification) {
                props.type = 'COMMENT';
                props.details = {
                  postTitle:
                    postTitles.find(({ id }) => id === post)?.title ??
                    'unknown title',
                  postId: post as string,
                  commentId: comment?._id ?? '',
                  comment: comment?.comment,
                };
              } else if ('like' in notification) {
                props.type = 'LIKE';
                props.details = {
                  postTitle:
                    postTitles.find(({ id }) => id === post)?.title ??
                    'unknown title',
                  postId: post as string,
                };
              } else if ('message' in notification) {
                //FIXME: MESSAGE를 쓰지 않으므로 MENTION으로 대체
                props.type = 'MENTION';
                props.details = {
                  postTitle:
                    postTitles.find(({ id }) => id === post)?.title ??
                    'unknown title',
                  postId: post as string,
                };
              }

              return props;
            },
          );

          setNotifications(
            modifiedNotifications.filter(({ isSeen }) => !isSeen),
          );
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchNotifications();
    }
  }, [notificationResponse]);

  return {
    notifications,
    setNotifications,
    isLoading,
    fetchData,
    error,
  };
};
