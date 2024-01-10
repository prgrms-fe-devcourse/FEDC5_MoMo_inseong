// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ScheduledCards } from './ScheduledCards';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { theme } from '@/style/theme';
import { dateFormat } from '@/utils/dateFormat';
import { Button } from '@common/Button/Button';
import { Spinner } from '@common/Spinner/Spinner';

export const ScheduledMain = () => {
  const [page, setPage] = useState(0); // 오늘주0, 이후 +7, -7 씩

  const today = new Date('2022-12-22 11:20:20'); /// FIX: 오늘날짜로 변경
  const thisWeek = new Array(7)
    .fill(0)
    .map((_, i) =>
      dateFormat(new Date(new Date(today).setDate(today.getDate() + i + page))),
    );

  const [cardsOfDay, setCardsOfDay] = useState<IPost[][]>([]);

  useEffect(() => {
    setCardsOfDay([] as IPost[][]);
    const getCardsOfWeek = async () => {
      for (const day of thisWeek) {
        const results2 = await getApi<IPost[]>(
          `/search/all/meetDate....${day.slice(0, 10)}`,
        );
        setCardsOfDay((prev) => [...prev, results2?.data]);
      }
    };
    void getCardsOfWeek();
  }, [page]);

  // TODO : 포스트 검색 api 이용해서 해당 요일 값 가져오자아
  return (
    <>
      {cardsOfDay.length !== 7 ? (
        <Spinner
          size={50}
          color={theme.colors.primaryBlue.default}
        />
      ) : (
        <>
          <ScheduledCards
            cards={cardsOfDay}
            thisWeek={thisWeek}
          />
          <StButtonsWrapper>
            <Button
              label="지난 주"
              handleButtonClick={() => setPage(page - 7)}
              width={100}
              height={36}
              color="NAVY"
            />
            <Button
              label="이번 주"
              handleButtonClick={() => setPage(0)}
              width={70}
              height={36}
              isOutline={true}
              color="NAVY"
              disabled={page === 0}
            />
            <Button
              label="다음 주"
              handleButtonClick={() => setPage(page + 7)}
              width={100}
              height={36}
              color="NAVY"
            />
          </StButtonsWrapper>{' '}
        </>
      )}
    </>
  );
};

const StButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
