import styled from '@emotion/styled';
import { Tab } from '@common/Tab/Tab';

interface ProfileTabProps {
  pageNumber: number;
  handleCreatePostClick: () => void;
  handleAttendedPostClick: () => void;
  handleInterestedPostClick: () => void;
}

export const ProfileTab = ({
  pageNumber,
  handleCreatePostClick,
  handleAttendedPostClick,
  handleInterestedPostClick,
}: ProfileTabProps) => {
  return (
    <>
      <StTabContainer>
        <StTabWrapper>
          <Tab
            label="내가 만든 모임"
            width={320}
            isActive={pageNumber === 1}
            isJustify={true}
            handleTabClick={handleCreatePostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label="참여한 모임"
            width={320}
            isActive={pageNumber === 2}
            isJustify={true}
            handleTabClick={handleAttendedPostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label="관심 모임"
            width={320}
            isActive={pageNumber === 3}
            isJustify={true}
            handleTabClick={handleInterestedPostClick}
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
