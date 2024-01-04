const dummyMentionUser = Array(20)
  .fill('user')
  .map((v, i) => {
    return {
      _id: i + '',
      fullName: v + (i + 1) + '',
    };
  });

export const DUMMY_DATA = {
  // meetDescription
  title: '인성팀 모딥다 몇시?',
  createdAt: '2023-12-31 12:34',
  image: 'https://avatars.githubusercontent.com/u/85001878?v=4',
  author: '타래야 간식먹자',
  _id: '1234',
  imageSize: 36,
  fontSize: 16,

  // tab
  labelPost: '본문',
  labelTimeTable: '타임 테이블',
  tabWidth: 480, // 1024 - 64(양쪽 padding) = 960 / 2 = 480
  isJustify: true,
  handleTabClick: () => {
    console.log(DUMMY_DATA.labelPost);
  },

  // PostContainer
  contents: `냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹 냐옹냐옹\n냐옹\n 냐옹\n  냐옹\n냐옹\n냐옹\n냐옹\n            냐옹\n냐옹\n냐옹\n냐옹`,
  // image, 여기서도 사용 함.
  tags: ['보드게임', '치킨', '모각코'],
  mentions: dummyMentionUser,

  // Comment
  isMine: true,
};
