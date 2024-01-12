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

/** `<<< thunk 사용 예시 >>>`
 * @example import { useDispatch } from '@/_redux/hooks'
 * import { getIsLogin } from '@/_redux/slices/loginSlice'
 * const dispatch = useDispatch();
 * dispatch(getIsLogin);
 */
export const getUserInfo = createAsyncThunk('authUser', async () => {
  const response = await getApiJWT<IUser>('/auth-user');
  console.log('getUserInfo response', response);
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
        // console.log(state.user); //{role: 'Regular', emailVerified: false, banned: false, isOnline: true, posts: Array(0),}
      },
    );
    builder.addCase(getUserInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

/**`<< selector 콜백 예시 >>`
 * @description useSelector 안에서 (state) => state.reducer 문장을 중복으로 너무 많이 사용해야할 때 선언하면 좋습니다.
 *
 * @example const 변수 = useSelector(shouldRedirect);
 */
export const shouldRedirect = (state: RootStateType) => state.userInfo;

export const getUser = (state: RootStateType) => state.userInfo.user;
export const { initUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
