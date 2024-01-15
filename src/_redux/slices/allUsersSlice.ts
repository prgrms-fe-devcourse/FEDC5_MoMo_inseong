import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IAllUsersSlice {
  isLoading: boolean;
  allUsers: IUser[];
}

const initialState: IAllUsersSlice = {
  isLoading: false,
  allUsers: [],
};

export const setAllUsersList = createAsyncThunk('setAllUsersList', async () => {
  const response = await getApi<IUser[]>('/users/get-users');
  return response?.data;
});

const allUsersSlice = createSlice({
  name: 'allUsersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAllUsersList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      setAllUsersList.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      },
    );
    builder.addCase(setAllUsersList.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default allUsersSlice.reducer;
