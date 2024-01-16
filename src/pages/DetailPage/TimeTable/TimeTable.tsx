import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useVotingTimeTable } from '../hooks/useVotingTimeTable';
import { VoteTable } from './VoteTable/VoteTable';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import { IComment, IPost, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { createIVote } from '@/utils/createIVote';
import { parseTitle } from '@/utils/parseTitle';
import { Button } from '@common/index';

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
  const { user } = useSelector((state) => state.userInfo);

  const { _id: userId, fullName } = useSelector(
    (state) => state.userInfo.user as IUser,
  );

  const [isVoting, setIsVoting] = useState(false);

  const { vote, meetDate, voteEntries, times } = useMemo(() => {
    const parsedTitle = parseTitle(post.title);
    const meetDate = parsedTitle.meetDate;

    const receivedComments = post.comments as IComment[];
    const currentVote = receivedComments
      .filter(({ comment }) => comment.startsWith('@VOTE'))
      .sort(
        ({ createdAt: prev }, { createdAt: cur }) =>
          new Date(cur).getTime() - new Date(prev).getTime(),
      )[0];

    let vote: IVote;

    if (currentVote) {
      const splitedMyVote = currentVote.comment.split('@VOTE ')[1];
      const parsedMyVote = JSON.parse(splitedMyVote) as IVote;
      vote = parsedMyVote;
    } else {
      vote = createIVote(meetDate);
    }

    const voteEntries = Object.entries(vote);

    return {
      vote,
      meetDate,
      voteEntries,
      times: Object.keys(voteEntries[0][1]),
    };
  }, [post]);

  const { dragAreaRef, totalVoteAreaRef, modifyMyVote } = useVotingTimeTable({
    vote,
    userId,
    isVoting,
  });

  const modifyVoteComment = async () => {
    const deleteCommentId =
      (post.comments as IComment[]).find(
        (comment) =>
          comment.author._id === userId && comment.comment.startsWith('@VOTE'),
      )?._id ?? (post.comments as string[]).find((id) => id === userId);

    const modifiedMyVote = modifyMyVote(userId, fullName);
    const stringifiedVote = JSON.stringify(modifiedMyVote);
    const modifiedVoteComment = `@VOTE ${stringifiedVote}`;

    try {
      if (deleteCommentId)
        await deleteApiJWT<IComment>('/comments/delete', {
          id: deleteCommentId,
        });

      await postApiJWT<IComment>('/comments/create', {
        comment: modifiedVoteComment,
        postId: post._id,
      });

      void dispatch(getPostDetail(post._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmClick = () => {
    if (isVoting) {
      void modifyVoteComment();
    }
    setIsVoting((old) => !old);
  };

  const handleCancelClick = () => {
    setIsVoting(false);
  };

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
        {user && (
          <Button
            label={isVoting ? '완료하기' : '투표하기'}
            width={100}
            height={30}
            handleButtonClick={handleConfirmClick}
          />
        )}
      </StButtonContainer>
    </StWrapper>
  );
};

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
