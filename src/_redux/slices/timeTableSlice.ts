import { IVotedUser } from '@/api/_types/apiModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { cloneDeep } from 'lodash';

export type ClassListType = string[];

export interface ICellsType {
  votedUser: IVotedUser[];
  classList: ClassListType;
}

interface IVoting {
  myCells: ClassListType[][] | null;
  memoMyCells: ClassListType[][] | null;
  prevMyCells: ClassListType[][] | null;
  prevRange: string[] | null;
  votedCells: ICellsType[][] | null;
  memoVotedCells: ICellsType[][] | null;
  prevVotedCells: ICellsType[][] | null;
  startPoint: string | null;
  prevPoint: [number, number] | null;
}

interface IUpdateCell {
  rowIndex: number;
  columnIndex: number;
}

const initialState: IVoting = {
  myCells: null,
  memoMyCells: null,
  prevMyCells: null,
  prevRange: null,
  votedCells: null,
  memoVotedCells: null,
  prevVotedCells: null,
  startPoint: null,
  prevPoint: null,
};

const timeTableSlice = createSlice({
  name: 'timeTableSlice',
  initialState,
  reducers: {
    updateInit: (
      state,
      action: PayloadAction<[string[][][], ICellsType[][]]>,
    ) => {
      state.myCells = action.payload[0];
      state.memoMyCells = action.payload[0];
      state.prevMyCells = action.payload[0];
      state.votedCells = action.payload[1];
      state.memoVotedCells = action.payload[1];
      state.prevVotedCells = action.payload[1];
    },
    draggingMyCell: (state, action: PayloadAction<IUpdateCell>) => {
      const { rowIndex, columnIndex } = action.payload;

      if (
        state.prevPoint != null &&
        rowIndex === state.prevPoint[0] &&
        columnIndex === state.prevPoint[1]
      )
        return;

      state.prevPoint = [rowIndex, columnIndex];

      if (
        state.memoMyCells &&
        state.prevMyCells &&
        state.prevVotedCells &&
        state.startPoint !== null
      ) {
        const [startY, startX] = state.startPoint.split('/').map(Number);
        const willCancel =
          state.memoMyCells[startY][startX].includes('selected');

        const minX = Math.min(columnIndex, startX);
        const maxX = Math.max(columnIndex, startX);
        const minY = Math.min(rowIndex, startY);
        const maxY = Math.max(rowIndex, startY);

        let currentRange: string[] = [];

        for (let i = minY; i <= maxY; i++) {
          for (let j = minX; j <= maxX; j++) {
            currentRange = [...currentRange, i + '/' + j];

            if (willCancel) {
              state.prevMyCells[i][j] = [
                ...new Set([...state.prevMyCells[i][j], 'unselecting']),
              ];
              state.prevVotedCells[i][j].classList = [
                ...new Set([
                  ...state.prevVotedCells[i][j].classList,
                  'unvoting',
                ]),
              ];
            } else {
              state.prevMyCells[i][j] = [
                ...new Set([...state.prevMyCells[i][j], 'selecting']),
              ];
              state.prevVotedCells[i][j].classList = [
                ...new Set([...state.prevVotedCells[i][j].classList, 'voting']),
              ];
            }
          }
        }

        produce(state, (draft) => {
          draft.prevRange?.forEach((cellIndex) => {
            if (currentRange.includes(cellIndex)) return;

            const [i, j] = cellIndex.split('/').map(Number);

            if (state.prevMyCells && state.prevVotedCells) {
              state.prevMyCells[i][j] = state.prevMyCells[i][j].filter(
                (className) =>
                  !(className === 'selecting' || className === 'unselecting'),
              );
              state.prevVotedCells[i][j].classList = state.prevVotedCells[i][
                j
              ].classList.filter(
                (className) =>
                  !(className === 'voting' || className === 'unvoting'),
              );
            }
          });
        });

        state.prevRange = [...currentRange];
      }
    },
    setDragPoint: (state, action: PayloadAction<IVoting['startPoint']>) => {
      const startPoint = state.startPoint as string;

      if (action.payload && startPoint === null) {
        state.startPoint = action.payload;
        state.prevRange = (state.myCells as string[][][]).flatMap(
          (row, i) =>
            row
              .map((classList, j) =>
                classList.includes('selected') ? i + '/' + j : false,
              )
              .filter((el) => el) as string[],
        );
      } else {
        const [startY, startX] = startPoint.split('/').map(Number);
        const willCancel = (state.memoMyCells as string[][][])[startY][
          startX
        ].includes('selected');

        (state.prevRange as string[])
          .map((cellIndex) => cellIndex.split('/').map(Number))
          .forEach(([rowIdx, colIdx]) => {
            if (state.prevMyCells && state.prevVotedCells) {
              if (willCancel) {
                state.prevMyCells[rowIdx][colIdx] = state.prevMyCells[rowIdx][
                  colIdx
                ].filter((className) => className !== 'selected');

                state.prevVotedCells[rowIdx][colIdx].classList =
                  state.prevVotedCells[rowIdx][colIdx].classList.filter(
                    (className) => className !== 'voted-mine',
                  );
              } else {
                state.prevMyCells[rowIdx][colIdx].push('selected');
                state.prevVotedCells[rowIdx][colIdx].classList.push(
                  'voted-mine',
                );
              }
              state.prevMyCells[rowIdx][colIdx] = state.prevMyCells[rowIdx][
                colIdx
              ].filter(
                (className) =>
                  !(className === 'selecting' || className === 'unselecting'),
              );
              state.prevVotedCells[rowIdx][colIdx].classList =
                state.prevVotedCells[rowIdx][colIdx].classList.filter(
                  (className) =>
                    !(className === 'voting' || className === 'unvoting'),
                );
            }
          });

        state.startPoint = null;

        state.memoMyCells = cloneDeep(state.prevMyCells);
        state.memoVotedCells = cloneDeep(state.prevVotedCells);
      }
    },
    cancelVote: (state) => {
      state.memoMyCells = cloneDeep(state.myCells);
      state.prevMyCells = cloneDeep(state.myCells);
      state.memoVotedCells = cloneDeep(state.votedCells);
      state.prevVotedCells = cloneDeep(state.votedCells);
    },
    reset: (state) => {
      state.myCells = null;
      state.memoMyCells = null;
      state.prevMyCells = null;
      state.prevRange = null;
      state.votedCells = null;
      state.prevPoint = null;
      state.memoVotedCells = null;
      state.prevVotedCells = null;
    },
  },
});

export const { updateInit, draggingMyCell, cancelVote, setDragPoint, reset } =
  timeTableSlice.actions;

export default timeTableSlice.reducer;
