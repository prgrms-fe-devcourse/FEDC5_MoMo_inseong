import styled from "@emotion/styled";
import { useState } from "react";

interface ProfileProps {
  image: string;
  fullName: string;
  imageSize?: number;
  fontSize?: number;
  _id: string;
}

export const Profile = ({
  image,
  fullName,
  imageSize = 48,
  fontSize = 18,
  _id
}: ProfileProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: 링크 추가
  const handleUserClick = () => {
    console.log(_id)
  }

  return (
    <StProfileContainer imageSize={imageSize}>
      <StProfileImage
        image={image}
        size={imageSize}
        style={{ opacity: isLoaded ? 0 : 1 }}
        onLoad={() => setIsLoaded(true)}
      />
      <StProfileName 
        fontSize={fontSize} 
        onClick={handleUserClick}>
          {fullName}
      </StProfileName>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div<{ imageSize: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// TODO: border-color 수정
const StProfileImage = styled.div<{ image: string; size: number }>`
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid #EDEDED;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  transition: opacity 0.3s ease-in-out;
`;

const StProfileName = styled.span<{ fontSize: number }>`
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;