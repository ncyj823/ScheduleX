/**
 * Theme Engine
 * - 7 weekly palettes cycling through the year (weekOfYear % 7)
 * - Festival themes for India + US that override the weekly palette
 */

export const WEEKLY_PALETTES = [
  {
    name: "Crimson Dusk",
    "--cal-bg": "#1a0a08",
    "--cal-surface": "#2a1210",
    "--cal-primary": "#e84040",
    "--cal-secondary": "#ff7b54",
    "--cal-text": "#fff5f5",
    "--cal-text-muted": "#c08080",
    "--cal-border": "#4a2020",
    "--cal-highlight-between": "#3a1515",
    "--cal-holiday": "#ffd93d",
    "--cal-weekend": "#ff7b54",
    "--theme-glow": "rgba(232,64,64,0.15)",
    "--theme-particle": "#e84040",
  },
  {
    name: "Ocean Depth",
    "--cal-bg": "#030d1a",
    "--cal-surface": "#061828",
    "--cal-primary": "#0ea5e9",
    "--cal-secondary": "#38bdf8",
    "--cal-text": "#f0f9ff",
    "--cal-text-muted": "#6aaccf",
    "--cal-border": "#0a3050",
    "--cal-highlight-between": "#062040",
    "--cal-holiday": "#7dd3fc",
    "--cal-weekend": "#38bdf8",
    "--theme-glow": "rgba(14,165,233,0.15)",
    "--theme-particle": "#0ea5e9",
  },
  {
    name: "Forest Spell",
    "--cal-bg": "#050f08",
    "--cal-surface": "#0a1f0e",
    "--cal-primary": "#22c55e",
    "--cal-secondary": "#4ade80",
    "--cal-text": "#f0fdf4",
    "--cal-text-muted": "#5a9a70",
    "--cal-border": "#0f3a1a",
    "--cal-highlight-between": "#0a2a12",
    "--cal-holiday": "#bbf7d0",
    "--cal-weekend": "#4ade80",
    "--theme-glow": "rgba(34,197,94,0.15)",
    "--theme-particle": "#22c55e",
  },
  {
    name: "Royal Violet",
    "--cal-bg": "#0a080f",
    "--cal-surface": "#130d20",
    "--cal-primary": "#a855f7",
    "--cal-secondary": "#c084fc",
    "--cal-text": "#faf5ff",
    "--cal-text-muted": "#8a60b0",
    "--cal-border": "#2a1050",
    "--cal-highlight-between": "#1a0838",
    "--cal-holiday": "#f5d0fe",
    "--cal-weekend": "#c084fc",
    "--theme-glow": "rgba(168,85,247,0.15)",
    "--theme-particle": "#a855f7",
  },
  {
    name: "Ember Gold",
    "--cal-bg": "#0f0a00",
    "--cal-surface": "#1f1500",
    "--cal-primary": "#f59e0b",
    "--cal-secondary": "#fbbf24",
    "--cal-text": "#fffbeb",
    "--cal-text-muted": "#b08030",
    "--cal-border": "#3a2800",
    "--cal-highlight-between": "#2a1c00",
    "--cal-holiday": "#fde68a",
    "--cal-weekend": "#fbbf24",
    "--theme-glow": "rgba(245,158,11,0.15)",
    "--theme-particle": "#f59e0b",
  },
  {
    name: "Rose Quartz",
    "--cal-bg": "#0f0508",
    "--cal-surface": "#1f0d15",
    "--cal-primary": "#ec4899",
    "--cal-secondary": "#f472b6",
    "--cal-text": "#fdf2f8",
    "--cal-text-muted": "#b05880",
    "--cal-border": "#4a1030",
    "--cal-highlight-between": "#380820",
    "--cal-holiday": "#fbcfe8",
    "--cal-weekend": "#f472b6",
    "--theme-glow": "rgba(236,72,153,0.15)",
    "--theme-particle": "#ec4899",
  },
  {
    name: "Arctic Slate",
    "--cal-bg": "#08090f",
    "--cal-surface": "#111318",
    "--cal-primary": "#94a3b8",
    "--cal-secondary": "#cbd5e1",
    "--cal-text": "#f8fafc",
    "--cal-text-muted": "#6a7a90",
    "--cal-border": "#1e2535",
    "--cal-highlight-between": "#141c2a",
    "--cal-holiday": "#e2e8f0",
    "--cal-weekend": "#cbd5e1",
    "--theme-glow": "rgba(148,163,184,0.12)",
    "--theme-particle": "#94a3b8",
  },
];

// MM-DD keyed festival themes (India + US)
export const FESTIVAL_THEMES = {
  // ── INDIA ──────────────────────────────────────────────────────────────
  "01-14": {
    name: "Makar Sankranti", emoji: "🪁",
    "--cal-bg": "#0d0a00", "--cal-surface": "#1f1800",
    "--cal-primary": "#f59e0b", "--cal-secondary": "#22c55e",
    "--cal-text": "#fffbeb", "--cal-text-muted": "#a07820",
    "--cal-border": "#3a2800", "--cal-highlight-between": "#2a1c00",
    "--cal-holiday": "#4ade80", "--cal-weekend": "#f59e0b",
    "--theme-glow": "rgba(245,158,11,0.2)", "--theme-particle": "#f59e0b",
    particles: "kites",
  },
  "01-26": {
    name: "Republic Day", emoji: "🇮🇳",
    "--cal-bg": "#00060f", "--cal-surface": "#000e20",
    "--cal-primary": "#FF9933", "--cal-secondary": "#138808",
    "--cal-text": "#ffffff", "--cal-text-muted": "#aaaaaa",
    "--cal-border": "#1a2a1a", "--cal-highlight-between": "#0a1a0a",
    "--cal-holiday": "#ffffff", "--cal-weekend": "#FF9933",
    "--theme-glow": "rgba(255,153,51,0.2)", "--theme-particle": "#FF9933",
    particles: "tricolor",
  },
  "03-13": {
    name: "Holi", emoji: "🎨",
    "--cal-bg": "#080010", "--cal-surface": "#120020",
    "--cal-primary": "#e879f9", "--cal-secondary": "#fb923c",
    "--cal-text": "#fdf4ff", "--cal-text-muted": "#a060c0",
    "--cal-border": "#3a0050", "--cal-highlight-between": "#250035",
    "--cal-holiday": "#4ade80", "--cal-weekend": "#fb923c",
    "--theme-glow": "rgba(232,121,249,0.2)", "--theme-particle": "#e879f9",
    particles: "colors",
  },
  "08-15": {
    name: "Independence Day", emoji: "🇮🇳",
    "--cal-bg": "#00060f", "--cal-surface": "#000e20",
    "--cal-primary": "#FF9933", "--cal-secondary": "#138808",
    "--cal-text": "#ffffff", "--cal-text-muted": "#aaaaaa",
    "--cal-border": "#1a2a1a", "--cal-highlight-between": "#0a1a0a",
    "--cal-holiday": "#ffffff", "--cal-weekend": "#FF9933",
    "--theme-glow": "rgba(255,153,51,0.2)", "--theme-particle": "#FF9933",
    particles: "tricolor",
  },
  "10-02": {
    name: "Gandhi Jayanti", emoji: "🕊️",
    "--cal-bg": "#050f08", "--cal-surface": "#0a1a0d",
    "--cal-primary": "#4ade80", "--cal-secondary": "#86efac",
    "--cal-text": "#f0fdf4", "--cal-text-muted": "#4a8060",
    "--cal-border": "#0f3020", "--cal-highlight-between": "#082015",
    "--cal-holiday": "#bbf7d0", "--cal-weekend": "#4ade80",
    "--theme-glow": "rgba(74,222,128,0.15)", "--theme-particle": "#4ade80",
    particles: "doves",
  },
  "10-20": {
    name: "Diwali", emoji: "🪔",
    "--cal-bg": "#0a0500", "--cal-surface": "#1a0d00",
    "--cal-primary": "#f59e0b", "--cal-secondary": "#ef4444",
    "--cal-text": "#fffbeb", "--cal-text-muted": "#c07020",
    "--cal-border": "#3a1800", "--cal-highlight-between": "#280f00",
    "--cal-holiday": "#fde68a", "--cal-weekend": "#ef4444",
    "--theme-glow": "rgba(245,158,11,0.25)", "--theme-particle": "#f59e0b",
    particles: "fireworks",
  },
  "11-05": {
    name: "Eid", emoji: "🌙",
    "--cal-bg": "#00040f", "--cal-surface": "#000a1f",
    "--cal-primary": "#34d399", "--cal-secondary": "#6ee7b7",
    "--cal-text": "#ecfdf5", "--cal-text-muted": "#3a8060",
    "--cal-border": "#0a2a20", "--cal-highlight-between": "#051a14",
    "--cal-holiday": "#d1fae5", "--cal-weekend": "#6ee7b7",
    "--theme-glow": "rgba(52,211,153,0.18)", "--theme-particle": "#34d399",
    particles: "stars",
  },
  // ── US ─────────────────────────────────────────────────────────────────
  "01-01": {
    name: "New Year's Day", emoji: "🎆",
    "--cal-bg": "#060010", "--cal-surface": "#0d001f",
    "--cal-primary": "#c084fc", "--cal-secondary": "#f59e0b",
    "--cal-text": "#faf5ff", "--cal-text-muted": "#8050b0",
    "--cal-border": "#2a0050", "--cal-highlight-between": "#1a0035",
    "--cal-holiday": "#fde68a", "--cal-weekend": "#f59e0b",
    "--theme-glow": "rgba(192,132,252,0.2)", "--theme-particle": "#c084fc",
    particles: "fireworks",
  },
  "02-14": {
    name: "Valentine's Day", emoji: "💝",
    "--cal-bg": "#0f0008", "--cal-surface": "#1f0012",
    "--cal-primary": "#f43f5e", "--cal-secondary": "#fb7185",
    "--cal-text": "#fff1f2", "--cal-text-muted": "#b04060",
    "--cal-border": "#4a0820", "--cal-highlight-between": "#350512",
    "--cal-holiday": "#fecdd3", "--cal-weekend": "#fb7185",
    "--theme-glow": "rgba(244,63,94,0.2)", "--theme-particle": "#f43f5e",
    particles: "hearts",
  },
  "07-04": {
    name: "US Independence Day", emoji: "🇺🇸",
    "--cal-bg": "#00000f", "--cal-surface": "#00001f",
    "--cal-primary": "#3b82f6", "--cal-secondary": "#ef4444",
    "--cal-text": "#eff6ff", "--cal-text-muted": "#5060a0",
    "--cal-border": "#0a0a40", "--cal-highlight-between": "#050520",
    "--cal-holiday": "#f8fafc", "--cal-weekend": "#ef4444",
    "--theme-glow": "rgba(59,130,246,0.2)", "--theme-particle": "#3b82f6",
    particles: "fireworks",
  },
  "10-31": {
    name: "Halloween", emoji: "🎃",
    "--cal-bg": "#040004", "--cal-surface": "#0a000a",
    "--cal-primary": "#f97316", "--cal-secondary": "#a855f7",
    "--cal-text": "#fff7ed", "--cal-text-muted": "#8a4020",
    "--cal-border": "#3a0030", "--cal-highlight-between": "#250020",
    "--cal-holiday": "#fde68a", "--cal-weekend": "#f97316",
    "--theme-glow": "rgba(249,115,22,0.2)", "--theme-particle": "#f97316",
    particles: "ghosts",
  },
  "11-27": {
    name: "Thanksgiving", emoji: "🦃",
    "--cal-bg": "#080400", "--cal-surface": "#150900",
    "--cal-primary": "#d97706", "--cal-secondary": "#f59e0b",
    "--cal-text": "#fffbeb", "--cal-text-muted": "#a06020",
    "--cal-border": "#3a1800", "--cal-highlight-between": "#280e00",
    "--cal-holiday": "#fef3c7", "--cal-weekend": "#f59e0b",
    "--theme-glow": "rgba(217,119,6,0.18)", "--theme-particle": "#d97706",
    particles: "leaves",
  },
  "12-25": {
    name: "Christmas", emoji: "🎄",
    "--cal-bg": "#000f03", "--cal-surface": "#001a06",
    "--cal-primary": "#22c55e", "--cal-secondary": "#ef4444",
    "--cal-text": "#f0fdf4", "--cal-text-muted": "#3a8050",
    "--cal-border": "#0a3010", "--cal-highlight-between": "#052008",
    "--cal-holiday": "#fde68a", "--cal-weekend": "#ef4444",
    "--theme-glow": "rgba(34,197,94,0.18)", "--theme-particle": "#22c55e",
    particles: "snowflakes",
  },
};

export function getWeekOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date - start) / (7 * 24 * 60 * 60 * 1000));
}

export function getFestivalTheme(date) {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return FESTIVAL_THEMES[key] || null;
}

export function getWeeklyPalette(date) {
  return WEEKLY_PALETTES[getWeekOfYear(date) % 7];
}

/** Returns the active theme — festival wins over weekly */
export function getActiveTheme(date) {
  const festival = getFestivalTheme(date);
  if (festival) return { ...festival, isFestival: true };
  const weekly = getWeeklyPalette(date);
  return { ...weekly, isFestival: false };
}

/** Apply CSS vars to document root */
export function applyThemeToDom(theme) {
  const root = document.documentElement;
  Object.keys(theme)
    .filter((k) => k.startsWith("--"))
    .forEach((key) => root.style.setProperty(key, theme[key]));
}
