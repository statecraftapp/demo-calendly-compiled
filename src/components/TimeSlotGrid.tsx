import { styled } from '@compiled/react';
import { format } from 'date-fns';
import { colors, font } from '../tokens';

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
  color: colors.textPrimary,
});

const HeaderHint = styled.span({
  fontSize: '12px',
  color: colors.textFaint,
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '8px',
});

const Slot = styled.button({
  appearance: 'none',
  background: colors.bgCard,
  border: `1px solid ${colors.borderStrong}`,
  color: colors.primary,
  borderRadius: '10px',
  padding: '12px 10px',
  fontFamily: font.mono,
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'border-color 120ms ease, background 120ms ease, transform 60ms ease',
  '&:hover': { borderColor: colors.primary, background: colors.primaryTintSubtle },
  '&:active': { transform: 'translateY(1px)' },
});

const SlotSelected = styled.button({
  appearance: 'none',
  background: colors.primary,
  border: `1px solid ${colors.primary}`,
  color: '#ffffff',
  borderRadius: '10px',
  padding: '12px 10px',
  fontFamily: font.mono,
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
});

const Empty = styled.div({
  background: colors.bgSurface,
  border: `1px dashed ${colors.borderStrong}`,
  borderRadius: '12px',
  padding: '32px 16px',
  textAlign: 'center',
  color: colors.textMuted,
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
