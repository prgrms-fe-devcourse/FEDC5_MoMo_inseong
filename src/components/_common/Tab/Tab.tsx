import styled from '@emotion/styled';
import { theme } from '@/style/theme';

export interface TabProps {
  label: string;
  width: number;
  isActive: boolean;
  isJustify?: boolean;
  handleTabClick?: () => void;
}
export const Tab = ({
  label,
  width,
  isActive,
  isJustify = true,
  handleTabClick = () => '',
  ...props
}: TabProps) => {
  return (
    <StTabContainer
      width={width}
      isActive={isActive}
      isJustify={isJustify}
      onClick={handleTabClick}
      {...props}>
      {label}
    </StTabContainer>
  );
};

const StTabContainer = styled.div<{
  width: number;
  isActive: boolean;
  isJustify: boolean;
}>`
  width: ${({ width }) => width}px;
  height: 32px;
  font-size: 14px;
  border-bottom: 1px solid
    ${({ isActive }) =>
      isActive ? theme.colors.secondaryNavy.default : theme.colors.grey.light};
  color: ${({ isActive }) => (isActive ? 'black' : theme.colors.grey.dark)};
  display: flex;
  justify-content: ${({ isJustify }) => isJustify && 'center'};
  align-items: center;
  box-sizing: content-box;

  &:hover {
    cursor: pointer;
    color: black;
  }
`;
