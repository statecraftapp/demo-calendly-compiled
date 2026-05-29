export type EventTypeDuration = 15 | 30 | 60;

export interface EventType {
  id: string;
  name: string;
  durationMinutes: EventTypeDuration;
  color: string;
  description: string;
  slug: string;
}

export interface AvailabilitySlot {
  /** 0 = Sunday … 6 = Saturday */
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Minutes from midnight, e.g. 540 = 09:00 */
  startMin: number;
  endMin: number;
}

export interface Booking {
  id: string;
  eventTypeId: string;
  inviteeName: string;
  inviteeEmail: string;
  /** ISO timestamp */
  startAt: string;
  durationMinutes: number;
  notes: string;
  /** Additional invitee emails CC'd on the invite */
  guests: string[];
}

export interface State {
  eventTypes: EventType[];
  availability: AvailabilitySlot[];
  bookings: Booking[];
  currentUserId: string;
}
