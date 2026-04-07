import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export const MONTH_IMAGES = {
  0: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1600&q=80",
  1: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
  2: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80",
  3: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  4: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=1600&q=80",
  5: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  6: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80",
  7: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80",
  8: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  9: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  10: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
  11: "https://images.unsplash.com/photo-1482192221444-af4ca1ff6a8b?auto=format&fit=crop&w=1600&q=80",
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getUSHolidays(year) {
  const holidays = {};
  const key = (m, d) =>
    `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  holidays[key(1, 1)] = "New Year's Day";
  holidays[key(6, 19)] = "Juneteenth";
  holidays[key(7, 4)] = "Independence Day";
  holidays[key(11, 11)] = "Veterans Day";
  holidays[key(12, 25)] = "Christmas Day";

  const nthWeekday = (month, weekday, n) => {
    let count = 0;
    for (let d = 1; d <= 31; d += 1) {
      const day = new Date(year, month - 1, d);
      if (day.getMonth() !== month - 1) break;
      if (day.getDay() === weekday) {
        count += 1;
        if (count === n) return d;
      }
    }
    return null;
  };

  const lastWeekday = (month, weekday) => {
    const last = endOfMonth(new Date(year, month - 1, 1));
    for (let d = last.getDate(); d >= 1; d -= 1) {
      const day = new Date(year, month - 1, d);
      if (day.getDay() === weekday) return d;
    }
    return null;
  };

  const mlk = nthWeekday(1, 1, 3);
  if (mlk) holidays[key(1, mlk)] = "MLK Day";

  const pres = nthWeekday(2, 1, 3);
  if (pres) holidays[key(2, pres)] = "Presidents' Day";

  const mem = lastWeekday(5, 1);
  if (mem) holidays[key(5, mem)] = "Memorial Day";

  const labor = nthWeekday(9, 1, 1);
  if (labor) holidays[key(9, labor)] = "Labor Day";

  const col = nthWeekday(10, 1, 2);
  if (col) holidays[key(10, col)] = "Columbus Day";

  const thanks = nthWeekday(11, 4, 4);
  if (thanks) holidays[key(11, thanks)] = "Thanksgiving";

  return holidays;
}

export function getCalendarDays(monthDate) {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  const days = [];
  let current = start;

  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }

  return days;
}

export function isInRange(day, rangeStart, rangeEnd) {
  if (!rangeStart || !rangeEnd) return false;
  const start = isBefore(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
  const end = isAfter(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
  return isWithinInterval(day, { start, end });
}

export function isRangeStart(day, rangeStart, rangeEnd) {
  if (!rangeStart) return false;
  if (!rangeEnd) return isSameDay(day, rangeStart);
  const start = isBefore(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
  return isSameDay(day, start);
}

export function isRangeEnd(day, rangeStart, rangeEnd) {
  if (!rangeEnd) return false;
  const end = isAfter(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
  return isSameDay(day, end);
}

export function getHolidayName(day, holidays) {
  return holidays[format(day, "yyyy-MM-dd")] || "";
}

export { format, isBefore, isSameDay, isSameMonth };
