import { styled } from '@compiled/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Section } from '../components/Section';
import { EventTypeCard } from '../components/EventTypeCard';
import { Button } from '../components/Button';
import { EventTypeForm } from '../components/EventTypeForm';
import type { EventTypeFormValues } from '../components/EventTypeForm';
import {
  useStore,
  createEventType,
  updateEventType,
  deleteEventType,
} from '../store/yamlStore';
import type { EventType } from '../store/types';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
});

const Empty = styled.div({
  background: '#f7f8fb',
  borderRadius: '14px',
  padding: '40px',
  textAlign: 'center',
  color: '#5b6478',
});

export function Dashboard() {
  const navigate = useNavigate();
  const eventTypes = useStore((s) => s.eventTypes);
  const [editing, setEditing] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }
  function openEdit(id: string) {
    const et = eventTypes.find((e) => e.id === id) ?? null;
    setEditing(et);
    setShowForm(true);
  }
  function close() {
    setShowForm(false);
    setEditing(null);
  }
  function submit(values: EventTypeFormValues) {
    if (editing) {
      updateEventType(editing.id, values);
    } else {
      createEventType(values);
    }
    close();
  }
  function copyLink(slug: string) {
    const url = `${window.location.origin}/book/${slug}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  }
  function remove(id: string) {
    if (window.confirm('Delete this event type? Existing bookings for it will also be removed.')) {
      deleteEventType(id);
    }
  }

  return (
    <>
      <Section
        title="Your event types"
        subtitle="Share these links so people can book time with you."
        actions={
          <Button variant="primary" onClick={openNew}>
            <Plus size={16} /> New event type
          </Button>
        }
      >
        {eventTypes.length === 0 ? (
          <Empty>
            No event types yet. Create your first one to share a booking link.
          </Empty>
        ) : (
          <Grid>
            {eventTypes.map((et) => (
              <EventTypeCard
                key={et.id}
                eventType={et}
                onEdit={openEdit}
                onDelete={remove}
                onCopyLink={copyLink}
                onOpen={(slug) => navigate(`/book/${slug}`)}
              />
            ))}
          </Grid>
        )}
      </Section>
      {showForm ? (
        <EventTypeForm initial={editing} onClose={close} onSubmit={submit} />
      ) : null}
    </>
  );
}
