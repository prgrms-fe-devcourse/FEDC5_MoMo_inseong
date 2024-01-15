import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StSearchIconWrapper, StSideBlockWrapper } from './OnlineUsers';
import { IPost, IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useForm from '@/hooks/useForm';
import { theme } from '@/style/theme';
import { parseTitle } from '@/utils/parseTitle';
import { Icon, InputCompound, Profile, Spinner } from '@common/index';

export const SearchBox = () => {
  const [searcedResults, setSearchedResults] = useState<IUser[] | IPost[]>([]);

  const { values, isLoading, errors, handleChange, handleSubmit } = useForm({
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
  const navigate = useNavigate();
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
        {isLoading ? (
          <Spinner />
        ) : (
          searcedResults &&
          searcedResults.map(
            (result, idx) =>
              'title' in result && (
                <StSearchResultWrapper
                  key={idx}
                  onClick={() => {
                    navigate(`/details/${result._id}`);
                  }}>
                  <StSearchResultTitle>
                    {parseTitle(result.title).postTitle}
                  </StSearchResultTitle>
                  <Profile
                    image={result.image || ''}
                    fullName={parseTitle(result.title).author}
                    _id={
                      typeof result.author === 'string'
                        ? result.author
                        : result.author._id
                    }
                    status="ProfileName"
                    fontSize={12}
                    style={{
                      color: theme.colors.secondaryNavy.hover,
                      backgroundColor: theme.colors.grey.bright,
                      width: 'fit-content',
                      padding: '0px 10px',
                      borderRadius: '5px',
                    }}
                  />
                </StSearchResultWrapper>
              ),
          )
        )}
      </StSearchResults>
    </StSideBlockWrapper>
  );
};

const StSearchResults = styled.div`
  min-height: 100px;
  max-height: 300px;
  margin-top: 10px;
  overflow-y: auto;
  ${({ theme }) => theme.scrollBar.default}
`;
const StSearchResultWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 0px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey.light};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.grey.bright};
  }
`;
const StSearchResultTitle = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;
