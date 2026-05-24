import { styled } from '@compiled/react';
import { Calendar as CalendarIcon, Clock, Mail, User, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking, EventType } from '../store/types';
import { colors, font } from '../tokens';

const Card = styled.div({
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  padding: '40px 32px',
  maxWidth: '520px',
  margin: '40px auto',
  textAlign: 'center',
  boxShadow: `0 8px 24px ${colors.shadowCard}`,
});

const Icon = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '999px',
  background: colors.successTint,
  color: colors.success,
  marginBottom: '16px',
});

const Title = styled.h1({
  fontSize: '24px',
  fontWeight: 700,
  color: colors.textPrimary,
  marginBottom: '6px',
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: colors.textMuted,
  marginBottom: '28px',
});

const Details = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',
  background: colors.bgSurface,
  borderRadius: '14px',
  padding: '20px',
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px',
  color: colors.textPrimary,
});

const IconWrap = styled.span({
  color: colors.textMuted,
  display: 'inline-flex',
});

const TimeMono = styled.span({
  fontFamily: font.mono,
});

const Notes = styled.p({
  marginTop: '16px',
  fontSize: '13.5px',
  color: colors.textMuted,
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
