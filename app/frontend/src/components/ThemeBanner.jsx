import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeBanner({ theme }) {
  const [show, setShow] = useState(false);
  const [lastFestival, setLastFestival] = useState(null);

  useEffect(() => {
    if (theme?.isFestival && theme.name !== lastFestival) {
      setShow(true);
      setLastFestival(theme.name);
      const t = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(t);
    }
    if (!theme?.isFestival) {
      setShow(false);
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {show && theme?.isFestival && (
        <motion.div
          key={theme.name}
          initial={{ y: -80, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            position: "fixed",
            top: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            background: "var(--cal-surface)",
            border: "1px solid var(--cal-primary)",
            borderRadius: "100px",
            padding: "0.6rem 1.4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            boxShadow: "0 8px 32px var(--theme-glow), 0 2px 8px rgba(0,0,0,0.4)",
            fontFamily: "var(--cal-font-body)",
            whiteSpace: "nowrap",
          }}
        >
          <motion.span
            animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.3, 1.3, 1.1, 1] }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: "1.4rem", lineHeight: 1 }}
          >
            {theme.emoji}
          </motion.span>
          <span style={{ color: "var(--cal-text)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.03em" }}>
            Happy {theme.name}!
          </span>
          <motion.span
            animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.3, 1.3, 1.1, 1] }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ fontSize: "1.4rem", lineHeight: 1 }}
          >
            {theme.emoji}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
