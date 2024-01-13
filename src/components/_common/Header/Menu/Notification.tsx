import styled from '@emotion/styled';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { putApiJWT } from '@/api/apis';

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
  };
}
interface ILike {
  type: 'LIKE';
  details: {
    postTitle: string;
    postId: string;
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

export interface NotificationBaseProps {
  _id: string;
  userId: string;
  fullName: string;
  when: string;
  isSeen: boolean;
}

export type NotificationExtractType = NotificationBaseProps & ContentType;

interface NotificationProps {
  data: NotificationExtractType[];
  setIsRedDot: Dispatch<SetStateAction<boolean>>;
  setIsVisible?: (arg: boolean) => void;
}

export const Notification = memo(
  ({ data, setIsVisible, setIsRedDot }: NotificationProps) => {
    const [isBlur, setIsBlur] = useState(false);
    // 전체 알람 확인
    const handleSeenAlert = () => {
      void putApiJWT(`/notifications/seen`);
      setIsBlur(true);
      setIsRedDot(false);
    };
    // 툴팁 클릭시 닫힘
    const handleVisibility = () => {
      setIsVisible && setIsVisible(false);
    };
    return (
      <StContainer>
        <StHeaderContainer>
          <StTitle>알림</StTitle>
          <StConfirmButton onClick={handleSeenAlert}>전체 확인</StConfirmButton>
        </StHeaderContainer>
        <StContentScrollWrapper>
          <StContents>
            {data.length > 0 &&
              data.map(({ type, _id, fullName, when, details, isSeen }) => (
                <StContentBox
                  key={_id}
                  title={subTitleOf(type)}
                  isBlur={isBlur || isSeen}
                  onClick={handleVisibility}>
                  {type === 'COMMENT' ? (
                    <Link to={`/details/${details.postId}`}>
                      <StSummary>
                        <StBold>{details.postTitle}</StBold> 모임에 새로운
                        댓글이 있습니다.
                      </StSummary>
                      <StContent>
                        <StBold>{fullName}</StBold> {`| ${details.comment}`}
                      </StContent>
                    </Link>
                  ) : type === 'LIKE' ? (
                    <Link to={`/details/${details.postId}`}>
                      <StSummary>
                        <StBold>{fullName}</StBold>님이{' '}
                        <StBold>{details.postTitle}</StBold> 모임을 북마크
                        등록했습니다.
                      </StSummary>
                    </Link>
                  ) : type === 'FOLLOW' ? (
                    details.isCancel ? null : (
                      <StSummary>
                        <StBold>{fullName}</StBold>님이 팔로우 하였습니다.
                      </StSummary>
                    )
                  ) : type === 'MESSAGE' ? (
                    <>
                      <StSummary>
                        <StBold>{fullName}</StBold>님으로부터 메세지가
                        도착했습니다.
                      </StSummary>
                      <StContent>{`${details.message}`}</StContent>
                    </>
                  ) : type === 'MENTION' ? (
                    <Link to={`/details/${details.postId}`}>
                      <StSummary>
                        <StBold>{fullName}</StBold>님이{' '}
                        <StBold>{details.postTitle}</StBold> 모임에
                        멘션하였습니다.
                      </StSummary>
                    </Link>
                  ) : null}
                  <StDate>{new Date(when).toLocaleDateString()}</StDate>
                </StContentBox>
              ))}
          </StContents>
        </StContentScrollWrapper>
      </StContainer>
    );
  },
);

/* style */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StHeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  padding: 1rem 8px 1rem 8px;
  border-bottom: 2px solid #dfdfdf;
`;

const StTitle = styled.header`
  display: inline-block;
  flex-grow: 1;
  font-weight: bold;
  color: black;
`;

const StConfirmButton = styled.button`
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryBlue.default};
`;

const StContentScrollWrapper = styled.article`
  display: block;
  overflow: hidden;
  max-height: calc(100% - ${({ theme }) => theme.sizes.notificationHeader});
`;

const StContents = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  overflow-y: auto;

  ${({ theme }) => theme.scrollBar.default}
`;

const StContentBox = styled.li<{ title: string; isBlur: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px 12px 8px 12px;

  border-bottom: 2px solid ${({ theme }) => theme.colors.grey.light};

  transition: background-color 0.2s ease;

  opacity: ${({ isBlur }) => (isBlur ? '40%' : 'none')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey.bright};
  }

  :last-child {
    border-bottom: none;
    padding-bottom: 1rem;
  }

  ::before {
    content: '${({ title }) => title + ' 알림'}';
    font-size: 14px;
    font-weight: bold;
  }

  cursor: pointer;
`;

const StSummary = styled.p`
  font-size: 13px;
  font-weight: 500;
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
  text-align: end;
`;

/* util */
const subTitleOf = (type: ContentType['type']) => {
  switch (type) {
    case 'COMMENT': {
      return '댓글';
    }
    case 'FOLLOW': {
      return '팔로우';
    }
    case 'LIKE': {
      return '북마크';
    }
    case 'MESSAGE': {
      return '메세지';
    }
    case 'MENTION': {
      return '멘션';
    }
    default:
      return '';
  }
};

const StBold = styled.span`
  font-weight: 700;
`;
