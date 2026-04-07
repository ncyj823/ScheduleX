import { useMemo, useRef, useCallback } from "react";
import {
  getCalendarDays,
  getUSHolidays,
  DAY_LABELS,
  isSameDay,
  isSameMonth,
  isInRange,
  isRangeStart,
  isRangeEnd,
  format,
  isBefore,
} from "@/utils/calendarUtils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function CalendarGrid({
  currentMonth,
  rangeStart,
  rangeEnd,
  onDayMouseDown,
  onDayMouseEnter,
  onDayMouseUp,
  onDayTouchStart,
  onDayTouchEnd,
}) {
  const gridRef = useRef(null);
  const days = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);
  const year = currentMonth.getFullYear();
  const holidays = useMemo(() => getUSHolidays(year), [year]);
  const today = new Date();

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el && el.dataset.date) {
        onDayMouseEnter(new Date(el.dataset.date));
      }
    },
    [onDayMouseEnter]
  );

  const effectiveStart =
    rangeStart && rangeEnd
      ? isBefore(rangeStart, rangeEnd)
        ? rangeStart
        : rangeEnd
      : rangeStart;
  const effectiveEnd =
    rangeStart && rangeEnd
      ? isBefore(rangeStart, rangeEnd)
        ? rangeEnd
        : rangeStart
      : rangeEnd;

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="calendar-grid-container"
        data-testid="calendar-grid"
        ref={gridRef}
        onTouchMove={handleTouchMove}
      >
        <div className="calendar-weekdays">
          {DAY_LABELS.map((label, i) => (
            <div key={label} className={`weekday-label ${i >= 5 ? "weekday-weekend" : ""}`}>
              {label}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const holiday = holidays[dateKey];
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            const isStart = isRangeStart(day, effectiveStart, effectiveEnd);
            const isEnd = isRangeEnd(day, effectiveStart, effectiveEnd);
            const inRange = isInRange(day, effectiveStart, effectiveEnd);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            const dayNum = day.getDate();

            let cellClass = "calendar-day";
            if (!isCurrentMonth) cellClass += " day-outside";
            if (isToday) cellClass += " day-today";
            if (isStart) cellClass += " day-range-start";
            if (isEnd) cellClass += " day-range-end";
            if (inRange && !isStart && !isEnd) cellClass += " day-in-range";
            if (isWeekend && isCurrentMonth) cellClass += " day-weekend";
            if (holiday) cellClass += " day-holiday";

            const cell = (
              <div
                key={dateKey}
                className={cellClass}
                data-date={day.toISOString()}
                data-testid={`day-cell-${dateKey}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (isCurrentMonth) onDayMouseDown(day);
                }}
                onMouseEnter={() => {
                  if (isCurrentMonth) onDayMouseEnter(day);
                }}
                onMouseUp={() => {
                  if (isCurrentMonth) onDayMouseUp(day);
                }}
                onTouchStart={() => {
                  if (isCurrentMonth) onDayTouchStart(day);
                }}
                onTouchEnd={() => {
                  if (isCurrentMonth) onDayTouchEnd(day);
                }}
              >
                <span className="day-number">{dayNum}</span>
                {holiday && <span className="holiday-dot" />}
                {isToday && <span className="today-indicator" />}
              </div>
            );

            if (holiday) {
              return (
                <Tooltip key={dateKey}>
                  <TooltipTrigger asChild>{cell}</TooltipTrigger>
                  <TooltipContent
                    className="holiday-tooltip"
                    data-testid={`holiday-tooltip-${dateKey}`}
                  >
                    {holiday}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return cell;
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
