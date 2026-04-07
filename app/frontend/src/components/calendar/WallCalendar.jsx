import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";
import { useCalendarState } from "@/hooks/useCalendarState";
import { MONTH_NAMES, format, isBefore } from "@/utils/calendarUtils";
import { HeroImage } from "./HeroImage";
import { CalendarGrid } from "./CalendarGrid";
import { NotesSection } from "./NotesSection";

const flipVariants = {
  enter: (dir) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.95,
  }),
};

const imageFlipVariants = {
  enter: (dir) => ({
    rotateX: dir > 0 ? 15 : -15,
    opacity: 0,
    y: dir > 0 ? 40 : -40,
  }),
  center: {
    rotateX: 0,
    opacity: 1,
    y: 0,
  },
  exit: (dir) => ({
    rotateX: dir > 0 ? -15 : 15,
    opacity: 0,
    y: dir > 0 ? -40 : 40,
  }),
};

export function WallCalendar() {
  const state = useCalendarState();
  const {
    currentMonth,
    rangeStart,
    rangeEnd,
    direction,
    notes,
    setNotes,
    goNextMonth,
    goPrevMonth,
    goToday,
    onDayMouseDown,
    onDayMouseEnter,
    onDayMouseUp,
    onDayTouchStart,
    onDayTouchEnd,
    clearSelection,
  } = state;

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();
  const monthName = MONTH_NAMES[monthIndex];
  const monthKey = `${year}-${monthIndex}`;

  const getRangeText = useCallback(() => {
    if (!rangeStart) return null;
    if (!rangeEnd || format(rangeStart, "yyyy-MM-dd") === format(rangeEnd, "yyyy-MM-dd")) {
      return format(rangeStart, "MMM d, yyyy");
    }
    const start = isBefore(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
    const end = isBefore(rangeStart, rangeEnd) ? rangeEnd : rangeStart;
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  }, [rangeStart, rangeEnd]);

  const handleGlobalMouseUp = useCallback(() => {
    if (state.isDragging) {
      onDayMouseUp(null);
    }
  }, [state.isDragging, onDayMouseUp]);

  return (
    <div
      className="wall-calendar-wrapper"
      onMouseUp={handleGlobalMouseUp}
      onMouseLeave={handleGlobalMouseUp}
    >
      <div className="spiral-binding" data-testid="spiral-binding">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="spiral-ring" />
        ))}
      </div>

      <div className="wall-calendar" data-testid="wall-calendar">
        <div className="calendar-image-panel" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={monthKey + "-image"}
              custom={direction}
              variants={imageFlipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="image-flip-container"
            >
              <HeroImage month={monthIndex} year={year} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="calendar-content-panel">
          <div className="month-header" data-testid="month-header">
            <button
              className="nav-btn"
              onClick={goPrevMonth}
              data-testid="prev-month-btn"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="month-title-group">
              <h2 className="month-name" data-testid="month-name">
                {monthName}
              </h2>
              <span className="month-year">{year}</span>
            </div>

            <button
              className="nav-btn"
              onClick={goNextMonth}
              data-testid="next-month-btn"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="calendar-toolbar">
            <button className="today-btn" onClick={goToday} data-testid="today-btn">
              <CalendarDays size={14} />
              <span>Today</span>
            </button>

            {rangeStart && (
              <div className="selection-info" data-testid="selection-info">
                <span className="selection-text">{getRangeText()}</span>
                <button
                  className="clear-btn"
                  onClick={clearSelection}
                  data-testid="clear-selection-btn"
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <CalendarGrid
                  currentMonth={currentMonth}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  onDayMouseDown={onDayMouseDown}
                  onDayMouseEnter={onDayMouseEnter}
                  onDayMouseUp={onDayMouseUp}
                  onDayTouchStart={onDayTouchStart}
                  onDayTouchEnd={onDayTouchEnd}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <NotesSection
            notes={notes}
            onNotesChange={setNotes}
            monthName={monthName}
          />
        </div>
      </div>
    </div>
  );
}
