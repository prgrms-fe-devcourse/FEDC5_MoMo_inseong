import { TimeTable } from '../TimeTable/TimeTable';
import { StPostContainer } from './PostContents';
import { IPost } from '@/api/_types/apiModels';

type DetailTimeTablePageType = {
  post: IPost;
};

export const DetailTimeTablePage = ({ post }: DetailTimeTablePageType) => {
  return (
    <StPostContainer>
      <TimeTable post={post} />
    </StPostContainer>
  );
};
