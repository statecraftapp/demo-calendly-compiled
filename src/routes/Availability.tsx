import { styled } from '@compiled/react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useStore, setAvailability } from '../store/yamlStore';
import type { AvailabilitySlot } from '../store/types';
import type React from 'react';
import { useMemo, useState } from 'react';

const WEEKDAYS: { weekday: AvailabilitySlot['weekday']; label: string }[] = [
  { weekday: 0, label: 'Sunday' },
  { weekday: 1, label: 'Monday' },
  { weekday: 2, label: 'Tuesday' },
  { weekday: 3, label: 'Wednesday' },
  { weekday: 4, label: 'Thursday' },
  { weekday: 5, label: 'Friday' },
  { weekday: 6, label: 'Saturday' },
];

const Table = styled.div({
  background: '#ffffff',
  border: '1px solid #e6e9f0',
  borderRadius: '16px',
  overflow: 'hidden',
});

const Row = styled.div({
  display: 'grid',
  gridTemplateColumns: '140px 1fr 1fr 80px',
  alignItems: 'center',
  gap: '16px',
  padding: '14px 20px',
  borderBottom: '1px solid #f0f2f7',
  '&:last-child': { borderBottom: 0 },
});

const DayLabel = styled.div({
  fontSize: '14px',
  fontWeight: 600,
  color: '#0b1733',
});

const TimeField = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const TimeLabel = styled.span({
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#9aa3b7',
  fontWeight: 600,
});

const TimeInput = styled.input({
  appearance: 'none',
  border: '1px solid #d6dbe6',
  borderRadius: '10px',
  padding: '8px 10px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: '14px',
  color: '#0b1733',
  outline: 'none',
  background: '#ffffff',
  '&:focus': {
    borderColor: '#0069ff',
    boxShadow: '0 0 0 3px rgba(0, 105, 255, 0.15)',
  },
  '&:disabled': { background: '#f7f8fb', color: '#9aa3b7' },
});

const ToggleLabel = styled.label({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '12px',
  color: '#5b6478',
  cursor: 'pointer',
  justifySelf: 'end',
});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '20px',
});

function minsToHHMM(m: number): string {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
function hhmmToMins(s: string): number {
  const [h, m] = s.split(':').map((v) => parseInt(v, 10));
  return (h || 0) * 60 + (m || 0);
}

interface DayState {
  enabled: boolean;
  startMin: number;
  endMin: number;
}

export function Availability() {
  const stored = useStore((s) => s.availability);
  const byDay = useMemo(() => {
    const m = new Map<number, AvailabilitySlot>();
    for (const a of stored) m.set(a.weekday, a);
    return m;
  }, [stored]);

  const [draft, setDraft] = useState<DayState[]>(() =>
    WEEKDAYS.map((w) => {
      const a = byDay.get(w.weekday);
      return {
        enabled: !!a,
        startMin: a?.startMin ?? 540,
        endMin: a?.endMin ?? 1020,
      };
    }),
  );

  function update(i: number, patch: Partial<DayState>) {
    setDraft((prev) => prev.map((d, j) => (i === j ? { ...d, ...patch } : d)));
  }

  function save() {
    const out: AvailabilitySlot[] = [];
    draft.forEach((d, i) => {
      if (!d.enabled) return;
      if (d.endMin <= d.startMin) return;
      out.push({
        weekday: WEEKDAYS[i].weekday,
        startMin: d.startMin,
        endMin: d.endMin,
      });
    });
    setAvailability(out);
  }

  function reset() {
    setDraft(
      WEEKDAYS.map((w) => {
        const a = byDay.get(w.weekday);
        return {
          enabled: !!a,
          startMin: a?.startMin ?? 540,
          endMin: a?.endMin ?? 1020,
        };
      }),
    );
  }

  return (
    <Section
      title="Weekly availability"
      subtitle="Set when you're open to take bookings. Times are in your local timezone."
    >
      <Table>
        {WEEKDAYS.map((w, i) => {
          const d = draft[i];
          return (
            <Row key={w.weekday}>
              <DayLabel>{w.label}</DayLabel>
              <TimeField>
                <TimeLabel>Start</TimeLabel>
                <TimeInput
                  type="time"
                  value={minsToHHMM(d.startMin)}
                  disabled={!d.enabled}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    update(i, { startMin: hhmmToMins(e.target.value) })
                  }
                />
              </TimeField>
              <TimeField>
                <TimeLabel>End</TimeLabel>
                <TimeInput
                  type="time"
                  value={minsToHHMM(d.endMin)}
                  disabled={!d.enabled}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    update(i, { endMin: hhmmToMins(e.target.value) })
                  }
                />
              </TimeField>
              <ToggleLabel>
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={(e) => update(i, { enabled: e.target.checked })}
                />
                {d.enabled ? 'On' : 'Off'}
              </ToggleLabel>
            </Row>
          );
        })}
      </Table>
      <Footer>
        <Button variant="ghost" onClick={reset}>Reset</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </Footer>
    </Section>
  );
}
