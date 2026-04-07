import { useState, useCallback, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";

const STORAGE_KEY = "wall-calendar-data";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore storage parsing errors
  }
  return { notes: {}, ranges: {} };
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore storage write errors
  }
}

export function useCalendarState() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0);
  const [storage, setStorage] = useState(loadFromStorage);

  const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const notes = storage.notes[monthKey] || "";

  const setNotes = useCallback(
    (text) => {
      setStorage((prev) => {
        const next = { ...prev, notes: { ...prev.notes, [monthKey]: text } };
        saveToStorage(next);
        return next;
      });
    },
    [monthKey]
  );

  const saveRange = useCallback(
    (start, end) => {
      if (!start || !end) return;
      setStorage((prev) => {
        const next = {
          ...prev,
          ranges: {
            ...prev.ranges,
            [monthKey]: { start: start.toISOString(), end: end.toISOString() },
          },
        };
        saveToStorage(next);
        return next;
      });
    },
    [monthKey]
  );

  useEffect(() => {
    const saved = storage.ranges[monthKey];
    if (saved) {
      setRangeStart(new Date(saved.start));
      setRangeEnd(new Date(saved.end));
    } else {
      setRangeStart(null);
      setRangeEnd(null);
    }
  }, [monthKey, storage.ranges]);

  const goNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const goPrevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const goToday = useCallback(() => {
    const now = new Date();
    setDirection(now > currentMonth ? 1 : -1);
    setCurrentMonth(now);
  }, [currentMonth]);

  const onDayMouseDown = useCallback((day) => {
    setIsDragging(true);
    setRangeStart(day);
    setRangeEnd(null);
  }, []);

  const onDayMouseEnter = useCallback(
    (day) => {
      if (isDragging) {
        setRangeEnd(day);
      }
    },
    [isDragging]
  );

  const onDayMouseUp = useCallback(
    (day) => {
      if (isDragging) {
        setIsDragging(false);
        const end = day || rangeEnd;
        setRangeEnd(end);
        saveRange(rangeStart, end);
      }
    },
    [isDragging, rangeStart, rangeEnd, saveRange]
  );

  const onDayTouchStart = useCallback((day) => {
    setIsDragging(true);
    setRangeStart(day);
    setRangeEnd(null);
  }, []);

  const onDayTouchEnd = useCallback(
    (day) => {
      if (isDragging) {
        setIsDragging(false);
        const end = day || rangeEnd || rangeStart;
        setRangeEnd(end);
        saveRange(rangeStart, end);
      }
    },
    [isDragging, rangeStart, rangeEnd, saveRange]
  );

  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setStorage((prev) => {
      const nextRanges = { ...prev.ranges };
      delete nextRanges[monthKey];
      const next = { ...prev, ranges: nextRanges };
      saveToStorage(next);
      return next;
    });
  }, [monthKey]);

  return {
    currentMonth,
    rangeStart,
    rangeEnd,
    isDragging,
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
  };
}
