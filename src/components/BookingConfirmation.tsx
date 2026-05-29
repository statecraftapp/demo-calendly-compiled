import { styled } from '@compiled/react';
import { CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking, EventType } from '../store/types';
import { colors, font } from '../tokens';

const Card = styled.div({
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  padding: '44px',
  maxWidth: '560px',
  margin: '40px auto',
  textAlign: 'left',
  boxShadow: `0 8px 24px ${colors.shadowCard}`,
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '20px',
});

const Icon = styled.div({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: '999px',
  background: colors.successTint,
  color: colors.success,
});

const Eyebrow = styled.div({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: colors.primary,
  marginBottom: '4px',
});

const Title = styled.h1({
  fontFamily: font.display,
  fontSize: '34px',
  fontWeight: 600,
  lineHeight: 1.05,
  letterSpacing: '-0.01em',
  color: colors.textPrimary,
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: colors.textMuted,
  marginBottom: '28px',
  lineHeight: 1.5,
});

const HeroBand = styled.div({
  background: colors.primaryTint,
  borderLeft: `3px solid ${colors.primary}`,
  borderRadius: '4px 14px 14px 4px',
  padding: '22px 26px',
});

const WhenDate = styled.div({
  fontFamily: font.display,
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: 1.1,
  color: colors.textPrimary,
  letterSpacing: '-0.01em',
});

const WhenRow = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
  marginTop: '8px',
});

const WhenTime = styled.span({
  fontFamily: font.display,
  fontSize: '20px',
  fontWeight: 600,
  color: colors.primary,
});

const WhenMeta = styled.span({
  fontSize: '12px',
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 600,
});

const DetailList = styled.div({
  marginTop: '24px',
});

const DetailRow = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '24px',
  padding: '14px 0',
  borderTop: `1px solid ${colors.border}`,
});

const DetailLabel = styled.span({
  flexShrink: 0,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 600,
  color: colors.textFaint,
});

const DetailValue = styled.span({
  fontSize: '14px',
  color: colors.textPrimary,
  fontWeight: 500,
  textAlign: 'right',
  overflowWrap: 'anywhere',
});

const Notes = styled.p({
  marginTop: '24px',
  paddingLeft: '16px',
  borderLeft: `2px solid ${colors.borderStrong}`,
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
      <Header>
        <Icon>
          <CheckCircle2 size={24} />
        </Icon>
        <div>
          <Eyebrow>Confirmed</Eyebrow>
          <Title>You're booked</Title>
        </div>
      </Header>
      <Subtitle>A calendar invite has been sent to {booking.inviteeEmail}.</Subtitle>
      <HeroBand>
        <WhenDate>{format(start, 'EEEE, MMMM d')}</WhenDate>
        <WhenRow>
          <WhenTime>{format(start, 'h:mm a')}</WhenTime>
          <WhenMeta>
            {eventType.name} · {booking.durationMinutes} min
          </WhenMeta>
        </WhenRow>
      </HeroBand>
      <DetailList>
        <DetailRow>
          <DetailLabel>Guest</DetailLabel>
          <DetailValue>{booking.inviteeName}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Email</DetailLabel>
          <DetailValue>{booking.inviteeEmail}</DetailValue>
        </DetailRow>
      </DetailList>
      {booking.notes ? <Notes>"{booking.notes}"</Notes> : null}
    </Card>
  );
}
