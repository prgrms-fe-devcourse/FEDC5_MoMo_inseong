import { IPostTitleCustom } from '@/api/_types/apiModels';

export const parseTitle = (customedTitle: string) => {
  const parsedData: IPostTitleCustom = JSON.parse(
    customedTitle,
  ) as IPostTitleCustom;
  return parsedData;
};
