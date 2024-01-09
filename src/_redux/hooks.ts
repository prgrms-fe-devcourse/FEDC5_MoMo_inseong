import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import type { AppDispatchType, RootStateType } from './store';

export const useDispatch: () => AppDispatchType = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootStateType> =
  useReduxSelector;
