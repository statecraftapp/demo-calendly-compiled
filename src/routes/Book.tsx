import { styled } from '@compiled/react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addDays,
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import { Calendar } from '../components/Calendar';
import { TimeSlotGrid } from '../components/TimeSlotGrid';
import { Section } from '../components/Section';
import { Avatar } from '../components/Avatar';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { useStore, createBooking, getState } from '../store/yamlStore';
import type { AvailabilitySlot, EventType } from '../store/types';

const Layout = styled.div({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
});

const Hero = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  marginBottom: '20px',
});

const HeroInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const EventName = styled.h1({
  fontSize: '22px',
  fontWeight: 700,
  color: '#0b1733',
});

const EventMeta = styled.p({
  fontSize: '14px',
  color: '#5b6478',
});

const Description = styled.p({
  fontSize: '14px',
  color: '#5b6478',
  lineHeight: 1.5,
  marginBottom: '24px',
});

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  marginTop: '20px',
});

const FieldLabel = styled.label({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#0b1733',
});

const SubmitRow = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});

const NotFound = styled.div({
  background: '#f7f8fb',
  borderRadius: '14px',
  padding: '40px',
  textAlign: 'center',
  color: '#5b6478',
});

function slotsForDate(
  date: Date,
  availability: AvailabilitySlot[],
  durationMin: number,
): Date[] {
  const weekday = date.getDay() as AvailabilitySlot['weekday'];
  const windows = availability.filter((a) => a.weekday === weekday);
  const out: Date[] = [];
  const step = durationMin;
  const now = new Date();
  for (const w of windows) {
    const startBase = setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
    const winStart = addMinutes(startBase, w.startMin);
    const winEnd = addMinutes(startBase, w.endMin);
    let cur = winStart;
    while (addMinutes(cur, durationMin) <= winEnd) {
      if (isBefore(now, cur)) {
        out.push(cur);
      }
      cur = addMinutes(cur, step);
    }
  }
  return out;
}

function hasAvailabilityOn(
  date: Date,
  availability: AvailabilitySlot[],
  durationMin: number,
): boolean {
  return slotsForDate(date, availability, durationMin).length > 0;
}

export function Book() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const eventTypes = useStore((s) => s.eventTypes);
  const availability = useStore((s) => s.availability);
  const bookings = useStore((s) => s.bookings);

  const eventType: EventType | undefined = useMemo(
    () => eventTypes.find((e) => e.slug === slug),
    [eventTypes, slug],
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!eventType) {
    return (
      <Section title="Event not found" subtitle="That booking link doesn't exist.">
        <NotFound>Check the URL and try again.</NotFound>
      </Section>
    );
  }

  const dur = eventType.durationMinutes;
  const takenStartsSet = new Set(
    bookings.filter((b) => b.eventTypeId === eventType.id).map((b) => b.startAt),
  );
  const slots = selectedDate
    ? slotsForDate(selectedDate, availability, dur).filter(
        (s) => !takenStartsSet.has(s.toISOString()),
      )
    : [];

  function confirm() {
    if (!selectedSlot || !name.trim() || !email.trim() || !eventType) return;
    const bk = createBooking({
      eventTypeId: eventType.id,
      inviteeName: name.trim(),
      inviteeEmail: email.trim(),
      startAt: selectedSlot.toISOString(),
      durationMinutes: dur,
      notes: notes.trim(),
    });
    navigate(`/booking/${bk.id}`);
  }

  const isReady = !!selectedSlot && name.trim() && /.+@.+\..+/.test(email);

  return (
    <Section title="Book a meeting" subtitle="Pick a date, then choose a time that works.">
      <Hero>
        <Avatar name="Demo Owner" size="lg" />
        <HeroInfo>
          <EventName>{eventType.name}</EventName>
          <EventMeta>
            with Demo Owner · {eventType.durationMinutes} min
          </EventMeta>
        </HeroInfo>
      </Hero>
      <Description>{eventType.description}</Description>
      <Layout>
        <Calendar
          selectedDate={selectedDate ?? undefined}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setSelectedSlot(null);
          }}
          isDateAvailable={(d) => {
            // disable beyond 60 days too
            const cap = addDays(new Date(), 60);
            if (isBefore(cap, d)) return false;
            return hasAvailabilityOn(d, availability, dur);
          }}
        />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <TimeSlotGrid
            date={selectedDate}
            slots={slots}
            selected={selectedSlot}
            onPick={setSelectedSlot}
          />
          {selectedSlot ? (
            <Form>
              <FieldLabel>
                Your name
                <Input
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FieldLabel>
              <FieldLabel>
                Email
                <Input
                  type="email"
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldLabel>
              <FieldLabel>
                Notes (optional)
                <Textarea
                  placeholder="Anything we should know?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FieldLabel>
              <SubmitRow>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedSlot(null);
                    setName('');
                    setEmail('');
                    setNotes('');
                  }}
                >
                  Reset
                </Button>
                <Button variant="primary" onClick={confirm} disabled={!isReady}>
                  Confirm booking
                </Button>
              </SubmitRow>
            </Form>
          ) : null}
        </div>
      </Layout>
    </Section>
  );
}

// Keep getState reference live to avoid tree-shaking edge cases in dev.
void getState;
