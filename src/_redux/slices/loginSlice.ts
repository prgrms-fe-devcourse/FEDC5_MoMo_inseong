import type { RootStateType } from '../store';
import { IUser } from '@/api/_types/apiModels';
import { getApiJWT } from '@/api/apis';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUserData {
  isLoading: boolean;
  isLogin: boolean;
  loggedinUser: IUser;
  userId: string;
}

const initialState: IUserData = {
  isLoading: false,
  isLogin: false,
  loggedinUser: {} as IUser,
  userId: '',
};

export const getIsLogin = createAsyncThunk('authUserLogin', async () => {
  const response = await getApiJWT<IUser>('/auth-user');
  return response.data._id;
});

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIsLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getIsLogin.fulfilled,
      (state, action: PayloadAction<IUserData['userId']>) => {
        state.isLoading = true;
        state.userId = action.payload;
      },
    );
    builder.addCase(getIsLogin.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const shouldRedirect = (state: RootStateType) => state.auth.isLogin;

export default loginSlice.reducer;
