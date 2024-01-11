import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootStateType } from '@/_redux/store';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const MyJoinCards = () => {
  const userId = useSelector((state: RootStateType) => state.auth.userId);
  console.log('---', userId);

  // getApi(`posts/author/${userId}`),
  return (
    <>
      {/* <StCardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          !error &&
          response &&
          response.map((post, idx) => (
            <Card
              key={idx}
              cardData={post}
              handleCardClick={() => ''}
            />
          ))
        )}
      </StCardsWrapper> */}
    </>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: center;
  gap: 64px;
  width: 100%;
  box-sizing: border-box;
`;
