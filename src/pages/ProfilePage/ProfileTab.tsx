import styled from '@emotion/styled';
import { Tab } from '@common/Tab/Tab';

interface ProfileTabProps {
  tabNumber: number;
  handleCreatePostClick?: () => void;
  handleAttendedPostClick?: () => void;
  handleInterestedPostClick?: () => void;
  handleUserCards?: () => void;
  handleUserJoinCards?: () => void;
}

export const MyProfileTab = ({
  tabNumber,
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
            isActive={tabNumber === 1}
            isJustify={true}
            handleTabClick={handleCreatePostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label="참여한 모임"
            width={320}
            isActive={tabNumber === 2}
            isJustify={true}
            handleTabClick={handleAttendedPostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label="관심 모임"
            width={320}
            isActive={tabNumber === 3}
            isJustify={true}
            handleTabClick={handleInterestedPostClick}
          />
        </StTabWrapper>
      </StTabContainer>
    </>
  );
};

export const UserProfileTab = ({
  tabNumber,
  handleUserCards,
  handleUserJoinCards,
}: ProfileTabProps) => {
  return (
    <>
      <StTabContainer>
        <StTabWrapper>
          <Tab
            label="유저가 만든 모임"
            width={320}
            isActive={tabNumber === 4}
            isJustify={true}
            handleTabClick={handleUserCards}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label="유저가 참여한 모임"
            width={320}
            isActive={tabNumber === 5}
            isJustify={true}
            handleTabClick={handleUserJoinCards}
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
