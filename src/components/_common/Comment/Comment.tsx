import styled from '@emotion/styled';
import { useState } from 'react';
import { CommentRegister } from '@/pages/DetailPage/components/CommentRegister';
import { GREY, LIGHT_GREY } from '@/style/colorConstants';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';

interface CommentProps {
  author: string;
  image: string;
  createdAt: string;
  comment: string;
  isMine: boolean;
  _id: string;
}

export const Comment = ({
  author,
  image,
  createdAt,
  comment,
  isMine,
  _id,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };
  const onDeleteClick = () => {
    const isCommentDelete = confirm('댓글을 삭제하시겠습니까?');
    if (!isCommentDelete) return;
    alert('삭제되었습니다.');
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

        {isMine && (
          <StCommentedManage>
            <Icon
              onIconClick={onEditClick}
              name="edit-3"
              size={18}
            />
            <Icon
              onIconClick={onDeleteClick}
              name="x"
              size={18}
            />
          </StCommentedManage>
        )}
      </StCommentWrapper>

      {isEditing ? (
        <CommentRegister
          width={64}
          height={28}
          mode="edit"
          defaultValue={comment}
        />
      ) : (
        <StCommentMessage>
          <pre>{comment}</pre>
        </StCommentMessage>
      )}
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  border: 2px solid green;
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
  width: 20%;
  text-align: right;
  & span:first-of-type {
    margin-right: 10px;
  }
`;

const StCommentMessage = styled.div`
  border: 2px solid crimson;
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

// const StCommentEdit = styled.div`
//   display: flex;
//   align-items: center;
// `;
