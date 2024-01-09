import { useDispatch, useSelector } from 'react-redux';
import { getHearts } from './_redux/slices/heartsSlice';
import { getIsLogin } from './_redux/slices/loginSlice';
import { AppDispatchType, RootStateType } from './_redux/stores';

export const Test = () => {
  const useAppDispatch: () => AppDispatchType = useDispatch;
  const dispatch = useAppDispatch();
  const hearts = useSelector((state: RootStateType) => state.hearts.hearts);
  const userId = useSelector((state: RootStateType) => state.auth.userId);
  console.log('hearts state', hearts);
  console.log('userId state', userId);

  return (
    <>
      <button
        onClick={() => {
          dispatch(getHearts('hi'));

          dispatch(getIsLogin())
            .then((res) => console.log(res))
            .catch((err) => console.error(err));

          // dispatch(getChannelsData())
          //   .then((res) => console.log(res))
          //   .catch((err) => console.error(err));
        }}>
        리덕스 테스트용 버튼
      </button>
    </>
  );
};
