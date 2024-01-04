import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse, RawAxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
axios.defaults.baseURL = import.meta.env.VITE_API_END_POINT;

const useAxios = (axiosParams: RawAxiosRequestConfig, deps: string) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>(); //
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (params: RawAxiosRequestConfig) => {
    await axios
      .request(params)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    void fetchData(axiosParams);
  }, [deps]);

  return { response, error, isLoading };
};

export default useAxios;
