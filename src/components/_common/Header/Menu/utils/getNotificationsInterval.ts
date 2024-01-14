import { NotificationExtractType } from '../Notification';
import { INotification, IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { parseTitle } from '@/utils/parseTitle';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getNotificationsPostTitle = async (postId: string) => {
  const res = await axios<IPost>(`${baseUrl}/posts/${postId}`);
  return { id: res.data._id, title: res.data.title };
};

const fetchNotifications = async (token: string) => {
  try {
    // webWorker에선 window 사용 못함 = localStorage 사용 못함 = getApiJWT 사용 못함
    const response = await axios<INotification[]>(`${baseUrl}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const notificationResponse = response.data;
    // 포스트 id의 중복을 제거
    const modifiedDuplication = [
      ...new Set(
        notificationResponse
          .filter((post) => 'post' in post)
          .map(({ post }) => post as string),
      ),
    ];

    const postIdsPromise = modifiedDuplication.map((postId) =>
      getNotificationsPostTitle(postId),
    );

    // 알림 반환값에는 게시글 제목이 없으므로 ID값을 이용해 제목을 가져와야됨
    const postTitles = await Promise.all(postIdsPromise);

    const modifiedNotifications = notificationResponse.map((notification) => {
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

      // 타이틀이 커스텀 데이터가 아닐경우 문자열 그대로 보여줌
      let customTitle: string | IPostTitleCustom = postTitles.find(
        ({ id }) => id === post,
      )?.title as string;
      try {
        customTitle = parseTitle(customTitle);
      } catch (err) {
        if (err instanceof SyntaxError)
          console.log('제목을 파싱할 수 없습니다.\n', err.message);
      }

      // COMMENT | LIKE | METION 각 케이스에 맞는 데이터 가공
      if ('comment' in notification) {
        props.type = 'COMMENT';
        props.details = {
          postTitle:
            typeof customTitle === 'string'
              ? customTitle
              : customTitle.postTitle,
          postId: post as string,
          commentId: comment?._id ?? '',
          comment: comment?.comment,
        };
      } else if ('like' in notification) {
        props.type = 'LIKE';
        props.details = {
          postTitle:
            typeof customTitle === 'string'
              ? customTitle
              : customTitle.postTitle,
          postId: post as string,
        };
      } else if ('message' in notification) {
        //FIXME: MESSAGE를 쓰지 않으므로 MENTION으로 대체
        props.type = 'MENTION';
        props.details = {
          postTitle:
            typeof customTitle === 'string'
              ? customTitle
              : customTitle.postTitle,
          postId: post as string,
        };
      }

      return props;
    });

    self.postMessage(modifiedNotifications.filter(({ isSeen }) => !isSeen));
  } catch (err) {
    console.error('notification webWorker Error');
    self.postMessage([] as NotificationExtractType[]);
  }
};

self.addEventListener('message', (e: MessageEvent<string>) => {
  let intervalId;

  if (e.data !== 'stop') {
    void fetchNotifications(e.data);
    intervalId = setInterval(() => void fetchNotifications(e.data), 5000);
  } else {
    clearInterval(intervalId);
  }
});
