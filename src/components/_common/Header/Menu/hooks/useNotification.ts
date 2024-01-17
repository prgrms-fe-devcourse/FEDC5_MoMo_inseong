import { useEffect, useMemo, useState } from 'react';
import type { NotificationExtractType } from '../Notification';
import { useSelector } from '@/_redux/hooks';
import { getItem } from '@/utils/storage';
import { isEqual } from 'lodash';

export const useNotification = () => {
  const { user } = useSelector((state) => state.userInfo);
  const getNotifications: Worker = useMemo(
    () =>
      new Worker(
        new URL('../utils/getNotificationsInterval.ts', import.meta.url),
        {
          type: 'module',
        },
      ),
    [],
  );

  const [notifications, setNotifications] = useState<NotificationExtractType[]>(
    [],
  );

  useEffect(() => {
    if (user) getNotifications.postMessage(getItem('JWT', ''));

    return () => getNotifications.postMessage('stop');
  }, []);

  useEffect(() => {
    getNotifications.onmessage = (e: MessageEvent<NotificationExtractType[]>) =>
      setNotifications((prevState) =>
        isEqual(prevState, e.data) ? prevState : e.data,
      );
  }, [getNotifications]);

  return notifications;
};
