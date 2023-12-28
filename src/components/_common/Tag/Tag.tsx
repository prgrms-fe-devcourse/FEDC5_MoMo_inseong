import styled from '@emotion/styled';
import { useState } from 'react';
import { BEIGE } from '@/style/colorConstants';

interface TagProps {
  name: string;
  height?: number;
  backgroundColor?: string;
  fontSize?: number;
  borderRadius?: number;
  padding?: number;
  marginRight?: number;
}

interface ITagStyle {
  height: number;
  backgroundColor: string;
  fontSize: number;
  borderRadius: number;
  padding: number;
  marginRight: number;
  BEIGE: string;
}

export const Tag = ({
  name,
  height = 32,
  backgroundColor = '#7954DA',
  fontSize = 12,
  borderRadius = 16,
  padding = 16,
  marginRight = 8,
}: TagProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteClick = () => {
    setIsVisible((prev) => !prev);
  };

  if (!isVisible) return null;

  const tagStyle = {
    height,
    backgroundColor,
    fontSize,
    borderRadius,
    padding,
    marginRight,
    BEIGE,
  };

  return (
    <StTagContainer>
      <StTag {...tagStyle}>{`#${name}`}</StTag>

      {/* 아래 span 지우고, Icon 컴포넌트 name으로 X 를 넣을 것. */}
      <span onClick={handleDeleteClick}>X</span>
    </StTagContainer>
  );
};

const StTagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StTag = styled.div<ITagStyle>`
  height: ${({ height }) => height}px;

  color: ${({ BEIGE }) => BEIGE};
  background-color: #7954da;

  font-size: ${({ fontSize }) => fontSize}px;
  letter-spacing: 0.96px;

  border: none;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  padding: 2px ${({ padding }) => padding}px;
  margin-right: ${({ marginRight }) => marginRight}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
