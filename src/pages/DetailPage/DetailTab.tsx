import styled from '@emotion/styled';
import { DUMMY_DATA } from './components/DummyData';
import { Tab } from '@common/Tab/Tab';

interface DetailTabProps {
  pageNumber: number;
  handlePostClick: () => void;
  handleTimeTableClick: () => void;
}

export const DetailTab = ({
  pageNumber,
  handlePostClick,
  handleTimeTableClick,
}: DetailTabProps) => {
  return (
    <>
      <StTabContainer>
        <StTabWrapper>
          <Tab
            label={DUMMY_DATA.labelPost}
            width={DUMMY_DATA.tabWidth}
            isActive={pageNumber === 1}
            isJustify={true}
            handleTabClick={handlePostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label={DUMMY_DATA.labelTimeTable}
            width={DUMMY_DATA.tabWidth}
            isActive={pageNumber === 2}
            isJustify={true}
            handleTabClick={handleTimeTableClick}
          />
        </StTabWrapper>
      </StTabContainer>
    </>
  );
};

const StTabContainer = styled.div`
  margin-top: 32px;
  display: flex;
`;

const StTabWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: end;
`;
