import styled from '@emotion/styled';
import { MouseEvent, Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILike, IPost, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { Icon } from '@common/index';
import { useGetPostDetail } from '@/hooks/query/usePost';
import { useSelector } from '@/_redux/hooks';
import { RootStateType } from '@/_redux/store';
import { FallbackSpinner } from '@common/Fallback/FallbackSpinner';

const CreateMeetingModal = lazy(() => import('@/pages/MainPage/Modal/CreateMeetingModal'));

interface PostIconProps {
  postId: string;
}

export const PostIcon = ({  postId }: PostIconProps) => {
  const [isHeart, setIsHeart] = useState('');
  const [isPostOwner, setIsPostOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootStateType) => state.userInfo);

  const {data} = useGetPostDetail(postId);
  const {_id, author, likes}=data.data

  const handleHeartClick = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!loginUser) {
      const isUserNeedLogin = confirm('로그인이 필요한 서비스입니다.');
      isUserNeedLogin && navigate('/login');
      return;
    }
    if (!isHeart) {
      await postApiJWT<ILike>('/likes/create', { postId: _id })
        .then((res) => {
          setIsHeart(res.data._id);
        })
        .catch((err) => console.log(err));
    } else if (isHeart) {
      await deleteApiJWT<ILike>('/likes/delete', {
        id: isHeart,
      })
        .then(() => {
          setIsHeart('');
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteClick = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const isPostDelete = confirm('정말 삭제하시겠습니까?');
    if (!isPostDelete) return;

    await deleteApiJWT<IPost>('/posts/delete', { id: _id });

    alert('삭제되었습니다.');
    navigate('/');
  };

  const handleEditClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const LoginUserId = loginUser.user && loginUser.user._id;
    const PostLike = likes as ILike[];
    const result = PostLike?.find((like) => like.user === LoginUserId);

    setIsHeart(result ? result._id : '');
    setIsPostOwner(LoginUserId === (author as IUser)._id);
  }, [loginUser]);

  return (
    <>
      <StIconContainer>
        <StIconsWrapper>
          <Icon
            name="heart"
            size={24}
            isFill={!!isHeart}
            onIconClick={(e: MouseEvent<HTMLElement>) =>
              void handleHeartClick(e)
            }
          />
        </StIconsWrapper>
        {isPostOwner && (
          <StAdminIconsWrapper>
            <Icon
              name="edit"
              size={24}
              onIconClick={(e: MouseEvent<HTMLElement>) => handleEditClick(e)}
            />
            <Icon
              name="trash-2"
              size={24}
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleDeleteClick(e)
              }
            />
          </StAdminIconsWrapper>
        )}
      </StIconContainer>
      <Suspense fallback={<FallbackSpinner />}>
        <CreateMeetingModal
          post={data.data}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </CreateMeetingModal>
      </Suspense>
    </>
  );
};
const StIconContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const StIconsWrapper = styled.div`
  flex-grow: 1;
`;

const StAdminIconsWrapper = styled.div`
  & > span:last-of-type {
    margin-left: 24px;
  }
`;
