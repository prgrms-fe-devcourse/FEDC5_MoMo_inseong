import { VoteCellContainer } from './VoteCellContainer';
import { VoteScrollWrapper } from './VoteScrollWrapper';
import { VoteTableMain } from './VoteTableMain';

export const VoteTable = Object.assign(VoteTableMain, {
  ScrollWrapper: VoteScrollWrapper,
  CellContainer: VoteCellContainer,
});
