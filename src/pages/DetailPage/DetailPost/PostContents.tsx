import styled from '@emotion/styled';
import { IPost, IPostTitleCustom } from '@/api/_types/apiModels';

type PostContentsType = {
  response: IPost;
};

export const PostContents = ({ response }: PostContentsType) => {
  const responseTitle = JSON.parse(response.title) as IPostTitleCustom;

  return (
    <>
      <StPostContainer>
        {response.image && (
          <StPostImgWrapper>
            <img
              src={response.image}
              alt={`${response.title}_image`}
            />
          </StPostImgWrapper>
        )}
        <StPostContents>{responseTitle.contents}</StPostContents>
      </StPostContainer>
    </>
  );
};

export const StPostContainer = styled.div`
  width: 100%;
  margin-bottom: 48px;
  padding: 8px 0;
`;

const StPostContents = styled.pre`
  font-size: 18px;
  margin: 32px 0;
  white-space: pre-wrap;
`;

const StPostImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;
