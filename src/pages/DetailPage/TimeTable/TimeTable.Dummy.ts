interface IVotedUser {
  id: string;
  fullName: string;
}

interface ITimeVote {
  [key: string]: IVotedUser[];
}

const generateRandomUsers = (): IVotedUser[] => {
  const users = [];
  const userCount = Math.floor(Math.random() * 5) + 1; // 1~5 random users

  for (let i = 0; i < userCount; i++) {
    users.push({
      id: `user${i + 1}`,
      fullName: `User ${i + 1}`,
    });
  }

  return users;
};

const generateITimeVote = (): ITimeVote => {
  const ITimeVote: ITimeVote = {};

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeKey = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      ITimeVote[timeKey] = generateRandomUsers();
    }
  }

  return ITimeVote;
};

export const TimeTablePropsExample = {
  meetDate: ['2024-11-01', '2024-11-12', '2024-11-13', '2025-01-14'],
  vote: {
    '2024-11-01': generateITimeVote(),
    '2024-11-12': generateITimeVote(),
    '2024-11-13': generateITimeVote(),
    '2025-01-14': generateITimeVote(),
  },
  userId: 'user3',
};
