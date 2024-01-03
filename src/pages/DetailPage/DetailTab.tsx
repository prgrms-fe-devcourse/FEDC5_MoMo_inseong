import styled from '@emotion/styled';
import { DUMMY_DATA } from './components/DummyData';
import { Tab } from '@common/Tab/Tab';

interface DetailTabProps {
  isPostPage: boolean;
  handleTabClick: () => void;
}

export const DetailTab = ({ isPostPage, handleTabClick }: DetailTabProps) => {
  return (
    <>
      <StTabContainer>
        <StTabWrapper>
          <Tab
            label={DUMMY_DATA.labelPost}
            width={DUMMY_DATA.tabWidth}
            isActive={isPostPage}
            isJustify={true}
            handleTabClick={handleTabClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label={DUMMY_DATA.labelTimeTable}
            width={DUMMY_DATA.tabWidth}
            isActive={!isPostPage}
            isJustify={true}
            handleTabClick={handleTabClick}
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
