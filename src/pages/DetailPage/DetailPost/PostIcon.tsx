import styled from '@emotion/styled';
import { useState } from 'react';
import { DUMMY_DATA } from '../DummyData';
import { Icon } from '@common/Icon/Icon';

export const PostIcon = () => {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const onHeartClick = () => {
    setIsHeartClick(!isHeartClick);
  };
  const onDeleteClick = () => {
    const isPostDelete = confirm('정말 삭제하시겠습니까?');
    if (!isPostDelete) return;
    alert('삭제되었습니다.');
    // TODO:
    // 해당 post 삭제 API 호출
    // main page로 redirect
  };
  return (
    <>
      <StIconContainer>
        <HeartIconsWrapper>
          <Icon
            name="heart"
            size={24}
            isFill={isHeartClick}
            onIconClick={onHeartClick}
          />
        </HeartIconsWrapper>
        {/* loggedInId랑 postId랑 같은 사람, 즉 글 작성자만 / 추후 수정 예정 */}
        {DUMMY_DATA._id && (
          <AdminIconsWrapper>
            <Icon
              name="edit"
              size={24}
            />
            <Icon
              name="trash-2"
              size={24}
              onIconClick={onDeleteClick}
            />
          </AdminIconsWrapper>
        )}
      </StIconContainer>
    </>
  );
};
const StIconContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const HeartIconsWrapper = styled.div`
  margin: 16px 0;
  width: 50%;
`;
const AdminIconsWrapper = styled.div`
  width: 50%;
  text-align: right;
  & > span:first-of-type {
    margin-right: 8px;
    margin-right: 24px;
  }
`;
