import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { format } from "date-fns";
import { CalendarGrid } from "./calendar/CalendarGrid";
import { HeroImage } from "./calendar/HeroImage";
import { NotesSection } from "./calendar/NotesSection";
import { useCalendarState } from "../hooks/useCalendarState";

export default function WallCalendar() {
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
  } = useCalendarState();

  useEffect(() => {
    const handleMouseUp = () => onDayMouseUp();
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [onDayMouseUp]);

  const monthVariants = {
    enter: (customDirection) => ({
      x: customDirection >= 0 ? 80 : -80,
      opacity: 0,
      rotateY: customDirection >= 0 ? -6 : 6,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (customDirection) => ({
      x: customDirection >= 0 ? -80 : 80,
      opacity: 0,
      rotateY: customDirection >= 0 ? 6 : -6,
    }),
  };

  return (
    <main className="calendar-page">
      <header className="calendar-header">
        <button className="nav-button" type="button" onClick={goPrevMonth} aria-label="Previous month">
          Prev
        </button>

        <h1>{format(currentMonth, "MMMM yyyy")}</h1>

        <button className="nav-button" type="button" onClick={goNextMonth} aria-label="Next month">
          Next
        </button>
      </header>

      <div className="header-actions">
        <button className="nav-button nav-button--ghost" type="button" onClick={goToday}>
          Today
        </button>
        <button className="nav-button nav-button--ghost" type="button" onClick={clearSelection}>
          Clear Selection
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentMonth, "yyyy-MM")}
          custom={direction}
          variants={monthVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="calendar-content"
        >
          <section className="calendar-panel">
            <HeroImage month={currentMonth.getMonth()} year={currentMonth.getFullYear()} />

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
          </section>

          <NotesSection
            monthName={format(currentMonth, "MMMM yyyy")}
            notes={notes}
            onNotesChange={setNotes}
          />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
