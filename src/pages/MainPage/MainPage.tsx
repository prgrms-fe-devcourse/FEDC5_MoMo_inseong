import styled from '@emotion/styled';
import { useEffect } from 'react';
import { MainArea } from './CardsArea/MainArea';
import { OnlineUsers } from './SideBar/OnlineUsers';
import { SearchBox } from './SideBar/SearchBox';
import { useDispatch } from '@/_redux/hooks';
import { getUserInfo } from '@/_redux/slices/userSlice';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    void dispatch(getUserInfo());
  }, []);
  return (
    <StSideMarginWrapper>
      <StMainWrapper>
        <StMainSide>
          <OnlineUsers></OnlineUsers>
          <SearchBox></SearchBox>
        </StMainSide>
        <StMainArea>
          <MainArea></MainArea>
        </StMainArea>
      </StMainWrapper>
    </StSideMarginWrapper>
  );
};

const StMainWrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  box-sizing: border-box;
`;
const StMainSide = styled.div`
  width: 300px;
  height: calc(100vh - 100px);
  max-height: 800px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.medium} {
    display: none;
  }
`;
const StMainArea = styled.div`
  margin-left: 50px;
  flex-grow: 1;
`;
