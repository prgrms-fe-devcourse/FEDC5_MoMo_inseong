import styled from '@emotion/styled';
import { MainArea } from './CardsArea/MainArea';
import { OnlineUsers } from './SideBar/OnlineUsers';
import { SearchBox } from './SideBar/SearchBox';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const MainPage = () => {
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
  gap: 50px;
  padding: 20px 0px;
  box-sizing: border-box;
`;
const StMainSide = styled.div`
  width: 300px;
`;
const StMainArea = styled.div`
  flex-grow: 1;
`;
