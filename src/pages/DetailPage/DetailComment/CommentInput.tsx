import styled from '@emotion/styled';
import { CommentRegister } from '../components/CommentRegister';
import { DUMMY_DATA } from '../components/DummyData';
import { Profile } from '@common/Profile/Profile';

export const CommentInput = () => {
  return (
    <StCommentInputContainer>
      <StCommentInputWrapper>
        <Profile
          status="ProfileImage"
          image={DUMMY_DATA.image}
          imageSize={32}
          _id={DUMMY_DATA._id}
          fullName={DUMMY_DATA.author}
        />
        <CommentRegister
          width={64}
          height={28}
          mode="create"
          defaultValue=""
        />
      </StCommentInputWrapper>
    </StCommentInputContainer>
  );
};

const StCommentInputContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const StCommentInputWrapper = styled.div`
  /* border: 2px solid crimson; */
  display: flex;
  align-items: center;
`;
