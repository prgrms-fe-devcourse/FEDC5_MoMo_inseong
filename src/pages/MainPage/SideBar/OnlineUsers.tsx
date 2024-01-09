import styled from '@emotion/styled';
import { FormEvent, useEffect, useState } from 'react';
import { IUser } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import useForm from '@/hooks/useForm';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';
import { InputCompound } from '@common/Input/InputCompound';
import { Profile } from '@common/Profile/Profile';

// TODO : 일정 기간마다 get 재요청

export const OnlineUsers = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const {
    response: allUserResp,
    error: allUserError,
    isLoading: isAllUserLoading,
  } = useAxios<IUser[]>(() => getApi('/users/get-users'));
  useEffect(() => {
    if (!isAllUserLoading && !allUserError) {
      setAllUsers(allUserResp);
    }
  }, [isAllUserLoading]);

  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);

  const { values, isLoading, errors, handleChange, handleSubmit } = useForm({
    initialState: {
      inputValue: '',
    },
    onSubmit: async () => {
      const res = await getApi<IUser[]>(`/search/users/${values}`);
      setOnlineUsers(res.data);
    },
    validate: (values: string) => {
      if (values.trim() === '') {
        errors.value = '검색어를 입력하세요';
      }
      return errors;
    },
  });
  useEffect(() => {
    if (values.trim() === '' && allUsers && !isLoading) {
      setOnlineUsers(allUsers);
    }
  }, [values, allUsers, isLoading]);

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
        {onlineUsers &&
          onlineUsers.map((user, idx) => (
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
  // top: 80px;
`;

const StOnlineUserUl = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.colors.secondaryNavy.default};
  height: 150px;
  overflow-y: scroll;
`;
export const StSearchIconWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 9px;
`;
