import styled from '@emotion/styled';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { GREY, LIGHT_GREY } from '@/style/colorConstants';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';

interface CommentProps {
  _id: string;
  image: string;
  author: string;
  createdAt: string;
  comment: string;
  mode: 'readonly' | 'edit';
  isMine: boolean;
  handleEditChange: () => void;
  handleDeleteClick?: () => void;
}

export const Comment = ({
  _id,
  image,
  author,
  createdAt,
  isMine,
  mode,
  comment,
  handleEditChange,
  handleDeleteClick,
}: CommentProps) => {
  const [text, setText] = useState(comment);
  const [editText, setEditText] = useState('');

  const handleChangeBtnClick = () => {
    alert('수정되었습니다.');
    setText(editText);
    handleEditChange();
  };

  return (
    <StCommentContainer>
      <StCommentWrapper>
        <StCommentedUser>
          <Profile
            image={image}
            fullName={author}
            imageSize={32}
            fontSize={16}
            _id={_id}
          />
          <StCreatedAt>{`(${createdAt})`}</StCreatedAt>
        </StCommentedUser>

        {/* 댓글 작성자인지 체크 */}
        {isMine && (
          <StCommentedManage>
            {mode !== 'edit' && (
              <Icon
                onIconClick={handleEditChange}
                name="edit-3"
                size={18}
              />
            )}
            <Icon
              onIconClick={handleDeleteClick}
              name="x"
              size={18}
            />
          </StCommentedManage>
        )}
      </StCommentWrapper>

      {/* 'readonly' || 'edit' */}
      {mode === 'readonly' && (
        <StCommentMessage>
          <pre>{text}</pre>
        </StCommentMessage>
      )}
      {mode === 'edit' && (
        <>
          <StTextarea>
            <TextareaAutosize
              className="commentTextarea"
              cacheMeasurements
              onChange={(e) => setEditText(e.target.value)}
              defaultValue={text}
            />
          </StTextarea>
          <StEditButtonWrapper>
            <Button
              handleButtonClick={handleEditChange}
              label="취소"
              width={64}
              height={28}
            />
            <Button
              handleButtonClick={handleChangeBtnClick}
              label="수정"
              width={64}
              height={28}
            />
          </StEditButtonWrapper>
        </>
      )}
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  padding: 16px;
`;

const StCommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StCommentedUser = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const StCreatedAt = styled.span`
  margin: 2px 0 0 8px;
  color: ${GREY};
  font-size: 12px;
`;

const StCommentedManage = styled.div`
  text-align: right;
  flex-grow: 1;
  & span:last-of-type {
    margin-left: 10px;
  }
`;

const StCommentMessage = styled.div`
  margin-top: 8px;
  margin-left: 42px;
  width: calc(100% - 42px);
  padding: 16px;
  border-radius: 8px;
  background-color: ${LIGHT_GREY};

  & pre {
    white-space: pre-wrap;
  }
`;

const StTextarea = styled.div`
  margin-top: 8px;
  margin-left: 42px;

  & .commentTextarea {
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 15.5px;
    width: 100%;
  }
  & .commentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .commentTextarea:focus {
    outline: none;
  }
`;

const StEditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  margin-left: 42px;

  & button:last-of-type {
    margin-left: 10px;
  }
`;
