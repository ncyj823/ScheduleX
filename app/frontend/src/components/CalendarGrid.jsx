import { useMemo } from "react";
import { isToday } from "date-fns";
import {
  DAY_LABELS,
  format,
  getCalendarDays,
  getHolidayName,
  isInRange,
  isRangeEnd,
  isRangeStart,
  isSameMonth,
} from "../utils/calendarUtils";

export default function CalendarGrid({
  monthDate,
  rangeStart,
  rangeEnd,
  holidays,
  onDayMouseDown,
  onDayMouseEnter,
  onDayMouseUp,
  onDayTouchStart,
  onDayTouchEnd,
}) {
  const days = useMemo(() => getCalendarDays(monthDate), [monthDate]);

  return (
    <section className="calendar-grid-wrap" aria-label="Monthly calendar">
      <div className="weekday-row">
        {DAY_LABELS.map((label) => (
          <div key={label} className="weekday-cell">
            {label}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const inCurrentMonth = isSameMonth(day, monthDate);
          const inRange = isInRange(day, rangeStart, rangeEnd);
          const start = isRangeStart(day, rangeStart, rangeEnd);
          const end = isRangeEnd(day, rangeStart, rangeEnd);
          const holiday = getHolidayName(day, holidays);

          const classNames = ["day-cell"];
          if (!inCurrentMonth) classNames.push("day-cell--outside");
          if (isToday(day)) classNames.push("day-cell--today");
          if (inRange) classNames.push("day-cell--range");
          if (start) classNames.push("day-cell--start");
          if (end) classNames.push("day-cell--end");
          if (holiday) classNames.push("day-cell--holiday");

          return (
            <button
              key={format(day, "yyyy-MM-dd")}
              type="button"
              className={classNames.join(" ")}
              onMouseDown={() => onDayMouseDown(day)}
              onMouseEnter={() => onDayMouseEnter(day)}
              onMouseUp={() => onDayMouseUp(day)}
              onTouchStart={() => onDayTouchStart(day)}
              onTouchEnd={() => onDayTouchEnd(day)}
              title={holiday || format(day, "PPPP")}
              aria-label={`${format(day, "PPPP")}${holiday ? ` - ${holiday}` : ""}`}
            >
              <span>{format(day, "d")}</span>
              {holiday && <i className="holiday-dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}
