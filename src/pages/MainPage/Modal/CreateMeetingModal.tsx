import styled from '@emotion/styled';
import React, {
  HTMLAttributes,
  ReactElement,
  FormEvent as ReactFormEvent,
  useEffect,
  useState,
} from 'react';
import { Calendar } from './Calendar';
import { Slider } from './Slider';
import useClickAway from './UseClickAway';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { createPost } from '@/_redux/slices/postSlices/createPostSlice';
import { getUserInfo } from '@/_redux/slices/userSlice';
import type { IPostTitleCustom } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { getDatesBetween } from '@/utils/getDatesBetween';
import { Button } from '@common/Button/Button';
import { Icon } from '@common/Icon/Icon';
import { InputContainer } from '@common/Input/Input/InputContainer';
import { InputCompound } from '@common/Input/InputCompound';
import { Spinner } from '@common/Spinner/Spinner';

interface CreateMeetingModalProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
}

export const CreateMeetingModal = ({
  visible = false,
  onClose,
  ...props
}: CreateMeetingModalProps): ReactElement => {
  const dispatch = useDispatch();
  //FIXME: 에러핸들링 필요
  const { isLoading, user } = useSelector((state) => state.userInfo);
  const { channels } = useSelector((state) => state.channels);
  const [image, setImage] = useState<File | null>(null);
  const [count, setCount] = useState(1);
  const [mentions, setMentions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const modalRef = useClickAway(() => {
    if (onClose) onClose();
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const handleSliderChange = (value: number) => {
    setCount(value);
  };

  const handleOnSubmit = (event: ReactFormEvent) => {
    event.preventDefault();
    if (user == null) return alert('로그인이 필요한 서비스입니다.');

    if (event.target instanceof HTMLFormElement) {
      const postTitle = (
        event.target.elements.namedItem('postTitle') as HTMLInputElement
      ).value;
      const contents = (
        event.target.elements.namedItem('contents') as HTMLInputElement
      ).value;
      const undetermined = (
        event.target.elements.namedItem('undetermined') as HTMLInputElement
      ).value;
      const startDate = (
        event.target.elements.namedItem('start') as HTMLInputElement
      ).value;
      const endDate = (
        event.target.elements.namedItem('end') as HTMLInputElement
      ).value;

      // 커스텀필드
      const postTitleCustom: IPostTitleCustom = {
        postTitle,
        contents,
        status: undetermined === 'on' ? 'Opened' : 'Scheduled',
        tags,
        mentions: mentions.map((fullName) => ({ _id: 'dummy', fullName })),
        meetDate: getDatesBetween(new Date(startDate), new Date(endDate)),
        peopleLimit: count,
        vote: [],
        author: user.fullName,
      };

      const data = {
        title: JSON.stringify(postTitleCustom),
        image: image == null ? ('null' as const) : image,
        channelId:
          endDate == null
            ? (channels.find(({ name }) => name === '언제 모일까?')
                ?._id as string)
            : (channels.find(({ name }) => name === '이날 모일래?')
                ?._id as string),
      };

      void dispatch(createPost(data));
    }
  };

  useEffect(() => {
    if (user == null) {
      void dispatch(getUserInfo());
    }
  }, []);

  if (isLoading) return <Spinner />;

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
        <StForm onSubmit={handleOnSubmit}>
          <InputContainer>
            <InputCompound.Text
              placeholder="제목"
              name="postTitle"
            />
          </InputContainer>
          <InputContainer>
            <InputCompound.TextArea
              placeholder="설명"
              name="contents"
            />
            <InputCompound.Image setImage={(arg) => setImage(arg)} />
          </InputContainer>
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
            <Calendar
              title="시작"
              name="start"
            />
            <StDivider />
            <Calendar
              title="끝"
              name="end"
            />
            <StCheckboxContainer>
              <StCheckbox
                type="checkbox"
                name="undetermined"
              />
              <StCheckboxLabel>미정</StCheckboxLabel>
            </StCheckboxContainer>
          </StCalendarContainer>
          <InputContainer>
            <InputCompound.Text
              placeholder="멘션"
              onKeyUp={(e) => {
                if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                  const value = e.target.value;
                  setMentions((prev) => [...prev, value]);
                  e.target.value = '';
                }
              }}
            />
            <InputCompound.Tags
              tags={mentions}
              setTags={(arg) => setMentions(arg)}
            />
          </InputContainer>
          <InputContainer>
            <InputCompound.Text
              placeholder="태그"
              onKeyUp={(e) => {
                if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                  const value = e.target.value;
                  setTags((prev) => [...prev, value]);
                  e.target.value = '';
                }
              }}
            />
            <InputCompound.Tags
              tags={tags}
              setTags={(arg) => setTags(arg)}
            />
          </InputContainer>
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

const StForm = styled.form`
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
