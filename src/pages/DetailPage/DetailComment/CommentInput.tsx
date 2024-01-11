import styled from '@emotion/styled';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IComment, IUser } from '@/api/_types/apiModels';
import { postApiJWT } from '@/api/apis';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Profile } from '@common/Profile/Profile';

interface CommentInputProps {
  loginUser: IUser | null;
  postId: string;
}

export const CommentInput = ({ loginUser, postId }: CommentInputProps) => {
  const [text, setText] = useState('');

  const postComment = async () => {
    await postApiJWT<IComment>('/comments/create', {
      comment: text,
      postId: postId,
    });
  };

  const handleButtonClick = () => {
    if (!text) {
      alert('댓글을 입력해주세요.');
      return;
    }

    void postComment();
    setText('');
  };
  // console.log('loginUser : ', loginUser);
  // console.log(text);

  return (
    <StCommentInputContainer>
      <StCommentInputWrapper>
        <Profile
          status="ProfileImage"
          image={loginUser && loginUser.image ? loginUser.image : ''}
          imageSize={32}
          _id={loginUser ? loginUser._id : ''}
          fullName={loginUser ? loginUser.fullName : ''}
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
