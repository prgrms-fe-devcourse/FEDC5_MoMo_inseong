import styled from '@emotion/styled';
import { DUMMY_DATA } from '../components/DummyData';

export const PostContents = () => {
  return (
    <>
      <StPostContainer>
        {DUMMY_DATA.image && (
          <StPostImgWrapper>
            <img
              src={DUMMY_DATA.image}
              alt={`${DUMMY_DATA.title}_image`}
            />
          </StPostImgWrapper>
        )}
        <StPostContents>
          {DUMMY_DATA.contents && DUMMY_DATA.contents}
        </StPostContents>
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
