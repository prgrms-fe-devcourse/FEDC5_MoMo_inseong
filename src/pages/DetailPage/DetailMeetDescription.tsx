import styled from '@emotion/styled';
import { DUMMY_DATA } from './DummyData';
import { theme } from '@/style/theme';
import { Profile } from '@common/Profile/Profile';

export const DetailMeetDescription = () => {
  return (
    <>
      <StMeetDescription>
        <StMeetInformation>
          <span>{DUMMY_DATA.title}</span>
          <span>{DUMMY_DATA.createdAt}</span>
        </StMeetInformation>
        <Profile
          image={DUMMY_DATA.image}
          _id={DUMMY_DATA._id}
          fullName={DUMMY_DATA.author}
          fontSize={DUMMY_DATA.fontSize}
          imageSize={DUMMY_DATA.imageSize}
          status="Profile"
        />
      </StMeetDescription>
    </>
  );
};

const StMeetDescription = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StMeetInformation = styled.div`
  max-width: 70%;

  & > span {
    display: block;
    margin: 4px 0;
  }
  & span:first-of-type {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 18px;
  }
  & span:last-child {
    font-size: 16px;
    color: ${theme.colors.grey.default};
  }
`;
