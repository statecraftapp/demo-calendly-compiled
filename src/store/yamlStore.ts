import yaml from "js-yaml";
import seedRaw from "../../data/seed.yaml?raw";
import { useSyncExternalStore } from "react";
import type { State } from "./types";

const STORAGE_KEY = "demo-calendly-compiled:state";
const seed = yaml.load(seedRaw) as State;

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as State) : structuredClone(seed);
  } catch {
    return structuredClone(seed);
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function emit() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function getState(): State {
  return state;
}

export function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}

export function mutate(fn: (s: State) => void) {
  fn(state);
  emit();
}

export function resetToSeed() {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(seed);
  emit();
}

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

import type { EventType, AvailabilitySlot, Booking } from "./types";

export function createEventType(
  input: Omit<EventType, "id" | "slug"> & { slug?: string },
): EventType {
  const slug =
    input.slug?.trim() ||
    input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    uid("event");
  const et: EventType = {
    id: uid("et"),
    name: input.name,
    durationMinutes: input.durationMinutes,
    color: input.color,
    description: input.description,
    slug,
  };
  mutate((s) => {
    s.eventTypes.push(et);
  });
  return et;
}

export function updateEventType(
  id: string,
  patch: Partial<Omit<EventType, "id">>,
) {
  mutate((s) => {
    const i = s.eventTypes.findIndex((e) => e.id === id);
    if (i >= 0) {
      s.eventTypes[i] = { ...s.eventTypes[i], ...patch };
    }
  });
}

export function deleteEventType(id: string) {
  mutate((s) => {
    s.eventTypes = s.eventTypes.filter((e) => e.id !== id);
    s.bookings = s.bookings.filter((b) => b.eventTypeId !== id);
  });
}

export function setAvailability(slots: AvailabilitySlot[]) {
  mutate((s) => {
    s.availability = slots;
  });
}

export function createBooking(input: Omit<Booking, "id">): Booking {
  const bk: Booking = { ...input, id: uid("bk") };
  mutate((s) => {
    s.bookings.push(bk);
  });
  return bk;
}

export function updateBooking(id: string, patch: Partial<Omit<Booking, "id">>) {
  mutate((s) => {
    const i = s.bookings.findIndex((b) => b.id === id);
    if (i >= 0) {
      s.bookings[i] = { ...s.bookings[i], ...patch };
    }
  });
}

export function cancelBooking(id: string) {
  mutate((s) => {
    s.bookings = s.bookings.filter((b) => b.id !== id);
  });
}
