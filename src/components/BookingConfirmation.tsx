import { styled } from '@compiled/react';
import { CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking, EventType } from '../store/types';
import { colors, font } from '../tokens';

const Card = styled.div({
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  padding: '48px 40px',
  maxWidth: '560px',
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
  fontFamily: font.display,
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '-0.015em',
  color: colors.textPrimary,
  marginBottom: '6px',
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: colors.textMuted,
  marginBottom: '32px',
});

const WhenBlock = styled.div({
  background: colors.bgSurface,
  borderRadius: '14px',
  padding: '28px 24px',
  textAlign: 'center',
});

const WhenDate = styled.div({
  fontFamily: font.display,
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 1.15,
  color: colors.textPrimary,
  letterSpacing: '-0.01em',
});

const WhenTime = styled.div({
  fontFamily: font.display,
  fontSize: '20px',
  fontWeight: 600,
  color: colors.primary,
  marginTop: '6px',
});

const WhenMeta = styled.div({
  fontSize: '12px',
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 600,
  marginTop: '12px',
});

const WhoBlock = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: `1px solid ${colors.border}`,
  textAlign: 'left',
});

const WhoLabel = styled.div({
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 600,
  color: colors.textFaint,
  marginBottom: '4px',
});

const WhoValue = styled.div({
  fontSize: '13px',
  color: colors.textPrimary,
  fontWeight: 500,
  overflowWrap: 'anywhere',
});

const Notes = styled.p({
  marginTop: '20px',
  fontSize: '13.5px',
  color: colors.textMuted,
  lineHeight: 1.6,
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
      <WhenBlock>
        <WhenDate>{format(start, 'EEEE, MMMM d')}</WhenDate>
        <WhenTime>{format(start, 'h:mm a')}</WhenTime>
        <WhenMeta>
          {eventType.name} · {booking.durationMinutes} min
        </WhenMeta>
        <WhoBlock>
          <div>
            <WhoLabel>Guest</WhoLabel>
            <WhoValue>{booking.inviteeName}</WhoValue>
          </div>
          <div>
            <WhoLabel>Email</WhoLabel>
            <WhoValue>{booking.inviteeEmail}</WhoValue>
          </div>
        </WhoBlock>
      </WhenBlock>
      {booking.notes ? <Notes>"{booking.notes}"</Notes> : null}
    </Card>
  );
}
