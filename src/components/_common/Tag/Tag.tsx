import styled from '@emotion/styled';
import { SECONDARY_NAVY } from '@/style/colorConstants';

interface TagProps {
  name: string;
  height?: number;
  fontSize?: number;
  padding?: number;
  marginRight?: number;
  color?: string;
  hasMouseCursor?: boolean;
}

interface IStTag {
  height: number;
  fontSize: number;
  padding: number;
  marginRight: number;
  color?: string;
  hasMouseCursor?: boolean;
}

export const Tag = ({
  name,
  height = 32,
  fontSize = 12,
  padding = 16,
  marginRight = 8,
  color = SECONDARY_NAVY,
  hasMouseCursor = false,
}: TagProps) => {
  const tagStyle = {
    height,
    fontSize,
    padding,
    marginRight,
    color,
    hasMouseCursor,
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

const StTag = styled.div<IStTag>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  padding: 2px ${({ padding }) => padding}px;
  border: ${({ color }) => color} 1px solid;
  border-radius: 8px;
  font-size: ${({ fontSize }) => fontSize}px;
  letter-spacing: 0.96px;
  color: ${({ color }) => color};
  cursor: ${({ hasMouseCursor }) => (hasMouseCursor ? 'pointer' : 'default')};
`;
