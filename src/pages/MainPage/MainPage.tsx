import styled from '@emotion/styled';
// import { MainArea } from './MainArea';
import { OnlineUsers } from './OnlineUsers';
import { SearchBox } from './SearchBox';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const MainPage = () => {
  return (
    <StSideMarginWrapper>
      <StMainWrapper>
        <StMainSide>
          <OnlineUsers></OnlineUsers>
          <SearchBox></SearchBox>
        </StMainSide>
        <StMainArea>{/* <MainArea></MainArea> */}</StMainArea>
      </StMainWrapper>
    </StSideMarginWrapper>
  );
};

const StMainWrapper = styled.div`
  display: flex;
  gap: 100px;
  padding-top: 20px;
  box-sizing: border-box;
`;
const StMainSide = styled.div`
  width: 30%;
`;
const StMainArea = styled.div`
  flex-grow: 1;
  background: pink;
`;
