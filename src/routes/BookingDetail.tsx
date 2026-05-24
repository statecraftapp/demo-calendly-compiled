import { styled } from "@compiled/react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addDays, isBefore } from "date-fns";
import { Section } from "../components/Section";
import { BookingConfirmation } from "../components/BookingConfirmation";
import { Calendar } from "../components/Calendar";
import { TimeSlotGrid } from "../components/TimeSlotGrid";
import { Button } from "../components/Button";
import { useStore, cancelBooking, updateBooking } from "../store/yamlStore";
import { useNavigate } from "react-router-dom";
import { slotsForDate, hasAvailabilityOn } from "../utils/slots";

const Empty = styled.div({
  background: "#f7f8fb",
  borderRadius: "14px",
  padding: "40px",
  textAlign: "center",
  color: "#5b6478",
});

const Actions = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "12px",
});

const RescheduleLayout = styled.div({
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "center",
});

const ConfirmRow = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "16px",
});

export function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useStore((s) => s.bookings.find((b) => b.id === id));
  const eventType = useStore((s) =>
    booking
      ? (s.eventTypes.find((e) => e.id === booking.eventTypeId) ?? null)
      : null,
  );
  const availability = useStore((s) => s.availability);
  const allBookings = useStore((s) => s.bookings);

  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  if (!booking || !eventType) {
    return (
      <Section
        title="Booking not found"
        subtitle="That confirmation link is no longer valid."
      >
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
    if (window.confirm("Cancel this booking?")) {
      cancelBooking(booking.id);
      navigate("/");
    }
  }

  function startReschedule() {
    setIsRescheduling(true);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function cancelReschedule() {
    setIsRescheduling(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function confirmNewTime() {
    if (!selectedSlot || !booking) return;
    updateBooking(booking.id, { startAt: selectedSlot.toISOString() });
    setIsRescheduling(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  // Compute available slots: exclude the current booking's startAt so the user
  // can pick the same slot, but block other bookings.
  if (isRescheduling) {
    const dur = eventType.durationMinutes;
    const takenStartsSet = new Set(
      allBookings
        .filter((b) => b.eventTypeId === eventType.id && b.id !== booking.id)
        .map((b) => b.startAt),
    );
    const slots = selectedDate
      ? slotsForDate(selectedDate, availability, dur).filter(
          (s) => !takenStartsSet.has(s.toISOString()),
        )
      : [];

    return (
      <Section
        title="Change time"
        subtitle="Pick a new date and time for this booking."
      >
        <RescheduleLayout>
          <Calendar
            selectedDate={selectedDate ?? undefined}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            isDateAvailable={(d) => {
              const cap = addDays(new Date(), 60);
              if (isBefore(cap, d)) return false;
              return hasAvailabilityOn(d, availability, dur);
            }}
          />
          <div style={{ flex: 1, minWidth: "280px" }}>
            <TimeSlotGrid
              date={selectedDate}
              slots={slots}
              selected={selectedSlot}
              onPick={setSelectedSlot}
            />
            <ConfirmRow>
              <Button variant="ghost" onClick={cancelReschedule}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={confirmNewTime}
                disabled={!selectedSlot}
              >
                Confirm new time
              </Button>
            </ConfirmRow>
          </div>
        </RescheduleLayout>
      </Section>
    );
  }

  return (
    <>
      <BookingConfirmation booking={booking} eventType={eventType} />
      <Actions>
        <Link to="/">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
        <Button variant="secondary" onClick={startReschedule}>
          Change time
        </Button>
        <Button variant="danger" onClick={cancel}>
          Cancel booking
        </Button>
      </Actions>
    </>
  );
}
