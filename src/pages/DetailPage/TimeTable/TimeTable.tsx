import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useVotingTimeTable } from '../hooks/useVotingTimeTable';
import { VoteTable } from './VoteTable/VoteTable';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { modifyVoteState } from '@/_redux/slices/postSlices/getPostSlice';
import { IPost, IPostTitleCustom, IUser } from '@/api/_types/apiModels';
import { putApiJWT } from '@/api/apis';
import { createFormData } from '@/utils/createFormData';
import { parseTitle } from '@/utils/parseTitle';
import { Button } from '@common/Button/Button';
import { Spinner } from '@common/Spinner/Spinner';

export interface IVotedUser {
  id: string;
  fullName: string;
}

export interface ITimeVote {
  [key: string]: IVotedUser[];
}

export interface IVote {
  [key: string]: ITimeVote;
}

export type TimeTableType = {
  post: IPost;
};

export const TimeTable = ({ post }: TimeTableType) => {
  const dispatch = useDispatch();

  const { isLoading, isError, error } = useSelector(
    (state) => state.getPostDetail,
  );

  const { _id: userId, fullName } = useSelector(
    (state) => state.userInfo.user as IUser,
  );

  const [isVoting, setIsVoting] = useState(false);

  const { vote, meetDate, voteEntries, times } = useMemo(() => {
    const parsedTitle = parseTitle(post.title);
    const vote = parsedTitle.vote;
    const voteEntries = Object.entries(vote);

    return {
      vote,
      meetDate: parsedTitle.meetDate,
      voteEntries,
      times: Object.keys(voteEntries[0][1]),
    };
  }, [post]);

  const { dragAreaRef, totalVoteAreaRef, modifyMyVote } = useVotingTimeTable({
    vote,
    userId,
    isVoting,
  });

  const modifyVoteOfPost = () => {
    const parsedTitle = parseTitle(post.title);
    const modifiedMyVote = modifyMyVote(userId, fullName);

    // 내 아이디 있을 경우 중복 제거
    const modifiedParticipants = new Set([...parsedTitle.participants, userId]);

    const modifiedTitle: IPostTitleCustom = {
      ...parsedTitle,
      vote: modifiedMyVote,
      participants: [...modifiedParticipants],
    };

    return modifiedTitle;
  };

  const putPostWithModifiedVote = () => {
    const resultVote = modifyVoteOfPost();
    const formData = createFormData(resultVote);

    void putApiJWT<IPost, FormData>('/posts/update', formData);

    void dispatch(modifyVoteState(resultVote.vote));

    alert('일정투표가 정상적으로 완료되었습니다!');
  };

  const handleConfirmClick = () => {
    if (isVoting) {
      void putPostWithModifiedVote();
    }
    setIsVoting((old) => !old);
  };

  const handleCancelClick = () => {
    setIsVoting(false);
  };

  if (isLoading) return <Spinner />;
  if (isError) throw error;

  return (
    <StWrapper>
      <StTableContainer>
        {isVoting && (
          <VoteTable>
            <VoteTable.ScrollWrapper
              times={times}
              meetDate={meetDate}>
              <VoteTable.CellContainer
                ref={dragAreaRef}
                voteEntries={voteEntries}
                isMyTable={true}
              />
            </VoteTable.ScrollWrapper>
          </VoteTable>
        )}
        <VoteTable>
          <VoteTable.ScrollWrapper
            times={times}
            meetDate={meetDate}>
            <VoteTable.CellContainer
              ref={totalVoteAreaRef}
              voteEntries={voteEntries}
              isMyTable={false}
            />
          </VoteTable.ScrollWrapper>
        </VoteTable>
      </StTableContainer>
      <StButtonContainer>
        {isVoting && (
          <Button
            label="취소"
            width={50}
            height={30}
            color="NAVY"
            handleButtonClick={handleCancelClick}
          />
        )}
        <Button
          label={isVoting ? '완료하기' : '투표하기'}
          width={100}
          height={30}
          handleButtonClick={handleConfirmClick}
        />
      </StButtonContainer>
    </StWrapper>
  );
};

/* style */
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StTableContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const StButtonContainer = styled.div`
  display: flex;
  gap: 6px;
`;
