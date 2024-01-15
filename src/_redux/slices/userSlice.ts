import type { RootStateType } from '../store';
import { IUser } from '@/api/_types/apiModels';
import { getApiJWT } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUserData {
  isLoading: boolean;
  user: IUser | null;
}

const initialState: IUserData = {
  isLoading: false,
  user: null,
};

export const getUserInfo = createAsyncThunk('authUser', async () => {
  const response = await getApiJWT<IUser>('/auth-user');
  return response.data;
});

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    initUserInfo: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUserInfo.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      },
    );
    builder.addCase(getUserInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const shouldRedirect = (state: RootStateType) => state.userInfo;

export const getUser = (state: RootStateType) => state.userInfo.user;
export const { initUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
