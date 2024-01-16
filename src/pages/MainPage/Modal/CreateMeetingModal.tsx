import styled from '@emotion/styled';
import {
  HTMLAttributes,
  ReactElement,
  FormEvent as ReactFormEvent,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { scheduledChannelId, unscheduledChannelId } from '../channelId';
import { Calendar } from './Calendar';
import { Slider } from './Slider';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { createPost } from '@/_redux/slices/postSlices/getPostSlice';
import { putPost } from '@/_redux/slices/postSlices/putPostSlice';
import { getUserInfo } from '@/_redux/slices/userSlice';
import type { IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { createIVote } from '@/utils/createIVote';
import { getDatesBetween } from '@/utils/getDatesBetween';
import { Button, Icon, InputCompound, Spinner } from '@common/index';

interface CreateMeetingModalProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
  post?: IPost;
  dateToPass?: string;
}

interface IallUser {
  _id: string;
  fullName: string;
}
export const CreateMeetingModal = ({
  post,
  visible = false,
  onClose,
  dateToPass,
  ...props
}: CreateMeetingModalProps): ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.userInfo);
  const { allUsers } = useSelector((state) => state.allUsers);
  const { isLoading: isPostLoading, post: createdPost } = useSelector(
    (state) => state.getPostDetail,
  );
  const navigate = useNavigate();

  const [isCreated, setIsCreated] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [contents, setContents] = useState('');
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
  const [label, setLabel] = useState('');

  const [selectedMentionIndex, setSelectedMentionIndex] = useState<number>(-1);
  const today = new Date().toISOString().split('T')[0];

  const handleOnSubmit = (event: ReactFormEvent) => {
    event.preventDefault();
    if (user == null) return alert('로그인이 필요한 서비스입니다.');

    if (postTitle.trim().length === 0) {
      alert('제목을 입력해야 합니다.');
      return false;
    }
    if (contents.trim().length === 0) {
      alert('설명을 입력해야 합니다.');
      return false;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('투표 시작일은 투표 종료일보다 미래여야 합니다.');
      return false;
    }

    const meetDates = getDatesBetween(new Date(startDate), new Date(endDate));

    if (post) {
      const props = JSON.parse(post.title) as IPostTitleCustom;

      const updateTitleCustom: IPostTitleCustom = {
        postTitle,
        contents,
        status: 'Opened',
        tags: tags,
        mentions: mentions,
        meetDate: meetDates,
        peopleLimit: count,
        vote: createIVote(meetDates, props.vote),
        author: props.author,
        participants: props.participants,
      };

      const data = {
        postId: post._id,
        title: JSON.stringify(updateTitleCustom),
        image: uploadImage == null ? null : uploadImage,
        channelId:
          endDate === startDate ? scheduledChannelId : unscheduledChannelId,
        imageToDeletePublicId:
          displayImage === null && post.image !== null
            ? post.imagePublicId
            : '',
      };
      alert('수정이 완료 되었습니다.');
      void dispatch(putPost(data));
      if (onClose) onClose();
    } else {
      const postTitleCustom: IPostTitleCustom = {
        postTitle,
        contents,
        status: 'Opened',
        tags,
        mentions: mentions,
        meetDate: meetDates,
        peopleLimit: count,
        vote: createIVote(meetDates),
        author: user.fullName,
        participants: [],
      };

      const data = {
        title: JSON.stringify(postTitleCustom),
        image: uploadImage == null ? ('null' as const) : uploadImage,
        channelId:
          endDate === startDate ? scheduledChannelId : unscheduledChannelId,
      };
      alert('등록이 완료 되었습니다.');
      void dispatch(createPost(data));
      if (onClose) onClose();

      setIsCreated(true);
    }
  };

  const handleUserSelect = (selectedUser: IallUser) => {
    const isAlreadySelected = mentions.some(
      (mention) => mention._id === selectedUser._id,
    );

    if (isAlreadySelected) {
      setMentions((prevMentions) =>
        prevMentions.filter((mention) => mention._id !== selectedUser._id),
      );
    } else {
      setMentions((prevMentions) => [...prevMentions, selectedUser]);
    }

    setMentionInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredUsers.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedMentionIndex((prevIndex) =>
        prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedMentionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedMentionIndex !== -1) {
        handleUserSelect(filteredUsers[selectedMentionIndex]);
        setSelectedMentionIndex(-1);
      }
    }
  };

  useEffect(() => {
    if (isCreated && !isPostLoading) {
      navigate(`/details/${createdPost?._id}`);
    }
  }, [isCreated, isPostLoading]);

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

  useEffect(() => {
    if (visible) {
      if (post) {
        const { postTitle, contents, mentions, peopleLimit, tags, meetDate } =
          JSON.parse(post.title) as IPostTitleCustom;

        const [startDateISO, endDateISO]: string[] = [
          meetDate[0],
          meetDate[meetDate.length - 1],
        ].map((date) => date.toString());
        const startDateFormatted = startDateISO.split('T')[0];
        const endDateFormatted = endDateISO.split('T')[0];
        setPostTitle(postTitle);
        setContents(contents);
        setDisplayImage(post.image as string);
        setCount(peopleLimit);
        setStartDate(startDateFormatted);
        setEndDate(endDateFormatted);
        setMentions(mentions);
        setTags(tags);
        setLabel('수정하기');
      } else {
        const date = dateToPass?.split(' ')[0];
        setPostTitle('');
        setContents('');
        setStartDate(date || today);
        setEndDate(date || today);
        setMentionInput('');
        setFilteredUsers([]);
        setDisplayImage(null);
        setUploadImage(null);
        setCount(1);
        setMentions([]);
        setTags([]);
        setLabel('만들기');
      }
    }
  }, [dateToPass, visible, post]);

  if (isLoading) return <Spinner />;

  return (
    <StBackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <StModalContainer {...props}>
        <StClose>
          <Icon
            name="x"
            onIconClick={onClose}
          />
        </StClose>
        <StTitle>모임 {label}</StTitle>
        <StForm onSubmit={handleOnSubmit}>
          <InputCompound style={{ width: '350px' }}>
            <InputCompound.Text
              placeholder="제목"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </InputCompound>
          <InputCompound style={{ width: '350px' }}>
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
          </InputCompound>
          <StRangeContainer>
            <StRangeTitle>인원</StRangeTitle>
            <StRangeControl>
              <Slider
                defaultValue={count}
                onChange={(value) => setCount(value)}
              />
            </StRangeControl>
          </StRangeContainer>
          <StCalendarContainer>
            <Calendar
              title="투표 시작"
              value={startDate}
              onChange={(e) => {
                const value = e.target.value;
                setStartDate(value);
                if (new Date(value) > new Date(endDate)) {
                  setEndDate(value);
                }
              }}
            />
            <StDivider />
            <Calendar
              title="투표 끝"
              value={endDate}
              onChange={(e) => {
                const value = e.target.value;
                setEndDate(value);
                if (new Date(startDate) > new Date(value)) {
                  setStartDate(value);
                }
              }}
            />
          </StCalendarContainer>
          <StInputContainerWithDropdown>
            <InputCompound style={{ width: '350px' }}>
              <InputCompound.Text
                placeholder="멘션"
                value={mentionInput}
                onChange={(e) => setMentionInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={(e) => {
                  if (
                    e.key === 'Enter' &&
                    e.target instanceof HTMLInputElement
                  ) {
                    e.preventDefault();
                    const value = mentionInput.trim();
                    if (value) {
                      const user = filteredUsers.find(
                        ({ fullName }) => fullName === value,
                      );

                      if (user) {
                        setMentions((prev) => [
                          ...prev,
                          { fullName: user.fullName, _id: user._id },
                        ]);
                        setMentionInput('');
                      }
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
            </InputCompound>

            {mentionInput && filteredUsers.length > 0 && (
              <StFilteredUserList>
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    className={`user-item ${
                      index === selectedMentionIndex ? 'active' : ''
                    }`}>
                    {user.fullName}
                  </div>
                ))}
              </StFilteredUserList>
            )}
          </StInputContainerWithDropdown>

          <InputCompound style={{ width: '350px' }}>
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
          </InputCompound>

          <Button
            label={label}
            type="submit"
            handleButtonClick={handleOnSubmit}
          />
        </StForm>
      </StModalContainer>
    </StBackgroundDim>
  );
};

const StBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
  width: 500px;
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
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1001;
`;

const StTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-top: 35px;
  margin-bottom: 35px;
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

const StInputContainerWithDropdown = styled.div`
  position: relative;
  width: 350px;
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

  .user-item {
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.grey.bright};
    }

    &.active {
      background-color: ${theme.colors.grey.bright};
    }
  }
`;
