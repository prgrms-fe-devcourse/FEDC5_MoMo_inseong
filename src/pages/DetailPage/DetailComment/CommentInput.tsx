import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from '@/_redux/hooks';
import { postComment } from '@/_redux/slices/postSlices/getPostSlice';
import { IUser } from '@/api/_types/apiModels';
// import { postApiJWT } from '@/api/apis';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Profile } from '@common/Profile/Profile';

interface CommentInputProps {
  loginUser: IUser | null;
  postId: string;
}

export const CommentInput = ({ loginUser, postId }: CommentInputProps) => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handlePostComment = () => {
    const data = { comment: text, postId: postId };
    void dispatch(postComment(data));
  };

  const handleButtonClick = () => {
    if (!loginUser) {
      const isUserNeedLogin = confirm('로그인이 필요합니다.');
      isUserNeedLogin && navigate('/login');
      return;
    }

    if (!text) {
      alert('댓글을 입력해주세요.');
      return;
    }

    void handlePostComment();
    setText('');
  };

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
  margin-top: 16px;
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
