import styled from '@emotion/styled';
import { GREY, LIGHT_GREY } from '@/style/colorConstants';

interface CommentProps {
  author: string;
  image: string;
  createdAt: string;
  comment: string;
  isMine: boolean;
}

export const Comment = ({
  author,
  image,
  createdAt,
  comment,
  isMine,
}: CommentProps) => {
  return (
    <StCommentContainer>
      <StCommentInfo>
        {/* StProfileImage, StProfileAuthor는 Profile 컴포넌트로 대체할 부분 */}
        <StProfileImage
          src={image}
          alt={author + '의 프로필 사진'}
        />
        <StProfileAuthor>{author}</StProfileAuthor>

        <StCreatedAt>{`(${createdAt})`}</StCreatedAt>

        {/* StIcon은 Icon 컴포넌트로 대체할 부분 */}
        {isMine && <StIcon>X</StIcon>}
      </StCommentInfo>
      <StCommentMessage>
        <p>{comment}</p>
      </StCommentMessage>
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  width: 600px;
  padding: 16px;
`;

const StCommentInfo = styled.div`
  display: flex;
  position: relative;
`;

const StProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

const StProfileAuthor = styled.span`
  overflow: hidden;
  max-width: 300px;
  margin-left: 8px;
  font-size: 16px;
  white-space: nowrap; // 텍스트를 한 줄로 표시
  text-overflow: ellipsis; // 넘치는 텍스트를 ...로 표시
  cursor: pointer;
`;

const StCreatedAt = styled.span`
  margin: 4px 0 0 8px; // 날짜 정보는 Author 보다는 조금 아래에 위치하는게 좋아보입니다.
  color: ${GREY};
  font-size: 12px;
`;

const StIcon = styled.i`
  position: absolute;
  top: 0%;
  right: 0%;
  font-size: 16px;
  transform: translate(-50%, 0);
  cursor: pointer;
`;

const StCommentMessage = styled.div`
  width: calc(100% - 32px);
  margin-top: 8px;
  margin-left: 32px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${LIGHT_GREY};

  & span {
    overflow: hidden;
  }
`;
