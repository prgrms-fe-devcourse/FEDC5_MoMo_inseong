import styled from '@emotion/styled';
import { CSSProperties, useState } from 'react';
import InputUpload from '../InputUpload';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';

interface InputProps {
  image?: string;
  style?: CSSProperties;
}

export const InputImage = ({ image: initialImage, ...props }: InputProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);

  // TODO: 추후 데이터 관련하여 다시 확인..
  const handleImageChange = (uploadedFile: File) => {
    setImage(URL.createObjectURL(uploadedFile));
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleImageZoom = () => {
    // TODO: 이미지 확대
  };

  return (
    /* TODO: Image 클릭 시 확장 어떻게 진행할지 */
    <>
      {!image ? (
        <StImageContainer style={{ ...props.style }}>
          <StyledUpload>
            <InputUpload onChange={handleImageChange}>
              <Icon name="plus" />
            </InputUpload>
          </StyledUpload>
        </StImageContainer>
      ) : (
        <StImageContainer>
          <StImage
            style={{ backgroundImage: `url(${image})`, ...props.style }}
            onClick={handleImageZoom}>
            <Icon
              name="x"
              showBackground={true}
              onIconClick={handleImageRemove}
            />
          </StImage>
        </StImageContainer>
      )}
    </>
  );
};

const StImageContainer = styled.div`
  margin-top: 10px;
`;

const StImage = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const StyledUpload = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${theme.colors.grey.light};
  border-radius: 8px;
`;
