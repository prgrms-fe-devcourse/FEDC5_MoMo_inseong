import { useEffect, useState } from 'react';
import { customAxios, customAxiosJWT } from './customAxios';
import { AxiosError, AxiosResponse } from 'axios';

export const getApi = async (url: string) => {
  try {
    const res = await customAxios().get(url);
    // console.log(url, 'get api result: ', res);
    return res; //{data: Array(1), status: 200, statusText: '', headers: AxiosHeaders, config: {…},}
  } catch (e) {
    console.error(e);
  }
};
export const useGetApi = <T>(url: string) => {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<AxiosError>(); //
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async (url: string) => {
    await customAxios()
      .get(url)
      .then((res) => {
        console.log(res);
        setResponse(res);
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
    void fetchApi(url);
  }, [url]);
  return { response, error, isLoading };
};
export const postApi = async (url: string, data: object) => {
  try {
    const res = await customAxios().post(url, data);
    console.log('postApi result: ', res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

// with JWT ----------------

export const getApiJWT = async (url: string) => {
  try {
    const res = await customAxiosJWT().get(url);
    console.log('get api jwt result: ', res);
    return res; //
  } catch (e) {
    console.error(e);
  }
};
export const postApiJWT = async (url: string, data?: object) => {
  try {
    const res = await customAxios().post(url, data);
    console.log('postApiJWT result: ', res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const putApiJWT = async (url: string, data: object) => {
  try {
    const res = await customAxios().post(url, data);
    console.log('putApiJWT result: ', res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const deleteApiJWT = async (url: string, data: object) => {
  try {
    const res = await customAxios().delete(url, { data: data });
    console.log('deleteApiJWT result: ', res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
