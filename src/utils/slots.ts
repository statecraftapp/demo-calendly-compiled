import {
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  set
  setMilliseconds,
} from "date-fns";
import type { AvailabilitySlot } from "../store/types";

export function slotsForDate(
  date: Date,
  availability: AvailabilitySlot[],
  durationMin: number,
): Date[] {
  const weekday = date.getDay() as AvailabilitySlot["weekday"];
  const windows = availability.filter((a) => a.weekday === weekday);
  const out: Date[] = [];
  const step = durationMin;
  const now = new Date();
  for (const w of windows) {
    const startBase = setMilliseconds(
      setSeconds(setMinutes(setHours(date, 0), 0), 0),
      0,
    );
    const winStart = addMinutes(startBase, w.startMin);
    const winEnd = addMinutes(startBase, w.endMin);
    let cur = winStart;
    while (addMinutes(cur, durationMin) <= winEnd) {
      if (isBefore(now, cur)) {
        out.push(cur);
      }
      cur = addMinutes(cur, step);
    }
  }
  return out;
}

export function hasAvailabilityOn(
  date: Date,
  availability: AvailabilitySlot[],
  durationMin: number,
): boolean {
  return slotsForDate(date, availability, durationMin).length > 0;
}
