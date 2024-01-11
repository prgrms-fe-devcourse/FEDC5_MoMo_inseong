import { IUser } from '@/api/_types/apiModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAllUsersSlice {
  allUsers: IUser[];
}

const initialState: IAllUsersSlice = {
  allUsers: [],
};

const allUsersSlice = createSlice({
  name: 'allUsersSlice',
  initialState,
  reducers: {
    setAllUsersList: (state, action: PayloadAction<IUser[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setAllUsersList } = allUsersSlice.actions;

export default allUsersSlice.reducer;
