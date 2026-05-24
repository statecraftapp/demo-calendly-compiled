import { styled } from '@compiled/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { EventTypeForm } from '../components/EventTypeForm';
import type { EventTypeFormValues } from '../components/EventTypeForm';
import {
  createEventType,
  updateEventType,
  useStore,
} from '../store/yamlStore';
import { colors } from '../tokens';

const Page = styled.div({
  maxWidth: '720px',
  margin: '0 auto',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const Breadcrumb = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  color: colors.textMuted,
});

const Crumb = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  color: colors.textMuted,
  textDecoration: 'none',
  '&:hover': { color: colors.textPrimary },
});

const Empty = styled.div({
  background: colors.bgSurface,
  borderRadius: '14px',
  padding: '40px',
  textAlign: 'center',
  color: colors.textMuted,
});

export function EventTypeFormRoute() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const eventTypes = useStore((s) => s.eventTypes);
  const initial = params.id
    ? eventTypes.find((e) => e.id === params.id) ?? null
    : null;
  const isEdit = Boolean(params.id);

  if (isEdit && !initial) {
    return (
      <Page>
        <Empty>Event type not found.</Empty>
        <div>
          <Link to="/">Back to dashboard</Link>
        </div>
      </Page>
    );
  }

  function submit(values: EventTypeFormValues) {
    if (initial) {
      updateEventType(initial.id, values);
    } else {
      createEventType(values);
    }
    navigate('/');
  }

  return (
    <Page>
      <Breadcrumb>
        <Crumb to="/">
          <ChevronLeft size={14} /> Event types
        </Crumb>
      </Breadcrumb>
      <EventTypeForm
        initial={initial}
        onCancel={() => navigate('/')}
        onSubmit={submit}
      />
    </Page>
  );
}
