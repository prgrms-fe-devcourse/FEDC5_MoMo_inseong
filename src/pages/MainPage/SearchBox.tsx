import styled from '@emotion/styled';
import {
  StSearchIconWrapper,
  StSideBlockWrapper,
  StSideTitle,
} from './OnlineUsers';
import searchDummy from './SearchedPostDummy.json';
import { IPost, IUser } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';
import { Input } from '@common/Input/Input';
import { Profile } from '@common/Profile/Profile';

export const SearchBox = () => {
  // 리덕스상태로 검색결과를 저장하고, Input.tsx에서 엔터 입력시 갱신
  const dummy: (IUser | IPost)[] = searchDummy;

  return (
    <StSideBlockWrapper style={{ marginTop: '15px' }}>
      <StSideTitle>검색 결과</StSideTitle>
      <div style={{ position: 'relative' }}>
        <StSearchIconWrapper>
          <Icon name="search" />
        </StSearchIconWrapper>
        <Input
          placeholder="검색"
          width="100%"
          height={19}
          fontSize={14}
          style={{
            padding: '8px 36px',
            backgroundColor: theme.colors.grey.bright,
            border: 'none',
          }}
        />
      </div>
      <StSearchResults>
        {/* {results. */}
        {dummy &&
          dummy.map(
            (result, idx) =>
              'title' in result && (
                <StSearchResultWrapper key={idx}>
                  <StSearchResultTitle>{result.title}</StSearchResultTitle>
                  <Profile
                    image={result.image || ''}
                    fullName={
                      typeof result.author === 'string' ? result.author : ''
                    }
                    // TODO :  사용자id값을 author로 줌... 사용자정보 요청 한번 거쳐와야함
                    _id={result._id}
                    status="ProfileName"
                    fontSize={12}
                    style={{ color: theme.colors.secondaryNavy.hover }}
                  />
                </StSearchResultWrapper>
              ),
          )}
      </StSearchResults>
    </StSideBlockWrapper>
  );
};

const StSearchResults = styled.div`
  height: 300px;
  margin-top: 10px;
  overflow-y: auto;
`;
const StSearchResultWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 15px;
`;
const StSearchResultTitle = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;
