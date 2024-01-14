// 이날모일래 탭 선택시 아래 화면 컴포넌트
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { StSpinnerWrapper } from '../mainPageStyled.ts';
import { ScheduledCards } from './ScheduledCards';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { theme } from '@/style/theme';
import { dateFormat } from '@/utils/dateFormat';
import { Button } from '@common/Button/Button';
import { Spinner } from '@common/Spinner/Spinner';

export const ScheduledMain = () => {
  const [page, setPage] = useState(0); // 오늘주0, 이후 +7, -7 씩

  const today = new Date(useSelector((state) => state.today.today));
  const thisWeek = new Array(7)
    .fill(0)
    .map((_, i) =>
      dateFormat(new Date(new Date(today).setDate(today.getDate() + i + page))),
    );

  const [cardsOfThisweek, setCardsOfThisweek] = useState<IPost[][]>([]);

  useEffect(() => {
    setCardsOfThisweek([] as IPost[][]);
    const getCardsOfWeek = async () => {
      for (const day of thisWeek) {
        const cardsOfEachDay = await getApi<IPost[]>(
          `/search/all/meetDate....${day.slice(0, 10)}....people`,
        );
        setCardsOfThisweek((prev) => [...prev, cardsOfEachDay?.data]);
      }
    };
    void getCardsOfWeek();
  }, [page]);

  return (
    <>
      {cardsOfThisweek.length !== 7 ? (
        <StSpinnerWrapper>
          <Spinner
            size={50}
            color={theme.colors.primaryBlue.default}
          />
        </StSpinnerWrapper>
      ) : (
        <>
          <ScheduledCards
            cards={cardsOfThisweek}
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
          </StButtonsWrapper>
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
