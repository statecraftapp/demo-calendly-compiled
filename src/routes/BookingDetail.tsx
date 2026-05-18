import { styled } from '@compiled/react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { BookingConfirmation } from '../components/BookingConfirmation';
import { Button } from '../components/Button';
import { useStore, cancelBooking } from '../store/yamlStore';
import { useNavigate } from 'react-router-dom';

const Empty = styled.div({
  background: '#f7f8fb',
  borderRadius: '14px',
  padding: '40px',
  textAlign: 'center',
  color: '#5b6478',
});

const Actions = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '12px',
});

export function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useStore((s) => s.bookings.find((b) => b.id === id));
  const eventType = useStore((s) =>
    booking ? s.eventTypes.find((e) => e.id === booking.eventTypeId) ?? null : null,
  );

  if (!booking || !eventType) {
    return (
      <Section title="Booking not found" subtitle="That confirmation link is no longer valid.">
        <Empty>
          <p>The booking may have been cancelled.</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/">
              <Button variant="secondary">Back to dashboard</Button>
            </Link>
          </div>
        </Empty>
      </Section>
    );
  }

  function cancel() {
    if (!booking) return;
    if (window.confirm('Cancel this booking?')) {
      cancelBooking(booking.id);
      navigate('/');
    }
  }

  return (
    <>
      <BookingConfirmation booking={booking} eventType={eventType} />
      <Actions>
        <Link to="/">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
        <Button variant="danger" onClick={cancel}>
          Cancel booking
        </Button>
      </Actions>
    </>
  );
}
