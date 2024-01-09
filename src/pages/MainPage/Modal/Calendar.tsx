import styled from '@emotion/styled';

interface CalendarProps {
  title: string;
}

export const Calendar = ({ title }: CalendarProps) => {
  const today = new Date().toISOString().split('T')[0];

  const nextYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  )
    .toISOString()
    .split('T')[0];

  return (
    <StCalendarForm>
      <StCalendarTitle>{title}</StCalendarTitle>
      <StCalendar
        type="date"
        defaultValue={today}
        min={today}
        max={nextYear}
      />
    </StCalendarForm>
  );
};

const StCalendarForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 150px;
  cursor: pointer;
`;
const StCalendarTitle = styled.div``;
const StCalendar = styled.input`
  cursor: pointer;
`;
