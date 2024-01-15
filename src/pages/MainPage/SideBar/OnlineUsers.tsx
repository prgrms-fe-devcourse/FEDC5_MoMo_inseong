import styled from '@emotion/styled';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { setAllUsersList } from '@/_redux/slices/allUsersSlice';
import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useForm from '@/hooks/useForm';
import { theme } from '@/style/theme';
import { Icon, InputCompound, Profile } from '@common/index';
import { cloneDeep, isEqual } from 'lodash';

export const OnlineUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, isLoading: isAllUsersLoading } = useSelector(
    (state) => state.allUsers,
  );
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [willDebounce, setWillDebounce] = useState(false);

  useEffect(() => {
    void dispatch(setAllUsersList());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setWillDebounce((prev) => !prev);
      void dispatch(setAllUsersList());
    }, 10000);
  }, [willDebounce]);

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState: {
      inputValue: '',
    },
    onSubmit: async () => {
      const res = await getApi<IUser[]>(`/search/users/${values}`);
      setSearchedUsers(res.data);
    },
    validate: (values: string) => {
      if (values.trim() === '') {
        errors.value = '검색어를 입력하세요';
      }
      return errors;
    },
  });

  useEffect(() => {
    if (values.trim() === '' && allUsers.length > 0 && !isAllUsersLoading) {
      const sortedUsers = cloneDeep(allUsers);
      sortedUsers.sort((a, b) => Number(b.isOnline) - Number(a.isOnline));
      setSearchedUsers((prev) =>
        isEqual(prev, sortedUsers) ? prev : sortedUsers,
      );
    }
  }, [values, allUsers, isAllUsersLoading]);

  return (
    <StSideBlockWrapper>
      <div style={{ position: 'relative' }}>
        <StSearchIconWrapper>
          <Icon name="search" />
        </StSearchIconWrapper>
        <form onSubmit={(e: FormEvent) => void handleSubmit(e)}>
          <InputCompound style={{ width: '100%', padding: 0 }}>
            <InputCompound.Text
              placeholder="유저 검색"
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
      <StOnlineUserUl>
        {searchedUsers &&
          searchedUsers.map((user, idx) => (
            <Profile
              key={idx}
              image={user.image || ''}
              fullName={user.fullName}
              _id={user._id}
              status="Profile"
              fontSize={14}
              imageSize={22}
              style={{
                borderRadius: ' 10px',
                padding: '2px 0px',
                color: user.isOnline ? 'black' : theme.colors.grey.default,
              }}
            />
          ))}
      </StOnlineUserUl>
    </StSideBlockWrapper>
  );
};

export const StSideBlockWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grey.bright};
  padding: 10px 16px;
  position: sticky;
`;

const StOnlineUserUl = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.colors.secondaryNavy.default};
  height: 250px;
  overflow-y: scroll;
  ${({ theme }) => theme.scrollBar.default}
`;
export const StSearchIconWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 9px;
`;
