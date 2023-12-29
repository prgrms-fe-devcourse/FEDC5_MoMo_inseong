import styled from '@emotion/styled';
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
