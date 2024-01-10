import styled from '@emotion/styled';
import { IPost, IPostTitleCustom, IUser } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { Profile } from '@common/Profile/Profile';

interface IResData {
  postTitle: string;
  createdAt: string;
  image: string;
  _id: string;
  username: string;
  fullName: string;
}

type DetailMeetDescriptionType = {
  response: IPost;
};

export const DetailMeetDescription = ({
  response,
}: DetailMeetDescriptionType) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const responseTitle = JSON.parse(response.title) as IPostTitleCustom;
  const responseAuthor = response.author as IUser;
  const resData: IResData = {
    postTitle: responseTitle.postTitle,
    createdAt: formatDate(responseAuthor.createdAt),
    image: responseAuthor?.image || '',
    _id: responseAuthor._id,
    username: responseAuthor?.username ? responseAuthor.username : '',
    fullName: responseAuthor.fullName,
  };

  return (
    <>
      <StMeetDescription>
        <StMeetInformation>
          <span>{resData.postTitle}</span>
          <span>{resData.createdAt}</span>
        </StMeetInformation>
        <Profile
          image={resData.image}
          _id={resData._id}
          fullName={resData.username || resData.fullName}
          fontSize={16}
          imageSize={32}
          status="Profile"
        />
      </StMeetDescription>
    </>
  );
};

const StMeetDescription = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StMeetInformation = styled.div`
  max-width: 70%;

  & > span {
    display: block;
    margin: 4px 0;
  }
  & span:first-of-type {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 18px;
  }
  & span:last-child {
    font-size: 16px;
    color: ${theme.colors.grey.default};
  }
`;
