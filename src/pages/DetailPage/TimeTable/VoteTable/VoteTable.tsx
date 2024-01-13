import { VoteCellContainer } from './VoteCellContainer/VoteCellContainer';
import { VoteScrollWrapper } from './VoteScrollWrapper/VoteScrollWrapper';
import { VoteTableMain } from './VoteTableMain/VoteTableMain';

export const VoteTable = Object.assign(VoteTableMain, {
  ScrollWrapper: VoteScrollWrapper,
  CellContainer: VoteCellContainer,
});
