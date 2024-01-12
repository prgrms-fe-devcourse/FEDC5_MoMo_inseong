import { IComment } from '@/api/_types/apiModels';

export const isIComment = (
  comments: IComment[] | string[],
): comments is IComment[] => {
  return (
    comments.length > 0 &&
    comments.every(
      (item) =>
        typeof item === 'object' &&
        '_id' in item &&
        'comment' in item &&
        'author' in item &&
        'post' in item &&
        'createdAt' in item &&
        'updatedAt' in item,
    )
  );
};
