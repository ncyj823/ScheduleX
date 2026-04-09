import { AnimatePresence, motion } from "framer-motion";

export default function ThemeTransitionOverlay({ isTransitioning }) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--cal-primary)",
            pointerEvents: "none",
            zIndex: 200,
          }}
        />
      )}
    </AnimatePresence>
  );
}
