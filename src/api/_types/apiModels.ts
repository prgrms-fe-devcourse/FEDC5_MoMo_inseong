export interface IUser {
  coverImage?: string; // 커버 이미지
  image?: string; // 프로필 이미지
  imagePublicId?: string;
  coverImagePublicId?: string;
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: IPost[] | string[]; //
  likes: ILike[]; //
  comments: string[] | [];
  followers: string[] | [];
  following: string[] | [];
  notifications: INotification[] | string[]; //
  messages: IMessage[] | string[]; //
  _id: string;
  fullName: string;
  username?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IChannel {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ILike {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  comment: string;
  author: IUser;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface INotification {
  seen: boolean;
  _id: string;
  author: IUser;
  user: IUser | string;
  post: string | null; // 포스트 id
  follow?: string; // 사용자 id
  comment?: IComment;
  message?: string; // 메시지 id
  like?: ILike;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  receiver: IUser;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

// export interface PostTitleCustomProps {
//   title: string;
//   status: 'Opened' | 'Scheduled' | 'Closed'; // 모집 중 | 모임 예정 | 모임 종료
//   tags: string[];
//   meetDate?: string;
//   cardId: string; // 포스트 _id
//   author: string; // Post author는 User 지만, 컴포넌트에 전달할땐 User.fullName을 줘야함!
//   isLiked: boolean; // 포스트 좋아요는 포스트 likes 중에서 user로 필터링해서 찾아야합니다
// }

// Post 모델

export interface IPost {
  likes?: ILike[];
  comments: IComment[] | string[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: IChannel | string;
  author: IUser | string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

//Post 모델 중 title 필드 커스텀값
export interface IPostTitleCustom {
  postTitle: string; // 타이틀1
  contents: string; // '본문'
  status: 'Opened' | 'Scheduled' | 'Closed'; // 모집 중 | 모임 예정 | 모임 종료
  tags: string[]; // ['tag1','tag2','tag3','tag4']
  mentions: IMentionedUser[]; // [{id: '23', fullName: 'MinSuKim'}]
  meetDate: string[]; // 변경 // 투표 시작,끝 날짜 ['2022-12-23 11:20:20TZ','2022-12-23 11:20:20TZ'])
  peopleLimit: number;

  vote: IVote[]; // [{id: 'dfnkdflad', votedDate: ['2022-12-23 11:20:20TZ','2022-12-23 11:20:20TZ']}] <== 날짜 아니라 타임테이블 배열 인덱스
  participants: string[]; // 이 모임에 참여(투표)한 사람들 id 배열


  // cardId: string; // 포스트 _id
  author: string; // 검색결과의 IPost에서 유저id가 author에옴.. 그래서 여기에서 저장해주는게 낫습니다.
  // isLiked: ILike[] | string[]; // 포스트 좋아요는 포스트 likes 중에서 user로 필터링해서 찾아야합니다
}

export interface IMentionedUser {
  _id: string;
  fullName: string;
}

interface IVotedUser {
  id: string;
  fullName: string;
}

export interface ITimeVote {
  [key: string]: IVotedUser[];
}

export interface IVote {
  [key: string]: ITimeVote;
}
