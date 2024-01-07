import styled from '@emotion/styled';
import { DUMMY_DATA } from '../components/DummyData';
import { Badge } from './Badge';
import { DetailTimeTablePage } from './DetailTimeTablePage';
import { PostContents } from './PostContents';
import { PostIcon } from './PostIcon';

type DetailPostType = {
  isPostPage: boolean;
};

export const DetailPost = ({ isPostPage }: DetailPostType) => {
  return (
    <>
      <StPostContainer>
        {/* Post or TimeTable*/}
        {isPostPage && <PostContents />}
        {!isPostPage && <DetailTimeTablePage />}

        {/* Badge */}
        {DUMMY_DATA.tags.length && (
          <Badge
            kind="tag"
            data={DUMMY_DATA.tags}
          />
        )}
        {DUMMY_DATA.mentions.length && (
          <Badge
            kind="mention"
            data={DUMMY_DATA.mentions}
          />
        )}

        {/* Icon */}
        <PostIcon />
      </StPostContainer>
    </>
  );
};

const StPostContainer = styled.div`
  margin-top: 32px;
  padding: 16px;
`;
