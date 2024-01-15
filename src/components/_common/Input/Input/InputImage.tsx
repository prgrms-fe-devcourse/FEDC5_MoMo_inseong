import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import InputUpload from '../InputUpload';
import { theme } from '@/style/theme';
import { Icon } from '@common/Icon/Icon';

interface InputProps {
  image?: string;
  setDisplayImage: (arg: string | null) => void;
  setUploadImage: (arg: File | null) => void;
  style?: CSSProperties;
}

export const InputImage = ({
  image,
  setDisplayImage,
  setUploadImage,
  ...props
}: InputProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImageChange = (uploadedFile: File) => {
    setDisplayImage(URL.createObjectURL(uploadedFile));
    setUploadImage(uploadedFile);
  };

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      setModalOpen(false);
    });

    return () => {
      document.removeEventListener('mousedown', () => {
        setModalOpen(false);
      });
    };
  }, []);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tagName = (e.target as HTMLElement).tagName;
    if (tagName === 'DIV') {
      setModalOpen(true);
    } else if (tagName === 'IMG') {
      setDisplayImage(null);
      setUploadImage(null);
    }
  };

  return (
    <>
      {image ? (
        <StImageContainer style={{ ...props.style }}>
          <StyledUpload>
            <StImage
              style={{ backgroundImage: `url(${image})`, ...props.style }}
              onClick={(e) => {
                handleClick(e);
              }}>
              <Icon
                name="x"
                showBackground={true}
              />
            </StImage>
          </StyledUpload>
        </StImageContainer>
      ) : (
        <StImageContainer style={{ ...props.style }}>
          <StyledUpload>
            <InputUpload
              name="image"
              onChange={handleImageChange}>
              <Icon name="plus" />
            </InputUpload>
          </StyledUpload>
        </StImageContainer>
      )}
      {isModalOpen && (
        <StModalBackdrop onClick={() => setModalOpen(false)}>
          <StModalContent onClick={(e) => e.stopPropagation()}>
            <img
              src={image}
              alt="Zoomed"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </StModalContent>
        </StModalBackdrop>
      )}
    </>
  );
};

const StModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1055;
`;

const StModalContent = styled.div`
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;

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
