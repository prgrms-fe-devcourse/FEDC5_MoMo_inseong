import styled from '@emotion/styled';
import React, { HTMLAttributes, ReactElement, useState } from 'react';
import { Calendar } from './Calendar';
import { Slider } from './Slider';
import useClickAway from './UseClickAway';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { Input } from '@common/Input/Input';

interface CreateMeetingModalProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
}

export const CreateMeetingModal = ({
  visible = false,
  onClose,
  ...props
}: CreateMeetingModalProps): ReactElement => {
  const [count, setCount] = useState(1);

  const modalRef = useClickAway(() => {
    if (onClose) onClose();
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const handleSliderChange = (value: number) => {
    setCount(value);
  };

  return (
    <StBackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <StClose>
        <Icon
          name="x"
          showBackground={true}
        />
      </StClose>
      <StModalContainer
        ref={modalRef}
        {...props}>
        <StTitle>모임</StTitle>
        <StForm>
          <Input
            placeholder="제목"
            width={400}
          />
          <Input
            placeholder="설명"
            width={400}
            hasImage={true}
            isTextarea={true}
          />
          <StRangeContainer>
            <StRangeTitle>인원</StRangeTitle>
            <StRangeControl>
              <Slider
                defaultValue={count}
                onChange={handleSliderChange}
              />
            </StRangeControl>
          </StRangeContainer>
          <StCalendarContainer>
            <Calendar title="시작" />
            <StDivider />
            <Calendar title="끝" />
            <StCheckboxContainer>
              <StCheckbox type="checkbox" />
              <StCheckboxLabel>미정</StCheckboxLabel>
            </StCheckboxContainer>
          </StCalendarContainer>
          <Input
            placeholder="멘션"
            hasTags={true}
          />
          <Input
            placeholder="태그"
            hasTags={true}
          />
          <Button label="만들기" />
        </StForm>
      </StModalContainer>
    </StBackgroundDim>
  );
};

const StBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StModalContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  top: 50%;
  left: 50%;
  height: 85%;
  width: 32%;
  border-radius: 8px;

  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StClose = styled.div`
  position: fixed;
  top: 9%;
  left: 64%;
  cursor: pointer;
  z-index: 1001;
`;

const StTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StForm = styled.div`
  width: 400px;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

const StRangeContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
`;

const StRangeTitle = styled.div`
  flex: none;
  margin-left: 24px;
  margin-right: 24px;
`;

const StRangeControl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const StCalendarContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
`;

const StDivider = styled.div`
  height: 40px;
  width: 1px;
  background-color: ${theme.colors.grey.dark};
  transform: rotate(15deg);
`;

const StCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StCheckbox = styled.input`
  width: 24px;
  height: 24px;
  background-color: ${theme.colors.primaryBlue};
  color: white;
  margin-right: 8px;
  border-radius: 8px;
`;

const StCheckboxLabel = styled.span`
  font-size: 16px;
  color: ${theme.colors.primaryBlue};
`;
