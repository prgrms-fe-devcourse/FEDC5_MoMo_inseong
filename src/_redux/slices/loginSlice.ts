import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUserData {
  isLoading: boolean;
  isLogin: boolean;
}

const initialState: IUserData = {
  isLoading: false,
  isLogin: false,
};

export const getIsLogin = createAsyncThunk('authUser', async () => {
  const response = await getApi<IUser[]>('/auth-user');
  return Array.isArray(response.data);
});

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIsLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIsLogin.fulfilled, (state, action) => {
      state.isLoading = true;
      state.isLogin = action.payload;
    });
    builder.addCase(getIsLogin.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default loginSlice.reducer;
