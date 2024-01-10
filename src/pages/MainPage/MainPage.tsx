import styled from '@emotion/styled';
import { MainArea } from './CardsArea/MainArea';
import { OnlineUsers } from './SideBar/OnlineUsers';
import { SearchBox } from './SideBar/SearchBox';
import { Test } from '@/Test';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const MainPage = () => {
  return (
    <StSideMarginWrapper>
      <Test />
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
  gap: 50px;
  padding: 20px 0px;
  box-sizing: border-box;
`;
const StMainSide = styled.div`
  width: 300px;
  height: calc(100vh - 150px);
  max-height: 800px;
  overflow-y: scroll;
`;
const StMainArea = styled.div`
  flex-grow: 1;
`;
