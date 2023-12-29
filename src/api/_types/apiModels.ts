export type UserType = {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: PostType[];
  likes: LikeType[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: NotificationType[];
  messages: MessageType[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

// export type FollowInfoType = {
//   _id: string;
//   user: string;
//   follower: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

export type ChannelType = {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type PostType = {
  likes: LikeType[];
  comments: CommentType[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
};

export type LikeType = {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
};

export type CommentType = {
  _id: string;
  comment: string;
  author: UserType;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
};

export type NotificationType = {
  seen: boolean;
  _id: string;
  author: UserType;
  user: UserType | string;
  post: string | null; // 포스트 id
  follow?: string; // 사용자 id
  comment?: CommentType;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
};

export type MessageType = {
  _id: string;
  message: string;
  sender: UserType;
  receiver: UserType;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
};

export type postType = {
  title: string;
  image: BinaryData | null;
  channelId: string;
} & FormData;

export interface PostTitleCustomProps {
  title: string;
  status: 'Opened' | 'Scheduled' | 'Closed'; // 모집 중 | 모임 예정 | 모임 종료
  tags: string[];
  meetDate?: string;
  cardId: string; // 포스트 _id
  author: string; // Post author는 User 지만, 컴포넌트에 전달할땐 User.fullName을 줘야함!
  isLiked: boolean; // 포스트 좋아요는 포스트 likes 중에서 user로 필터링해서 찾아야합니다
}
