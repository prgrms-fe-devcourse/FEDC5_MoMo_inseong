import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { InputCompound } from '@common/Input/InputCompound';
import { Profile } from '@common/Profile/Profile';

export const EditPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <StSideMarginWrapper>
      <StProfileActionsContainer>
        <Icon
          name="arrow-left"
          size={24}
          onIconClick={() => navigate(-1)}
        />
        <Profile
          status="ProfileImage"
          image=""
          fullName="test"
          _id="test"
          imageSize={110}
        />
        <Button label="완료" />
      </StProfileActionsContainer>
      <StProfileForm>
        <StInputText>비밀번호</StInputText>
        <InputCompound>
          <InputCompound.Text
            placeholder="비밀번호"
            type="password"
          />
        </InputCompound>

        <StInputText>새 비밀번호</StInputText>
        <InputCompound>
          <InputCompound.Text
            placeholder="새 비밀번호"
            type="password"
          />
        </InputCompound>
        <StInputText>새 비밀번호 확인</StInputText>
        <InputCompound>
          <InputCompound.Text
            placeholder="새 비밀번호 확인"
            type="password"
          />
        </InputCompound>
      </StProfileForm>
    </StSideMarginWrapper>
  );
};

const StProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StInputText = styled.div`
  margin-top: 50px;
`;

const StProfileActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
`;
