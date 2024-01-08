import styled from '@emotion/styled';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { DUMMY_DATA } from '../DummyData';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Profile } from '@common/Profile/Profile';

export const CommentInput = () => {
  const [text, setText] = useState('');
  const handleButtonClick = () => {
    // Data 전송
    setText('');
  };

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
        <TextareaAutosize
          className="commentTextarea"
          placeholder="댓글을 입력해 보세요."
          cacheMeasurements
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          handleButtonClick={handleButtonClick}
          label="등록"
          width={64}
          height={28}
        />
      </StCommentInputWrapper>
    </StCommentInputContainer>
  );
};

const StCommentInputContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 8px;
  padding: 16px;

  & .commentTextarea {
    margin: 0 10px;
    width: calc(100% - 116px);
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 16px;
    box-sizing: content-box;
  }
  & .commentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .commentTextarea:focus {
    outline: none;
  }
`;

const StCommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
