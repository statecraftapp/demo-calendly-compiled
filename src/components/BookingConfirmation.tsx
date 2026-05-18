import { styled } from '@compiled/react';
import { Calendar as CalendarIcon, Clock, Mail, User, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking, EventType } from '../store/types';

const Card = styled.div({
  background: '#ffffff',
  border: '1px solid #e6e9f0',
  borderRadius: '20px',
  padding: '40px 32px',
  maxWidth: '520px',
  margin: '40px auto',
  textAlign: 'center',
  boxShadow: '0 8px 24px rgba(11, 23, 51, 0.05)',
});

const Icon = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '999px',
  background: 'rgba(16, 185, 129, 0.12)',
  color: '#10b981',
  marginBottom: '16px',
});

const Title = styled.h1({
  fontSize: '24px',
  fontWeight: 700,
  color: '#0b1733',
  marginBottom: '6px',
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: '#5b6478',
  marginBottom: '28px',
});

const Details = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',
  background: '#f7f8fb',
  borderRadius: '14px',
  padding: '20px',
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px',
  color: '#0b1733',
});

const IconWrap = styled.span({
  color: '#5b6478',
  display: 'inline-flex',
});

const TimeMono = styled.span({
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
});

const Notes = styled.p({
  marginTop: '16px',
  fontSize: '13.5px',
  color: '#5b6478',
  lineHeight: 1.5,
  fontStyle: 'italic',
});

export interface BookingConfirmationProps {
  booking: Booking;
  eventType: EventType;
}

export function BookingConfirmation({ booking, eventType }: BookingConfirmationProps) {
  const start = new Date(booking.startAt);
  return (
    <Card>
      <Icon>
        <CheckCircle2 size={28} />
      </Icon>
      <Title>You're booked</Title>
      <Subtitle>A calendar invite has been sent to {booking.inviteeEmail}.</Subtitle>
      <Details>
        <Row>
          <IconWrap>
            <CalendarIcon size={16} />
          </IconWrap>
          <span>{format(start, 'EEEE, MMMM d, yyyy')}</span>
        </Row>
        <Row>
          <IconWrap>
            <Clock size={16} />
          </IconWrap>
          <TimeMono>
            {format(start, 'h:mm a')} — {eventType.name} ({booking.durationMinutes} min)
          </TimeMono>
        </Row>
        <Row>
          <IconWrap>
            <User size={16} />
          </IconWrap>
          <span>{booking.inviteeName}</span>
        </Row>
        <Row>
          <IconWrap>
            <Mail size={16} />
          </IconWrap>
          <span>{booking.inviteeEmail}</span>
        </Row>
      </Details>
      {booking.notes ? <Notes>"{booking.notes}"</Notes> : null}
    </Card>
  );
}
