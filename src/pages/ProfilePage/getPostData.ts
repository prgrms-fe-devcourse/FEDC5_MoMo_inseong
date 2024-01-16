import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';

export const getPostData = async (url: string) => {
  return (await getApi<IPost>(`/posts/${url}`)).data;
};
