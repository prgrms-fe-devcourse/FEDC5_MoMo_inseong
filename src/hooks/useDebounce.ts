import { useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

/// deps: unknown []   ?  ??
const useDebounce = (fn: () => void, ms: number, deps: unknown[]) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  //eslint-disable-next-line
  useEffect(run, deps);

  return clear;
};

export default useDebounce;
