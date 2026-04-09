import { useEffect, useState, useRef } from "react";
import { getActiveTheme, applyThemeToDom } from "@/utils/themes";

/**
 * useTheme — watches the displayed month/date and applies the correct
 * CSS variable theme to :root with a smooth cross-fade.
 *
 * Returns: { theme, isTransitioning }
 */
export function useTheme(displayDate) {
  const [theme, setTheme] = useState(() => getActiveTheme(displayDate));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevThemeRef = useRef(theme);
  const rafRef = useRef(null);

  useEffect(() => {
    const next = getActiveTheme(displayDate);
    const prev = prevThemeRef.current;

    // Skip if theme name hasn't changed
    if (prev.name === next.name) return;

    // Signal transition start (used for overlay flash)
    setIsTransitioning(true);

    // Small delay so the flash overlay renders before vars change
    rafRef.current = setTimeout(() => {
      applyThemeToDom(next);
      setTheme(next);
      prevThemeRef.current = next;

      // End transition
      setTimeout(() => setIsTransitioning(false), 350);
    }, 80);

    return () => clearTimeout(rafRef.current);
  }, [displayDate]);

  // Apply initial theme on mount
  useEffect(() => {
    applyThemeToDom(theme);
  }, []); // eslint-disable-line

  return { theme, isTransitioning };
}
