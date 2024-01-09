import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { StSearchIconWrapper, StSideBlockWrapper } from './OnlineUsers';
import { IPost, IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useForm from '@/hooks/useForm';
import { theme } from '@/style/theme';
import { parseTitle } from '@/utils/parseTitle';
import { Icon } from '@common/Icon/Icon';
import { InputCompound } from '@common/Input/InputCompound';
import { Profile } from '@common/Profile/Profile';

export const SearchBox = () => {
  const [searcedResults, setSearchedResults] = useState<IUser[] | IPost[]>([]);
  // TODO : 리덕스 리덕스상태로 검색결과를 저장하고, Input.tsx에서 엔터 입력시 갱신

  // isLoading 미사용
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState: {
      inputValue: '',
    },
    onSubmit: async () => {
      const res = await getApi<IUser[] | IPost[]>(`/search/all/${values}`);
      setSearchedResults(res.data);
    },
    validate: (values: string) => {
      if (values.trim() === '') {
        errors.value = '검색어를 입력하세요';
      }
      return errors;
    },
  });

  return (
    <StSideBlockWrapper style={{ marginTop: '15px' }}>
      <div style={{ position: 'relative' }}>
        <StSearchIconWrapper>
          <Icon name="search" />
        </StSearchIconWrapper>
        <form onSubmit={(e: FormEvent) => void handleSubmit(e)}>
          <InputCompound style={{ padding: 0 }}>
            <InputCompound.Text
              placeholder="모임 검색"
              width="100%"
              fontSize={14}
              style={{
                padding: '8px 36px',
                backgroundColor: theme.colors.grey.bright,
                border: 'none',
                borderRadius: '8px',
              }}
              onChange={handleChange}
            />
          </InputCompound>
        </form>
      </div>
      <StSearchResults>
        {/* {results. */}
        {searcedResults &&
          searcedResults.map(
            (result, idx) =>
              'title' in result && (
                <StSearchResultWrapper key={idx}>
                  <StSearchResultTitle>
                    {parseTitle(result.title).postTitle}
                  </StSearchResultTitle>
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
