import { ITimeVote, IVote } from '@/api/_types/apiModels';

export const createIVote = (meetDates: string[], voted?: IVote) => {
  const result: IVote = {};

  for (const meetDate of meetDates) {
    const date = meetDate.split('T')[0];

    if (voted && date in voted) {
      result[date] = voted[date];
      continue;
    }

    result[date] = {} as ITimeVote;

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        result[date][timeSlot] = [];
      }
    }
  }
  return result;
};
