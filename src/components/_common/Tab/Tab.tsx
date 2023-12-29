import styled from '@emotion/styled';
import { LIGHT_GREY, SECONDARY_NAVY } from '@/style/colorConstants';

export interface TabProps {
  label: string;
  width: number;
  isActive: boolean;
  justify: boolean;
  handleTabClick: () => void;
}
export const Tab = ({
  label,
  width,
  isActive,
  justify,
  handleTabClick,
}: TabProps) => {
  return (
    <StTabContainer
      width={width}
      isActive={isActive}
      justify={justify}
      onClick={handleTabClick}>
      {label}
    </StTabContainer>
  );
};

const StTabContainer = styled.div<{
  width: number;
  isActive: boolean;
  justify: boolean;
}>`
  width: ${({ width }) => width}px;
  height: 32px;
  font-size: 14px;
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? SECONDARY_NAVY : LIGHT_GREY)};
  color: black;
  display: flex;
  justify-content: ${({ justify }) => justify && 'center'};
  align-items: center;
  box-sizing: content-box;
`;
