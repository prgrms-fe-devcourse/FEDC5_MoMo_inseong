import { useEffect, useState } from 'react';
// import { login } from '../../@api/request';
// import { getApi } from './apis';
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
axios.defaults.baseURL = import.meta.env.VITE_API_END_POINT;

// const useAxios1 = (axiosParams: RawAxiosRequestConfig, deps: string) => {
//   const [response, setResponse] = useState<AxiosResponse>();
//   const [error, setError] = useState<AxiosError>(); //
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = async (params: RawAxiosRequestConfig) => {
//     const abc = await login('abc', 'wnd');
//     console.log(abc);

//     const bbb = await axios('http://abc.com');
//     console.log(bbb.data);

//     await axios
//       .request(params)
//       .then((response) => {
//         setResponse(response);
//       })
//       .catch((error) => {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//         setError(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     void fetchData(axiosParams);
//   }, [deps]);

//   return { response, error, isLoading };
// };

// const useAxios2 = () => {
//   // const [response, setResponse] = useState<AxiosResponse>();
//   const [error, setError] = useState<AxiosError>(new AxiosError());
//   const [isLoading, setIsLoading] = useState(true);

//   const executeFn = async <T>(
//     apiFn: (url: string, data?: T) => Promise<AxiosResponse | AxiosError>,
//     url: string,
//     data?: T,
//   ) => {
//     setIsLoading(true);
//     try {
//       const res = await apiFn(url, data);
//       return res;
//     } catch (err) {
//       if (isAxiosError(err)) setError(err);
//       else {
//         return err;
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { executeFn, error, isLoading };
// };

const useAxios = <T>(
  cbFn: () => Promise<AxiosResponse<T, unknown>>,
  deps?: string,
) => {
  const [response, setResponse] = useState<T>({} as T);
  const [error, setError] = useState<Error | AxiosError | null>(null); //
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await cbFn();
        if (!isAxiosError(res)) setResponse(res.data);
        return res;
      } catch (err) {
        setError(err as Error | AxiosError | null);
        // setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, [deps]);

  return { response, error, isLoading };
};

export default useAxios;
