// import styled from '@emotion/styled';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useVotingTimeTable } from '../hooks/useVotingTimeTable';
import { IMyTimeTableRefs, MyTimeTable } from './MyTimeTable/MyTimeTable';
import {
  IVotedTimeTableRefs,
  VotedTimeTable,
} from './VotedTimeTable/VotedTimeTable';

interface IVotedUser {
  id: string;
  fullName: string;
}

interface ITimeVote {
  [key: string]: IVotedUser[];
}

export interface IVote {
  [key: string]: ITimeVote;
}

export interface TimeTableProps {
  meetDate: string[];
  vote: IVote;
  userId: string;
}

export const TimeTable = ({ meetDate, vote, userId }: TimeTableProps) => {
  const { dragAreaRef, dragItemsRef, voteItemsRef } = useVotingTimeTable({
    vote,
    userId,
  });

  const myTimeTableRef = useCallback(
    (node: IMyTimeTableRefs) => {
      if (node !== null) {
        node.dragAreaRef = dragAreaRef;
        node.dragItemsRef = dragItemsRef;
      }
    },
    [dragAreaRef, dragItemsRef],
  );

  const votedTimeTableRef = useCallback(
    (node: IVotedTimeTableRefs) => {
      if (node !== null) {
        node.voteItemsRef = voteItemsRef;
      }
    },
    [voteItemsRef],
  );

  return (
    <StContainer>
      <MyTimeTable
        ref={myTimeTableRef}
        meetDate={meetDate}
        vote={vote}
      />
      <VotedTimeTable
        ref={votedTimeTableRef}
        meetDate={meetDate}
        vote={vote}
      />
    </StContainer>
  );
};

// export const TimeTable = ({ meetDate }: TimeTableProps) => {
//   const { timeSlots, handleMouseDown, handleMouseEnter, handleMouseUp } =
//     useTimeTable({ meetDate });
//   const copy = useMemo(() => deepCopy(timeSlots as [][]), []);

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
//         {copy.length > 0 &&
//           copy.map((column, i) => (
//             <div
//               key={self.crypto.randomUUID()}
//               style={{ display: 'flex', flexDirection: 'column' }}>
//               {column.map((_, j) => (
//                 <div
//                   key={self.crypto.randomUUID()}
//                   data-col={i}
//                   data-row={j}
//                   onMouseDown={() => handleMouseDown(i, j)}
//                   onMouseEnter={() => handleMouseEnter(i, j)}
//                   onMouseUp={handleMouseUp}
//                   style={{
//                     width: '30px',
//                     height: '8px',
//                     border: '1px solid black',
//                   }}></div>
//               ))}
//             </div>
//           ))}
//       </div>
//       <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
//         {timeSlots.length > 0 &&
//           timeSlots.map((column, i) => (
//             <div
//               key={self.crypto.randomUUID()}
//               style={{ display: 'flex', flexDirection: 'column' }}>
//               {column.map(({ selected }, j) => (
//                 <div
//                   key={self.crypto.randomUUID()}
//                   data-col={i}
//                   data-row={j}
//                   style={{
//                     width: '30px',
//                     height: '8px',
//                     border: '1px solid black',
//                     background: `${selected ? 'blue' : 'white'}`,
//                   }}></div>
//               ))}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// const TimeTable: React.FC = () => {

//   return (
//     <div onMouseLeave={handleMouseUp}>
//       {timeSlots.map((selected, index) => (
//         <div
//           key={index}
//           onMouseDown={() => handleMouseDown(index)}
//           onMouseEnter={() => handleMouseEnter(index)}
//           onMouseUp={handleMouseUp}
//           style={{
//             width: '100px',
//             height: '20px',
//             background: selected ? 'blue' : 'gray',
//             cursor: 'pointer',
//           }}
//         >
//           {index % 2 === 0 ? `${index / 2}:00` : `${Math.floor(index / 2)}:30`}
//         </div>
//       ))}
//     </div>
//   );
// };

/* style */
const StContainer = styled.div`
  display: flex;
  gap: 16px;
`;
