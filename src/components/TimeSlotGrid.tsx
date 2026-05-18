import { styled } from '@compiled/react';
import { format } from 'date-fns';

const Wrap = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
});

const HeaderTitle = styled.h3({
  fontSize: '15px',
  fontWeight: 700,
  color: '#0b1733',
});

const HeaderHint = styled.span({
  fontSize: '12px',
  color: '#9aa3b7',
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '8px',
});

const Slot = styled.button({
  appearance: 'none',
  background: '#ffffff',
  border: '1px solid #d6dbe6',
  color: '#0069ff',
  borderRadius: '10px',
  padding: '12px 10px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'border-color 120ms ease, background 120ms ease, transform 60ms ease',
  '&:hover': { borderColor: '#0069ff', background: 'rgba(0, 105, 255, 0.04)' },
  '&:active': { transform: 'translateY(1px)' },
});

const SlotSelected = styled.button({
  appearance: 'none',
  background: '#0069ff',
  border: '1px solid #0069ff',
  color: '#ffffff',
  borderRadius: '10px',
  padding: '12px 10px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
});

const Empty = styled.div({
  background: '#f7f8fb',
  border: '1px dashed #d6dbe6',
  borderRadius: '12px',
  padding: '32px 16px',
  textAlign: 'center',
  color: '#5b6478',
  fontSize: '14px',
});

export interface TimeSlotGridProps {
  date: Date | null;
  slots: Date[];
  selected: Date | null;
  onPick: (slot: Date) => void;
}

export function TimeSlotGrid({ date, slots, selected, onPick }: TimeSlotGridProps) {
  return (
    <Wrap>
      <Header>
        <HeaderTitle>
          {date ? format(date, 'EEEE, MMM d') : 'Pick a date'}
        </HeaderTitle>
        {date ? <HeaderHint>{slots.length} slots</HeaderHint> : null}
      </Header>
      {!date ? (
        <Empty>Choose a date on the calendar to see open times.</Empty>
      ) : slots.length === 0 ? (
        <Empty>No availability on this day. Try another date.</Empty>
      ) : (
        <Grid>
          {slots.map((s) => {
            const isSelected = selected ? +selected === +s : false;
            const label = format(s, 'h:mm a');
            return isSelected ? (
              <SlotSelected key={s.toISOString()} type="button" onClick={() => onPick(s)}>
                {label}
              </SlotSelected>
            ) : (
              <Slot key={s.toISOString()} type="button" onClick={() => onPick(s)}>
                {label}
              </Slot>
            );
          })}
        </Grid>
      )}
    </Wrap>
  );
}
