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
import { getUserInfo } from '@/_redux/slices/userSlice';
import type { IPostTitleCustom } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { createIVote } from '@/utils/createIVote';
import { getDatesBetween } from '@/utils/getDatesBetween';
import { Button } from '@common/Button/Button';
import { InputContainer } from '@common/Input/Input/InputContainer';
import { InputCompound } from '@common/Input/InputCompound';
import { Spinner } from '@common/Spinner/Spinner';

interface CreateMeetingModalProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
}

interface IallUser {
  _id: string;
  fullName: string;
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
  const { allUsers } = useSelector((state) => state.allUsers);

  const [postTitle, setPostTitle] = useState('');
  const [contents, setContents] = useState('');
  const [isUndetermined, setIsUndetermined] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mentionInput, setMentionInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IallUser[]>([]);

  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const [allUserList, setAllUserList] = useState<IallUser[]>([]);
  const [count, setCount] = useState(1);
  const [mentions, setMentions] = useState<IallUser[]>([]);
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

    const meetDates = getDatesBetween(new Date(startDate), new Date(endDate));

    if (event.target instanceof HTMLFormElement) {
      // 커스텀필드
      const postTitleCustom: IPostTitleCustom = {
        postTitle,
        contents,
        status: isUndetermined ? 'Opened' : 'Scheduled',
        tags,
        mentions: mentions,
        meetDate: meetDates,
        peopleLimit: count,
        vote: createIVote(meetDates),
        author: user.fullName,
      };

      const data = {
        title: JSON.stringify(postTitleCustom),
        image: uploadImage == null ? ('null' as const) : uploadImage,
        channelId:
          endDate === startDate
            ? (channels.find(({ name }) => name === '이날모일래')
                ?._id as string)
            : (channels.find(({ name }) => name === '언제모일까')
                ?._id as string),
      };
      console.log(data);
      // void dispatch(createPost(data));
    }
  };

  useEffect(() => {
    if (user == null) {
      void dispatch(getUserInfo());
    }
  }, []);

  useEffect(() => {
    const updatedUserList = allUsers.map((user) => ({
      _id: user._id,
      fullName: user.username ? user.username : user.fullName,
    }));

    setAllUserList(updatedUserList);
  }, [allUsers]);

  useEffect(() => {
    const filtered = allUserList.filter(
      (user) =>
        user.fullName.toLowerCase().includes(mentionInput.toLowerCase()) &&
        !mentions.some((mention) => mention._id === user._id),
    );
    setFilteredUsers(filtered);
  }, [mentionInput, allUserList, mentions]);

  if (isLoading) return <Spinner />;

  return (
    <StBackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <StClose>
        {/* TODO: 추후 수정 */}
        {/* <Icon
          name="x"
          showBackground={true}
        /> */}
      </StClose>
      <StModalContainer
        ref={modalRef}
        {...props}>
        <StTitle>모임</StTitle>
        <StForm onSubmit={handleOnSubmit}>
          <InputContainer style={{ width: '350px' }}>
            <InputCompound.Text
              placeholder="제목"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </InputContainer>
          <InputContainer style={{ width: '350px' }}>
            <InputCompound.TextArea
              placeholder="설명"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
            <InputCompound.Image
              image={displayImage || ''}
              setDisplayImage={setDisplayImage}
              setUploadImage={setUploadImage}
            />
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <StDivider />
            <Calendar
              title="끝"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <StCheckboxContainer>
              <StCheckbox
                type="checkbox"
                checked={isUndetermined}
                onChange={() => setIsUndetermined(!isUndetermined)}
              />
              <StCheckboxLabel>미정</StCheckboxLabel>
            </StCheckboxContainer>
          </StCalendarContainer>
          <StInputContainerWithDropdown>
            <InputContainer style={{ width: '350px' }}>
              <InputCompound.Text
                placeholder="멘션"
                value={mentionInput}
                onChange={(e) => setMentionInput(e.target.value)}
                onKeyUp={(e) => {
                  if (
                    e.key === 'Enter' &&
                    e.target instanceof HTMLInputElement
                  ) {
                    const value = e.target.value;
                    const user = filteredUsers.find(
                      ({ fullName }) => fullName === value,
                    );

                    if (user) {
                      setMentions((prev) => [
                        ...prev,
                        { fullName: user.fullName, _id: user._id },
                      ]);
                      e.target.value = '';
                    }
                  }
                }}
              />

              <InputCompound.Tags
                tags={mentions.map((mention) => mention.fullName)}
                setTags={(newTags) => {
                  const updatedMentions = newTags.map((tagName) => {
                    return (
                      mentions.find(
                        (mention) => mention.fullName === tagName,
                      ) || { _id: '', fullName: tagName }
                    );
                  });
                  setMentions(updatedMentions);
                }}
                onTagRemove={(tagName) => {
                  const mentionToRemove = mentions.find(
                    (mention) => mention.fullName === tagName,
                  );
                  if (mentionToRemove) {
                    setMentions(
                      mentions.filter(
                        (mention) => mention._id !== mentionToRemove._id,
                      ),
                    );
                  }
                }}
              />
            </InputContainer>

            {mentionInput && (
              <StFilteredUserList>
                {filteredUsers.map((user) => (
                  <div key={user._id}>{user.fullName}</div>
                ))}
              </StFilteredUserList>
            )}
          </StInputContainerWithDropdown>

          <InputContainer style={{ width: '350px' }}>
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  top: 50%;
  left: 50%;
  height: 85%;
  width: 450px;
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
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

const StRangeContainer = styled.div`
  width: 100%;
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

const StFilteredUserList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
  padding: 10px 0;
  margin-top: 2px;
  box-sizing: border-box;
`;

const StInputContainerWithDropdown = styled.div`
  position: relative;
  width: 350px;
`;
