export const cardDetailDummy = {
  postTitle: '제목제목',
  contents: '본문',
  status: 'Opened' as const,
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  mentions: [{ _id: '23', fullName: 'MinSuKim' }],
  meetDate: ['2022-12-23 11:20:20TZ', '2022-12-23 11:20:20TZ'],
  peopleLimit: 8,

  vote: [
    {
      id: '5465656',
      fullName: '이이름',
      votedDate: ['2022-12-23 11:20:20TZ', '2022-12-23 11:20:20TZ'],
    },
  ],

  cardId: '12313121',
  author: 'ㅇㅈ',
  isLiked: true,
};
