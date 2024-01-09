import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';

const useAxios = <T>(
  cbFn: () => Promise<AxiosResponse<T, unknown>>,
  fetchOnMount = true,
  deps?: string,
) => {
  const [response, setResponse] = useState<T>({} as T);
  const [error, setError] = useState<Error | AxiosError | null>(null); //
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await cbFn();
      if (!isAxiosError(res)) setResponse(res.data);
      return res;
    } catch (err) {
      setError(err as Error | AxiosError | null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) void fetchData();
  }, [deps]);

  return { response, fetchData, error, isLoading };
};

export default useAxios;
