import styled from '@emotion/styled';
import { useState } from 'react';
import { LIGHT_GREY } from '@/style/colorConstants';

interface ProfileProps {
  image: string;
  fullName: string;
  imageSize?: number;
  fontSize?: number;
  width?: number;
  _id: string;
  status: 'Profile' | 'ProfileImage' | 'ProfileName';
}

interface IImageStyle {
  image: string;
  imageSize: number;
}

export const Profile = ({
  image,
  fullName,
  imageSize = 48,
  fontSize = 18,
  _id,
  width = 300,
  status = 'Profile',
  ...props
}: ProfileProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: 링크 추가
  const handleUserClick = () => {
    console.log(_id);
  };

  return (
    <StProfileContainer
      width={width}
      onClick={handleUserClick}
      {...props}>
      {(status === 'Profile' || status === 'ProfileImage') && (
        <StProfileImage
          image={image}
          imageSize={imageSize}
          style={{ backgroundColor: isLoaded ? '' : LIGHT_GREY }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {(status === 'Profile' || status === 'ProfileName') && (
        <StProfileName fontSize={fontSize}>{fullName}</StProfileName>
      )}
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: ${({ width }) => width}px;
`;

const StProfileImage = styled.div<IImageStyle>`
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid ${LIGHT_GREY};
  width: ${({ imageSize }) => imageSize}px;
  height: ${({ imageSize }) => imageSize}px;
  transition: opacity 0.3s ease-in-out;
`;

const StProfileName = styled.span<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ fontSize }) => fontSize + 8}px;
`;
