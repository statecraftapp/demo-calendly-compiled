import { styled } from '@compiled/react';
import type { EventType } from '../store/types';
import { Clock, Copy, Pencil, Trash2 } from 'lucide-react';
import { colors, font } from '../tokens';

const Card = styled.article({
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease',
  position: 'relative',
  '&:hover': {
    borderColor: colors.borderHover,
    boxShadow: `0 4px 18px ${colors.shadowCardHover}`,
    transform: 'translateY(-1px)',
  },
});

const AccentBar = styled.div({
  position: 'absolute',
  top: 0,
  left: '24px',
  right: '24px',
  height: '4px',
  borderRadius: '0 0 4px 4px',
});

const Title = styled.h3({
  fontFamily: font.display,
  fontSize: '20px',
  fontWeight: 700,
  color: colors.textPrimary,
  letterSpacing: '-0.005em',
});

const Description = styled.p({
  fontSize: '13.5px',
  color: colors.textMuted,
  lineHeight: 1.5,
});

const Meta = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: colors.textMuted,
});

const Footer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: `1px solid ${colors.bgSubtle}`,
  paddingTop: '14px',
  marginTop: 'auto',
});

const LinkLabel = styled.span({
  fontFamily: font.mono,
  fontSize: '12px',
  color: colors.primary,
  background: colors.primaryTint,
  padding: '3px 8px',
  borderRadius: '6px',
});

const IconBtns = styled.div({
  display: 'flex',
  gap: '4px',
});

const IconBtn = styled.button({
  appearance: 'none',
  background: 'transparent',
  border: 0,
  padding: '6px',
  borderRadius: '8px',
  cursor: 'pointer',
  color: colors.textMuted,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 120ms ease, color 120ms ease',
  '&:hover': { background: colors.bgSubtle, color: colors.textPrimary },
});

export interface EventTypeCardProps {
  eventType: EventType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopyLink?: (slug: string) => void;
  onOpen?: (slug: string) => void;
}

export function EventTypeCard({
  eventType,
  onEdit,
  onDelete,
  onCopyLink,
  onOpen,
}: EventTypeCardProps) {
  return (
    <Card>
      <AccentBar style={{ background: eventType.color }} />
      <Title
        onClick={() => onOpen?.(eventType.slug)}
        style={{ cursor: onOpen ? 'pointer' : 'default' }}
      >
        {eventType.name}
      </Title>
      <Meta>
        <Clock size={14} />
        <span>{eventType.durationMinutes} min</span>
      </Meta>
      <Description>{eventType.description}</Description>
      <Footer>
        <LinkLabel>/book/{eventType.slug}</LinkLabel>
        <IconBtns>
          <IconBtn
            type="button"
            aria-label="Copy booking link"
            onClick={() => onCopyLink?.(eventType.slug)}
          >
            <Copy size={15} />
          </IconBtn>
          <IconBtn
            type="button"
            aria-label="Edit event type"
            onClick={() => onEdit?.(eventType.id)}
          >
            <Pencil size={15} />
          </IconBtn>
          <IconBtn
            type="button"
            aria-label="Delete event type"
            onClick={() => onDelete?.(eventType.id)}
          >
            <Trash2 size={15} />
          </IconBtn>
        </IconBtns>
      </Footer>
    </Card>
  );
}
