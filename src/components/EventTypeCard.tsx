import { styled } from '@compiled/react';
import type { EventType } from '../store/types';
import { Clock, Copy, Pencil, Trash2 } from 'lucide-react';

const Card = styled.article({
  background: '#ffffff',
  border: '1px solid #e6e9f0',
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease',
  position: 'relative',
  '&:hover': {
    borderColor: '#c7cee0',
    boxShadow: '0 4px 18px rgba(11, 23, 51, 0.06)',
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
  fontSize: '17px',
  fontWeight: 700,
  color: '#0b1733',
  letterSpacing: '-0.005em',
});

const Description = styled.p({
  fontSize: '13.5px',
  color: '#5b6478',
  lineHeight: 1.5,
});

const Meta = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: '#5b6478',
});

const Footer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid #f0f2f7',
  paddingTop: '14px',
  marginTop: 'auto',
});

const LinkLabel = styled.span({
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: '12px',
  color: '#0069ff',
  background: 'rgba(0, 105, 255, 0.08)',
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
  color: '#5b6478',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 120ms ease, color 120ms ease',
  '&:hover': { background: '#f0f2f7', color: '#0b1733' },
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
