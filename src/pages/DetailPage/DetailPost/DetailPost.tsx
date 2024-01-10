import styled from '@emotion/styled';
import { Badge } from './Badge';
import { DetailTimeTablePage } from './DetailTimeTablePage';
import { PostContents } from './PostContents';
import { PostIcon } from './PostIcon';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';

interface DetailPostProps {
  pageNumber: number;
  response: IPost;
}

export const DetailPost = ({ pageNumber, response }: DetailPostProps) => {
  const responseTitle = JSON.parse(response.title) as IPostTitleCustom;
  return (
    <StPostContainer>
      {/* Post or TimeTable*/}
      {pageNumber === 1 && <PostContents response={response} />}
      {pageNumber === 2 && <DetailTimeTablePage />}

      {/* Badge */}
      {responseTitle.tags.length && (
        <Badge
          kind="tag"
          data={responseTitle.tags}
        />
      )}
      {/* Todo: 아래 멘션 태그 클릭 시 해당 유저 프로필로 이동 */}
      {responseTitle.mentions.length && (
        <Badge
          kind="mention"
          data={responseTitle.mentions}
        />
      )}

      {/* Icon */}
      <PostIcon />
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  margin-top: 32px;
  padding: 16px;
`;
