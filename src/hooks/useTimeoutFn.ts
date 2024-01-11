// 함수 호출을 통한 방법!!
import { useCallback, useEffect, useRef } from 'react';

const useTimeoutFn = (fn: () => void, ms: number) => {
  /// ms초 후에 실행할 함수 fn을 받고, 타임아웃을 걸 실행함수run과 타임아웃을 멈출 clear함수를 만들어 리턴.
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]); // 훅이 사라질때 clear 꼭!
  return [run, clear];
};

export default useTimeoutFn;
