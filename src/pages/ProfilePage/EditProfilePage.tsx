import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { InputCompound } from '@common/Input/InputCompound';
import InputUpload from '@common/Input/InputUpload';
import { Profile } from '@common/Profile/Profile';

interface EditProfileProps {
  image?: string;
}
export const EditProfilePage = ({ image: initialImage }: EditProfileProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const handleImageChange = (uploadedFile: File) => {
    setImage(URL.createObjectURL(uploadedFile));
  };
  const navigate = useNavigate();
  return (
    <StSideMarginWrapper>
      <StProfileActionsContainer>
        <Icon
          name="arrow-left"
          size={24}
          onIconClick={() => navigate(-1)}
        />
        <StImageContainer>
          <Profile
            status="ProfileImage"
            image={image === null ? 'https://picsum.photos/200' : image}
            fullName="test"
            _id="test"
            imageSize={110}
            style={{ backgroundImage: `url(${image})` }}
          />
          <InputUpload onChange={handleImageChange}>
            <StEditIcon
              name="edit"
              size={24}
            />
          </InputUpload>
        </StImageContainer>
        <Button label="완료" />
      </StProfileActionsContainer>
      <StProfileForm>
        <StInputText>이름*</StInputText>
        <InputCompound>
          <InputCompound.Text placeholder="이름" />
        </InputCompound>

        <StInputText>닉네임*</StInputText>
        <InputCompound>
          <InputCompound.Text placeholder="닉네임" />
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

const StImageContainer = styled.div`
  position: relative;
`;

const StEditIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
  cursor: pointer;
`;
