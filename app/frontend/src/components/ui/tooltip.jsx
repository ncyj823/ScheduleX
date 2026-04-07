import { Children, cloneElement, createContext, useContext, useMemo, useState } from "react";

const TooltipContext = createContext(null);

export function TooltipProvider({ children }) {
  return children;
}

export function Tooltip({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <TooltipContext.Provider value={value}>
      <div className="tooltip-root">{children}</div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild = false }) {
  const ctx = useContext(TooltipContext);
  if (!ctx) return children;

  const triggerProps = {
    onMouseEnter: (event) => {
      ctx.setOpen(true);
      children.props.onMouseEnter?.(event);
    },
    onMouseLeave: (event) => {
      ctx.setOpen(false);
      children.props.onMouseLeave?.(event);
    },
    onFocus: (event) => {
      ctx.setOpen(true);
      children.props.onFocus?.(event);
    },
    onBlur: (event) => {
      ctx.setOpen(false);
      children.props.onBlur?.(event);
    },
  };

  if (asChild) {
    return cloneElement(Children.only(children), triggerProps);
  }

  return <span {...triggerProps}>{children}</span>;
}

export function TooltipContent({ children, className = "", ...props }) {
  const ctx = useContext(TooltipContext);
  if (!ctx?.open) return null;

  return (
    <div className={`tooltip-content ${className}`.trim()} role="tooltip" {...props}>
      {children}
    </div>
  );
}
