import { styled } from '@compiled/react';
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isBefore,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  addDays,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

const Root = styled.div({
  background: '#ffffff',
  border: '1px solid #e6e9f0',
  borderRadius: '16px',
  padding: '20px',
  width: '320px',
  flexShrink: 0,
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
});

const MonthLabel = styled.span({
  fontSize: '15px',
  fontWeight: 600,
  color: '#0b1733',
});

const NavBtn = styled.button({
  appearance: 'none',
  background: 'transparent',
  border: 0,
  padding: '6px',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#5b6478',
  display: 'inline-flex',
  '&:hover': { background: '#f0f2f7', color: '#0b1733' },
  '&:disabled': { opacity: 0.35, cursor: 'not-allowed' },
});

const WeekRow = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '2px',
  marginBottom: '4px',
});

const WeekLabel = styled.div({
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#9aa3b7',
  textAlign: 'center',
  padding: '6px 0',
  fontWeight: 600,
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '2px',
});

const DayDefault = styled.button({
  appearance: 'none',
  border: 0,
  background: 'transparent',
  padding: '10px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#0b1733',
  fontWeight: 500,
  transition: 'background 120ms ease, color 120ms ease',
  '&:hover': { background: '#f0f2f7' },
});

const DayMuted = styled.button({
  appearance: 'none',
  border: 0,
  background: 'transparent',
  padding: '10px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#c5cad8',
  fontWeight: 500,
  '&:hover': { background: '#f7f8fb' },
});

const DayDisabled = styled.button({
  appearance: 'none',
  border: 0,
  background: 'transparent',
  padding: '10px 0',
  borderRadius: '10px',
  cursor: 'not-allowed',
  fontSize: '14px',
  color: '#c5cad8',
  fontWeight: 500,
});

const DaySelected = styled.button({
  appearance: 'none',
  border: 0,
  background: '#0069ff',
  padding: '10px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: 600,
});

const DayToday = styled.button({
  appearance: 'none',
  border: 0,
  background: 'rgba(0, 105, 255, 0.1)',
  padding: '10px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#0069ff',
  fontWeight: 600,
  '&:hover': { background: 'rgba(0, 105, 255, 0.15)' },
});

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface CalendarProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  /** Predicate to decide if a date is bookable. Past dates are always blocked. */
  isDateAvailable?: (date: Date) => boolean;
}

export function Calendar({ selectedDate, onSelectDate, isDateAvailable }: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState<Date>(selectedDate ? startOfMonth(selectedDate) : startOfMonth(today));

  const days = useMemo(() => {
    const monthStart = startOfMonth(cursor);
    const monthEnd = endOfMonth(cursor);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const result: Date[] = [];
    let d = gridStart;
    while (d <= gridEnd) {
      result.push(d);
      d = addDays(d, 1);
    }
    return result;
  }, [cursor]);

  return (
    <Root>
      <Header>
        <NavBtn type="button" aria-label="Previous month" onClick={() => setCursor((c) => subMonths(c, 1))}>
          <ChevronLeft size={18} />
        </NavBtn>
        <MonthLabel>{format(cursor, 'MMMM yyyy')}</MonthLabel>
        <NavBtn type="button" aria-label="Next month" onClick={() => setCursor((c) => addMonths(c, 1))}>
          <ChevronRight size={18} />
        </NavBtn>
      </Header>
      <WeekRow>
        {WEEKDAY_LABELS.map((label) => (
          <WeekLabel key={label}>{label}</WeekLabel>
        ))}
      </WeekRow>
      <Grid>
        {days.map((d) => {
          const inMonth = isSameMonth(d, cursor);
          const isPast = isBefore(d, today);
          const available = !isPast && (isDateAvailable ? isDateAvailable(d) : true);
          const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
          const isToday = isSameDay(d, today);
          const dayNum = format(d, 'd');
          const onClick = () => available && onSelectDate(d);
          if (isSelected) {
            return (
              <DaySelected key={d.toISOString()} type="button" onClick={onClick}>
                {dayNum}
              </DaySelected>
            );
          }
          if (!available) {
            return (
              <DayDisabled key={d.toISOString()} type="button" disabled>
                {dayNum}
              </DayDisabled>
            );
          }
          if (isToday) {
            return (
              <DayToday key={d.toISOString()} type="button" onClick={onClick}>
                {dayNum}
              </DayToday>
            );
          }
          if (!inMonth) {
            return (
              <DayMuted key={d.toISOString()} type="button" onClick={onClick}>
                {dayNum}
              </DayMuted>
            );
          }
          return (
            <DayDefault key={d.toISOString()} type="button" onClick={onClick}>
              {dayNum}
            </DayDefault>
          );
        })}
      </Grid>
    </Root>
  );
}
