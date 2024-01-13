import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILike, IPost, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { CreateMeetingModal } from '@/pages/MainPage/Modal/CreateMeetingModal';
import { Icon } from '@common/Icon/Icon';

interface PostIconProps {
  apiResponse: IPost;
  loginUser: IUser | null;
}

export const PostIcon = ({ loginUser, apiResponse }: PostIconProps) => {
  const [isHeart, setIsHeart] = useState('');
  const [isPostOwner, setIsPostOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleHeartClick = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!loginUser) {
      const isUserNeedLogin = confirm('로그인이 필요합니다.');
      isUserNeedLogin && navigate('/login');
      return;
    }
    // 좋아요 안한 상태 => 좋아요
    if (!isHeart) {
      await postApiJWT<ILike>('/likes/create', { postId: apiResponse._id })
        .then((res) => {
          setIsHeart(res.data._id);
        })
        .catch((err) => console.log(err));
    }

    // 좋아요 했던 상태 => 좋아요 취소
    else if (isHeart) {
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

    await deleteApiJWT<IPost>('/posts/delete', { id: apiResponse._id }); // postId

    alert('삭제되었습니다.');
    navigate('/');
  };

  const handleEditClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const LoginUserId = loginUser && loginUser._id;
    const PostLike = apiResponse.likes as ILike[];
    const result = PostLike?.find((like) => like.user === LoginUserId);

    setIsHeart(result ? result._id : '');
    setIsPostOwner(LoginUserId === (apiResponse.author as IUser)._id);
  }, [loginUser, apiResponse]);

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
        {/* isLogin === post 작성자 id */}
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
      <CreateMeetingModal
        post={apiResponse}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CreateMeetingModal>
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
