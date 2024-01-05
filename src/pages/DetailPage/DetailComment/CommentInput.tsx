import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
import { DUMMY_DATA } from '../components/DummyData';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
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
        {/* 버튼 클릭 시 TextareaAutosize value를 ''로 비워줘야 함. */}
        <TextareaAutosize
          className="CommentTextarea"
          placeholder="댓글을 입력해 보세요."
          cacheMeasurements
        />
        <Button
          label="등록"
          width={64}
          height={28}
        />
      </StCommentInputWrapper>
    </StCommentInputContainer>
  );
};

const StCommentInputContainer = styled.div`
  /* border: 1px solid green; */
  margin-top: 32px;
  margin-bottom: 8px; // 수정 요망
  padding: 16px;

  & .CommentTextarea {
    margin: 0 10px;
    width: calc(100% - 116px); // 116
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 16px;
  }
  & .CommentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .CommentTextarea:focus {
    outline: none;
  }
`;

const StCommentInputWrapper = styled.div`
  /* border: 1px solid orange; */
  display: flex;
  align-items: center;
`;
