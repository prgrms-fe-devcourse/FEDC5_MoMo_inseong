import styled from '@emotion/styled';
import { DARK_GREY, LIGHT_GREY, SECONDARY_NAVY } from '@/style/colorConstants';

export interface TabProps {
  label: string;
  width: number;
  isActive: boolean;
  isJustify: boolean;
  handleTabClick?: () => void;
}
export const Tab = ({
  label,
  width,
  isActive,
  isJustify,
  handleTabClick,
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
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? SECONDARY_NAVY : LIGHT_GREY)};
  color: ${({ isActive }) => (isActive ? 'black' : DARK_GREY)};
  display: flex;
  justify-content: ${({ isJustify }) => isJustify && 'center'};
  align-items: center;
  box-sizing: content-box;

  &:hover {
    cursor: pointer;
    color: black;
  }
`;
