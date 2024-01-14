import styled from '@emotion/styled';
import { theme } from '@/style/theme';

interface TagProps {
  name: string;
  height?: number;
  fontSize?: number;
  padding?: number;
  marginRight?: number;
  color?: string;
  hasMouseCursor?: boolean;
  backgroundColor?: string;
}

type StTagType = Required<Omit<TagProps, 'name'>>;

export const Tag = ({
  name,
  height = 32,
  fontSize = 12,
  padding = 12,
  marginRight = 8,
  color = theme.colors.secondaryNavy.default,
  hasMouseCursor = false,
  backgroundColor = theme.colors.grey.light,
}: TagProps) => {
  const tagStyle = {
    height,
    fontSize,
    padding,
    marginRight,
    color,
    hasMouseCursor,
    backgroundColor,
  };

  return (
    <StTagContainer>
      {name && <StTag {...tagStyle}>{name}</StTag>}
    </StTagContainer>
  );
};

const StTagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StTag = styled.div<StTagType>`
  display: flex;
  align-items: center;
  height: ${({ height }) => height}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  padding: 2px ${({ padding }) => padding}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ height }) => height}px;
  letter-spacing: 0.96px;
  color: ${({ color }) => color};
  cursor: ${({ hasMouseCursor }) => (hasMouseCursor ? 'pointer' : 'inherit')};
`;
