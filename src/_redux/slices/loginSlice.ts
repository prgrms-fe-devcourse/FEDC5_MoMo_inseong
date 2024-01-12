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

/** `<<< thunk 사용 예시 >>>`
 * @example import { useDispatch } from '@/_redux/hooks'
 * import { getIsLogin } from '@/_redux/slices/loginSlice'
 * const dispatch = useDispatch();
 * dispatch(getIsLogin);
 */
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
      /**
       * @description action.payload의 타입을 지정해야할 때 PayloadAction 유틸 타입을 사용합니다.
       * 제네릭으로 action.payload의 타입을 넘겨줍니다.
       */
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

/**`<< selector 콜백 예시 >>`
 * @description useSelector 안에서 (state) => state.reducer 문장을 중복으로 너무 많이 사용해야할 때 선언하면 좋습니다.
 *
 * @example const 변수 = useSelector(shouldRedirect);
 */
export const shouldRedirect = (state: RootStateType) => state.auth.isLogin;

export default loginSlice.reducer;
