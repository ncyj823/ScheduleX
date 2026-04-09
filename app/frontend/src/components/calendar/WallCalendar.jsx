import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, X, BookOpen } from "lucide-react";
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isToday,
  addMonths, subMonths, isWeekend, isWithinInterval, startOfDay,
} from "date-fns";
import { useTheme } from "@/hooks/useTheme";
import { FESTIVAL_THEMES } from "@/utils/themes";
import ParticleCanvas from "@/components/ParticleCanvas";
import ThemeBanner from "@/components/ThemeBanner";
import ThemeTransitionOverlay from "@/components/ThemeTransitionOverlay";

// ─── helpers ──────────────────────────────────────────────────────────────────

const SPIRAL_COUNT = 13;

const HOLIDAY_MAP = Object.fromEntries(
  Object.entries(FESTIVAL_THEMES).map(([key, val]) => [key, { name: val.name, emoji: val.emoji }])
);

function getHoliday(date) {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return HOLIDAY_MAP[key] || null;
}

function getDaysInGrid(displayDate) {
  const start = startOfWeek(startOfMonth(displayDate));
  const end = endOfWeek(endOfMonth(displayDate));
  return eachDayOfInterval({ start, end });
}

// ─── sub-components ────────────────────────────────────────────────────────────

function DayCell({ day, displayDate, rangeStart, rangeEnd, hoverDay, onDayClick, onDayHover }) {
  const outside   = !isSameMonth(day, displayDate);
  const isStart   = rangeStart && isSameDay(day, rangeStart);
  const isEnd     = rangeEnd   && isSameDay(day, rangeEnd);
  const inRange   = rangeStart && rangeEnd && isWithinInterval(startOfDay(day), { start: startOfDay(rangeStart), end: startOfDay(rangeEnd) });
  const inHover   = rangeStart && !rangeEnd && hoverDay && !outside &&
    isWithinInterval(startOfDay(day), {
      start: startOfDay(rangeStart) < startOfDay(hoverDay) ? startOfDay(rangeStart) : startOfDay(hoverDay),
      end:   startOfDay(rangeStart) < startOfDay(hoverDay) ? startOfDay(hoverDay)   : startOfDay(rangeStart),
    });
  const todayDay  = isToday(day);
  const weekend   = isWeekend(day);
  const holiday   = getHoliday(day);

  let cls = "calendar-day";
  if (outside)       cls += " day-outside";
  if (weekend && !outside) cls += " day-weekend";
  if (todayDay)      cls += " day-today";
  if (isStart)       cls += " day-range-start";
  if (isEnd)         cls += " day-range-end";
  if (inRange && !isStart && !isEnd) cls += " day-in-range";
  if (inHover && !isStart) cls += " day-hover-range";

  return (
    <motion.div
      className={cls}
      onClick={() => !outside && onDayClick(day)}
      onMouseEnter={() => !outside && onDayHover(day)}
      onMouseLeave={() => onDayHover(null)}
      whileHover={!outside ? { scale: 1.12, zIndex: 2 } : {}}
      whileTap={!outside  ? { scale: 0.88 } : {}}
      transition={{ type: "spring", stiffness: 600, damping: 28 }}
      title={holiday ? `${holiday.emoji} ${holiday.name}` : undefined}
    >
      {holiday && <span className="holiday-dot" />}
      <span className="day-number">{format(day, "d")}</span>
      {todayDay && <span className="today-indicator" />}
    </motion.div>
  );
}

function CalendarGrid({ displayDate, rangeStart, rangeEnd, direction, onDayClick, onDayHover, hoverDay }) {
  const days = getDaysInGrid(displayDate);
  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center:       ({ x: 0, opacity: 1 }),
    exit:  (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="calendar-grid-container">
      <div className="calendar-weekdays">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`weekday-label${i === 0 || i === 6 ? " weekday-weekend" : ""}`}>{d}</div>
        ))}
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={format(displayDate, "yyyy-MM")}
          className="calendar-days"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
        >
          {days.map((day) => (
            <DayCell
              key={day.toISOString()}
              day={day}
              displayDate={displayDate}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hoverDay={hoverDay}
              onDayClick={onDayClick}
              onDayHover={onDayHover}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── hero image panel ──────────────────────────────────────────────────────────

const UNSPLASH_QUERIES = [
  "season nature landscape",
  "minimalist architecture",
  "mountain fog mist",
  "ocean waves sunrise",
  "forest light",
  "city night lights",
  "flowers macro",
  "desert dunes",
  "snow winter",
  "autumn leaves",
  "spring blossom",
  "night sky stars",
];

function HeroImagePanel({ displayDate, theme }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const monthIdx = displayDate.getMonth();
  const query = UNSPLASH_QUERIES[monthIdx % UNSPLASH_QUERIES.length];
  const seed = `${format(displayDate, "yyyy-MM")}-${theme?.name || ""}`;

  useEffect(() => {
    setLoaded(false);
    // Use picsum with a deterministic seed based on month+theme
    const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
    const id = 10 + (hash % 990);
    setImgSrc(`https://picsum.photos/seed/${id}/800/1000`);
  }, [seed]);

  return (
    <div className="calendar-image-panel">
      <div className="image-flip-container">
        <div className="hero-image-panel">
          <div className="hero-image-wrapper">
            {!loaded && <div className="hero-image-skeleton" />}
            <AnimatePresence mode="wait">
              <motion.img
                key={imgSrc}
                src={imgSrc}
                alt={format(displayDate, "MMMM yyyy")}
                className={`hero-image ${loaded ? "hero-image-loaded" : "hero-image-loading"}`}
                onLoad={() => setLoaded(true)}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="hero-image-overlay">
              <motion.div
                className="hero-image-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="hero-year">{format(displayDate, "yyyy")}</span>
                <span className="hero-month">{format(displayDate, "MMMM")}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme glow overlay on image */}
      <motion.div
        key={theme?.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${theme?.["--cal-primary"] || "transparent"}22 0%, transparent 60%)`,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

// ─── theme badge ───────────────────────────────────────────────────────────────

function ThemeBadge({ theme }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme?.name}
        initial={{ opacity: 0, y: -8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.2rem 0.6rem",
          borderRadius: "100px",
          background: "var(--cal-highlight-between)",
          border: "1px solid var(--cal-border)",
          fontSize: "0.7rem",
          fontFamily: "var(--cal-font-body)",
          fontWeight: 600,
          color: "var(--cal-primary)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginLeft: "auto",
          flexShrink: 0,
        }}
      >
        {theme?.isFestival && (
          <span style={{ fontSize: "0.85rem" }}>{theme.emoji}</span>
        )}
        {theme?.name}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export function WallCalendar() {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(today);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd]     = useState(null);
  const [hoverDay, setHoverDay]     = useState(null);
  const [direction, setDirection]   = useState(1);
  const [notes, setNotes]           = useState("");
  const { theme, isTransitioning }  = useTheme(displayDate);

  const goNext = useCallback(() => {
    setDirection(1);
    setDisplayDate((d) => addMonths(d, 1));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setDisplayDate((d) => subMonths(d, 1));
  }, []);

  const goToday = useCallback(() => {
    setDirection(isSameMonth(displayDate, today) ? 0 : displayDate < today ? 1 : -1);
    setDisplayDate(today);
  }, [displayDate]);

  const handleDayClick = useCallback((day) => {
    if (!rangeStart || rangeEnd) {
      setRangeStart(day);
      setRangeEnd(null);
    } else {
      if (isSameDay(day, rangeStart)) {
        setRangeStart(null);
        return;
      }
      const [s, e] = day < rangeStart ? [day, rangeStart] : [rangeStart, day];
      setRangeStart(s);
      setRangeEnd(e);
    }
  }, [rangeStart, rangeEnd]);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  const rangeDays = rangeStart && rangeEnd
    ? Math.round((rangeEnd - rangeStart) / (1000 * 60 * 60 * 24)) + 1
    : null;

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <>
      {/* Festival particles */}
      <ParticleCanvas theme={theme} visible={theme?.isFestival} />

      {/* Subtle ambient particles for non-festival weeks */}
      <ParticleCanvas
        theme={{ ...theme, particles: "dots" }}
        visible={!theme?.isFestival}
      />

      {/* Festival greeting banner */}
      <ThemeBanner theme={theme} />

      {/* Theme transition flash */}
      <ThemeTransitionOverlay isTransitioning={isTransitioning} />

      <div className="wall-calendar-wrapper">
        {/* Spiral rings */}
        <div className="spiral-binding">
          {Array.from({ length: SPIRAL_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              className="spiral-ring"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
            />
          ))}
        </div>

        {/* Calendar body */}
        <motion.div
          className="wall-calendar"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
        >
          {/* Left: hero image */}
          <HeroImagePanel displayDate={displayDate} theme={theme} />

          {/* Right: calendar content */}
          <div className="calendar-content-panel">
            {/* Month header */}
            <div className="month-header">
              <motion.button
                className="nav-btn"
                onClick={goPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85, x: -3 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </motion.button>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={format(displayDate, "yyyy-MM")}
                    className="month-title-group"
                    custom={direction}
                    initial={(dir) => ({ y: dir > 0 ? 20 : -20, opacity: 0 })}
                    animate={{ y: 0, opacity: 1 }}
                    exit={(dir) => ({ y: dir > 0 ? -20 : 20, opacity: 0 })}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <h2 className="month-name">{format(displayDate, "MMMM")}</h2>
                    <span className="month-year">{format(displayDate, "yyyy")}</span>
                  </motion.div>
                </AnimatePresence>
                <ThemeBadge theme={theme} />
              </div>

              <motion.button
                className="nav-btn"
                onClick={goNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85, x: 3 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>

            {/* Toolbar */}
            <div className="calendar-toolbar">
              <motion.button
                className="today-btn"
                onClick={goToday}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <RotateCcw size={11} />
                Today
              </motion.button>

              <AnimatePresence>
                {rangeStart && (
                  <motion.div
                    className="selection-info"
                    initial={{ opacity: 0, scale: 0.85, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -10 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  >
                    <span className="selection-text">
                      {rangeEnd
                        ? `${format(rangeStart, "MMM d")} – ${format(rangeEnd, "MMM d")} · ${rangeDays}d`
                        : format(rangeStart, "MMM d, yyyy")}
                    </span>
                    <motion.button
                      className="clear-btn"
                      onClick={clearRange}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <X size={11} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Calendar grid */}
            <CalendarGrid
              displayDate={displayDate}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              direction={direction}
              hoverDay={hoverDay}
              onDayClick={handleDayClick}
              onDayHover={setHoverDay}
            />

            {/* Notes */}
            <div className="notes-section">
              <div className="notes-header">
                <BookOpen size={14} className="notes-icon" />
                <span className="notes-title">Notes</span>
              </div>
              <div className="notes-body">
                <textarea
                  className="notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={`Notes for ${format(displayDate, "MMMM yyyy")}…`}
                  rows={4}
                />
                <div className="notes-lines" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="notes-line" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
