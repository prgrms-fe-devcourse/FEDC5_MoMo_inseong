import styled from '@emotion/styled';
import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/style/theme';

interface ProfileProps {
  image: string;
  fullName: string;
  imageSize?: number;
  fontSize?: number;
  _id: string;
  status?: 'Profile' | 'ProfileImage' | 'ProfileName';
  maxWidth?: number;
  style?: CSSProperties;
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
  status = 'Profile',
  maxWidth = 300,
  ...props
}: ProfileProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // TODO: 링크 추가
  const handleUserClick = () => {
    navigate(`/profile/${_id}`);
  };

  return (
    <StProfileContainer
      onClick={handleUserClick}
      {...props}
      style={{ ...props.style }}>
      {(status === 'Profile' || status === 'ProfileImage') && (
        <StProfileImage
          image={image}
          imageSize={imageSize}
          style={{ backgroundColor: isLoaded ? '' : theme.colors.grey.light }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {(status === 'Profile' || status === 'ProfileName') && (
        <StProfileName
          fontSize={fontSize}
          maxWidth={maxWidth}>
          {fullName}
        </StProfileName>
      )}
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StProfileImage = styled.div<IImageStyle>`
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid ${theme.colors.grey.light};
  width: ${({ imageSize }) => imageSize}px;
  height: ${({ imageSize }) => imageSize}px;
  transition: opacity 0.3s ease-in-out;
`;

const StProfileName = styled.span<{ fontSize: number; maxWidth: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ fontSize }) => fontSize + 8}px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
