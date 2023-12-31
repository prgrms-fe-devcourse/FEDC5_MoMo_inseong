import styled from '@emotion/styled';

// 팔로우 알림, 댓글 알림, 좋아요 알림(북마크), 메세지 알림, 멘션 알림(커스텀)

// <팔로우> 1. 누가, 언제, 팔로우를 했다. 2. 누가, 언제, 언팔을 했다.
// <댓글> 1. 누가, 언제, 어떤 포스트에, 댓글을 달았다. 2. 누가, 언제, 어떤 포스트에, 댓글을 지웠다 (이거 필요?)
// <좋아요(북마크)> 1. 누가, 언제, 어떤 포스트에, 북마크 등록했다. 2. 누가, 언제, 어떤 포스트에, 북마크 등록 취소했다.
// <메세지> 1. 누가, 언제, 어떤 메세지를 보냈다.
// <멘션> 1. 누가, 언제, 어떤 포스트에, 너를 멘션했다.

interface IFollow {
  type: 'FOLLOW';
  details: {
    isCancel: boolean;
  };
}
interface IComment {
  type: 'COMMENT';
  details: {
    postTitle: string;
    postId: string;
    commentId: string;
    comment: string;
    isCancel: boolean;
  };
}
interface ILike {
  type: 'LIKE';
  details: {
    postTitle: string;
    postId: string;
    isCancel: boolean;
  };
}
interface IMessage {
  type: 'MESSAGE';
  details: {
    message: string;
  };
}
interface IMention {
  type: 'MENTION';
  details: {
    postTitle: string;
    postId: string;
  };
}

type ContentType = IFollow | IComment | ILike | IMessage | IMention;

interface NotificationBaseProps {
  _id: string;
  userId: string;
  fullName: string;
  when: string;
}

export type NotificationExtractType = NotificationBaseProps & ContentType;

interface NotificationProps {
  data: NotificationExtractType[];
}

export const Notification = ({ data }: NotificationProps) => {
  return (
    <StContainer>
      <StTitle>알림</StTitle>
      <StContents>
        {data.length > 0 &&
          data.map(({ type, _id, fullName, when, details }) => (
            <StContentBox key={_id}>
              {type === 'COMMENT' ? (
                <>
                  <StSummary>{`${details.postTitle} 모임에 새로운 댓글이 있습니다.`}</StSummary>
                  <StContent>{`${fullName}: ${details.comment}`}</StContent>
                </>
              ) : type === 'LIKE' ? (
                <StSummary>{`${fullName}님이 ${details.postTitle} 모임을 북마크 등록했습니다.`}</StSummary>
              ) : type === 'FOLLOW' ? (
                details.isCancel ? null : (
                  <StSummary>{`${fullName}님이 팔로우 하였습니다.`}</StSummary>
                )
              ) : type === 'MESSAGE' ? (
                <>
                  <StSummary>{`${fullName}님으로부터 메세지가 도착했습니다.`}</StSummary>
                  <StContent>{`${details.message}`}</StContent>
                </>
              ) : type === 'MENTION' ? (
                <StSummary>{`${fullName}님이 ${details.postTitle} 모임에 멘션하였습니다.`}</StSummary>
              ) : null}
              <StDate>{when}</StDate>
            </StContentBox>
          ))}
      </StContents>
    </StContainer>
  );
};

/* style */
const StContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const StTitle = styled.header`
  font-weight: bold;
  color: black;
  padding: 1rem 8px 0 8px;
`;

const StContents = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const StContentBox = styled.li`
  display: flex;
  flex-direction: column;
  padding: 6px 8px 0 8px;
  gap: 6px;

  border-top: 2px solid ${({ theme }) => theme.colors.grey.light};

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey.bright};
  }

  cursor: pointer;
`;

const StSummary = styled.h2`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondaryNavy.default};
`;

const StContent = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryBlue.default};

  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const StDate = styled.p`
  padding-top: 4px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey.dark};
`;
