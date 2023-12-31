import { getItem } from '@/utils/storage';
import axios, { AxiosInstance } from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

export const customAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: VITE_API_BASE_URL as string,
  });

  return axiosInstance;
};
export const customAxiosJWT = (): AxiosInstance => {
  // const jwt = getItem('JWT')로 받아와야함.
  const jwt = '123456';
  const axiosInstance = axios.create({
    baseURL: VITE_API_BASE_URL as string,
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return axiosInstance;
};
