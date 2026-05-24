import { styled } from '@compiled/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { EventType, EventTypeDuration } from '../store/types';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { colors } from '../tokens';

const Sheet = styled.div({
  background: colors.bgCard,
  borderRadius: '16px',
  width: '100%',
  maxWidth: '560px',
  margin: '0 auto',
  padding: '28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  border: `1px solid ${colors.border}`,
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

const Title = styled.h2({
  fontSize: '18px',
  fontWeight: 700,
  color: colors.textPrimary,
});

const Field = styled.label({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '13px',
  fontWeight: 600,
  color: colors.textPrimary,
});

const Row = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
});

const Pills = styled.div({
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
});

const PillActive = styled.button({
  appearance: 'none',
  border: `1px solid ${colors.primary}`,
  background: colors.primary,
  color: colors.textOnPrimary,
  padding: '6px 12px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
});

const PillInactive = styled.button({
  appearance: 'none',
  border: `1px solid ${colors.borderStrong}`,
  background: colors.bgCard,
  color: colors.textPrimary,
  padding: '6px 12px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  '&:hover': { background: colors.bgSurfaceAlt },
});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  paddingTop: '4px',
});

const ColorSwatch = styled.div({
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: `1px solid ${colors.borderStrong}`,
  cursor: 'pointer',
});

const Swatches = styled.div({
  display: 'flex',
  gap: '8px',
});

const COLORS = ['#0069ff', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4'];
const DURATIONS: EventTypeDuration[] = [15, 30, 60];

export interface EventTypeFormValues {
  name: string;
  durationMinutes: EventTypeDuration;
  color: string;
  description: string;
  slug: string;
}

export interface EventTypeFormProps {
  initial?: EventType | null;
  onCancel: () => void;
  onSubmit: (values: EventTypeFormValues) => void;
}

export function EventTypeForm({ initial, onCancel, onSubmit }: EventTypeFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [duration, setDuration] = useState<EventTypeDuration>(initial?.durationMinutes ?? 30);
  const [color, setColor] = useState(initial?.color ?? COLORS[0]);
  const [description, setDescription] = useState(initial?.description ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');

  useEffect(() => {
    if (!initial && name && !slug) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      );
    }
  }, [name, slug, initial]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), durationMinutes: duration, color, description: description.trim(), slug: slug.trim() });
  }

  return (
    <Sheet>
      <form onSubmit={submit} style={{ display: 'contents' }}>
        <Header>
          <Title>{initial ? 'Edit event type' : 'New event type'}</Title>
        </Header>
        <Field>
          Name
          <Input
            placeholder="e.g. 15-min intro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </Field>
        <Row>
          <Field>
            Duration
            <Pills>
              {DURATIONS.map((d) =>
                d === duration ? (
                  <PillActive key={d} type="button" onClick={() => setDuration(d)}>
                    {d} min
                  </PillActive>
                ) : (
                  <PillInactive key={d} type="button" onClick={() => setDuration(d)}>
                    {d} min
                  </PillInactive>
                ),
              )}
            </Pills>
          </Field>
          <Field>
            Color
            <Swatches>
              {COLORS.map((c) => (
                <ColorSwatch
                  key={c}
                  style={{
                    background: c,
                    outline: c === color ? `2px solid ${colors.textPrimary}` : 'none',
                    outlineOffset: c === color ? '2px' : '0',
                  }}
                  onClick={() => setColor(c)}
                  role="button"
                  aria-label={`color ${c}`}
                />
              ))}
            </Swatches>
          </Field>
        </Row>
        <Field>
          URL slug
          <Input
            placeholder="quick-chat"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
          />
        </Field>
        <Field>
          Description
          <Textarea
            placeholder="What is this meeting about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <Footer>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            {initial ? 'Save changes' : 'Create event type'}
          </Button>
        </Footer>
      </form>
    </Sheet>
  );
}
