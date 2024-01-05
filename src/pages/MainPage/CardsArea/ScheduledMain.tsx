// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { postsChannelChannelId } from './CardsDummy';
import { ScheduledCards } from './ScheduledCards';
import { IPost, IPostTitleCustom, IUser } from '@/api/_types/apiModels';
import { getApi, useGetApi } from '@/api/apis';
import { customAxios } from '@/api/customAxios';
import { Button } from '@common/Button/Button';
import { Card } from '@common/Card/Card';
import { Icon } from '@common/Icon/Icon';

export const ScheduledMain = () => {
  // const allScheduledPosts: IPost[] = postsChannelChannelId;
  // const { response, error, isLoading } = useGetApi<IPost[]>(
  //   '/posts/channel/6594b0a092c75f48e4de63ea',
  // );
  // console.log(response.data);
  const [page, setPage] = useState(0); // 오늘주0, 이후 +7, -7 씩

  const today = new Date('2023-12-27 11:20:20');
  const thisWeek = new Array(7)
    .fill(0)
    .map((_, i) =>
      dateFormat(new Date(new Date(today).setDate(today.getDate() + i + page))),
    );

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const ddd = [];
  const [done, setDone] = useState(false);
  const {
    response: r2,
    error: e2,
    isLoading: i2,
  } = useGetApi<IUser[] | IPost[]>('/search/all/김민수');
  // console.log(r2);
  const gget = async (url: string) => {
    const r = await getApi(url);
    // console.log(r);
    return r;
  };
  useEffect(() => {
    const dod = async () => {
      for (const day of thisWeek) {
        const tt = await gget(`/search/all/meetDate":"${day.slice(0, 10)}`);
        console.log(day, tt);

        ddd.push(tt?.data);
        console.log(ddd);
      }
      setDone(true);
    };
    void dod();
  }, []);
  // TODO : 포스트 검색 api 이용해서 해당 요일 값 가져오자아
  return <>{done && <ScheduledCards idx={ddd} />}</>;
};

function dateFormat(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
console.log(new Date('2022-5-20 10:30:20')); //Fri May 20 2022 10:30:20 GMT+0900 (한국 표준시)
const toDay = dateFormat(new Date());
console.log(toDay); //2024-01-03 12:59:37
