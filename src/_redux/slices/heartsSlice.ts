import { createSlice } from '@reduxjs/toolkit';

interface IHeartsSlice {
  hearts: string[];
}

const initialState: IHeartsSlice = {
  hearts: [],
};

const heartsSlice = createSlice({
  name: 'heartsSlice',
  initialState,
  reducers: {
    getHearts: (state, action) => {
      if (typeof action.payload === 'string') {
        state.hearts = [...state.hearts, action.payload];
      }
    },
  },
});

export const { getHearts } = heartsSlice.actions;

export default heartsSlice.reducer;
