import styled from '@emotion/styled';

interface CalendarProps {
  title: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Calendar = ({ title, value, onChange }: CalendarProps) => {
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
        min={today}
        max={nextYear}
        value={value}
        onChange={onChange}
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
