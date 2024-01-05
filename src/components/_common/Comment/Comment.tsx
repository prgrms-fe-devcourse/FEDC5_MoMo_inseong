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
  handleEditClick: () => void;
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
  handleEditClick,
  handleDeleteClick,
}: CommentProps) => {
  const [text, setText] = useState(comment);
  const handleTextChange = () => {
    setText(text);
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
                onIconClick={handleEditClick}
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
              className="CommentTextarea"
              cacheMeasurements
              value={text}
              onChange={handleTextChange}
            />
          </StTextarea>
          <StEditButtonWrapper>
            <Button
              label="취소"
              width={64}
              height={28}
            />
            <Button
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
  border: 1px solid green;
  padding: 16px;
`;

const StCommentWrapper = styled.div`
  border: 1px solid purple;
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
  width: 20%;
  text-align: right;
  & span:last-of-type {
    margin-left: 10px;
  }
`;

const StCommentMessage = styled.div`
  /* border: 1px solid crimson; */
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

  & .CommentTextarea {
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 15.5px;
    width: 100%;
  }
  & .CommentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .CommentTextarea:focus {
    outline: none;
  }
`;

const StEditButtonWrapper = styled.div`
  border: 1px solid purple;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  margin-left: 42px;

  & button:last-of-type {
    margin-left: 10px;
  }
`;
