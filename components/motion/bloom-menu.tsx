"use client";

import {
  Bell,
  FileText,
  FolderClosed,
  LayoutGrid,
  Link,
  Plus,
  Table,
  X,
  ChevronLeft,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentType, useEffect, useId, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

type MenuItem = { label: string; icon: ComponentType<{ className?: string }> };

const ITEMS: MenuItem[] = [
  { label: "Doc", icon: FileText },
  { label: "Board", icon: LayoutGrid },
  { label: "Table", icon: Table },
  { label: "Folder", icon: FolderClosed },
  { label: "Reminder", icon: Bell },
  { label: "Link", icon: Link },
];

// Folder-open feel: a touch of overshoot as the panel expands, kept subtle.
const SPRING_FOLDER = {
  type: "spring",
  stiffness: 300,
  damping: 32,
  mass: 0.9,
} as const;

export interface BloomMenuProps {
  items?: MenuItem[];
  onSelect?: (label: string | null) => void;
  activeSection?: string | null;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function BloomMenu({
  items = ITEMS,
  onSelect,
  activeSection,
  onClose,
  className,
  children,
}: BloomMenuProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const layoutId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose]);

  const morph = reduce ? { duration: 0.15 } : SPRING_FOLDER;

  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>
      <div className="h-11 w-36" aria-hidden />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-[400px] w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 place-items-center [&>*]:pointer-events-auto">
        <AnimatePresence initial={false} mode="popLayout">
          {!open ? (
            <motion.button
              key="trigger"
              type="button"
              layoutId={layoutId}
              transition={morph}
              style={{ borderRadius: 16 }}
              onClick={() => setOpen(true)}
              aria-haspopup="menu"
              aria-expanded={open}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="inline-flex h-11 w-36 items-center justify-center border border-border bg-card shadow-sm text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <motion.span
                layout
                className="inline-flex items-center gap-2 whitespace-nowrap"
              >
                Explore
                <Plus className="h-4 w-4" />
              </motion.span>
            </motion.button>
          ) : !activeSection ? (
            <motion.div
              key="grid-panel"
              layoutId={layoutId}
              transition={morph}
              style={{ borderRadius: 16 }}
              className="w-[min(92vw,480px)] overflow-hidden border border-border bg-card shadow-2xl flex flex-col max-h-[75vh]"
            >
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                {/* header */}
                <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">
                    Explore
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onClose?.();
                    }}
                    aria-label="Close menu"
                    className="text-muted-foreground transition-colors hover:text-foreground p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* grid */}
                <motion.div
                  initial={reduce ? false : { clipPath: "inset(45% 34% 45% 34%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ delay: reduce ? 0 : 0.08, duration: 0.45, ease: EASE_OUT }}
                  className="grid grid-cols-3 w-full"
                >
                  {items.map((item, i) => {
                    const cols = 3;
                    const rows = Math.ceil(items.length / cols);
                    const col = i % cols;
                    const row = Math.floor(i / cols);
                    const dist = Math.hypot(col - (cols - 1) / 2, row - (rows - 1) / 2);
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => onSelect?.(item.label)}
                        className={cn(
                          "flex items-center justify-center px-4 py-8 text-muted-foreground transition-colors hover:text-foreground",
                          i % 3 !== 2 && "border-r border-border",
                          i < 3 && "border-b border-border",
                        )}
                      >
                        <motion.span
                          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          transition={{ delay: reduce ? 0 : dist * 0.05, type: "spring", stiffness: 440, damping: 34 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <item.icon className="h-6 w-6" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </motion.span>
                      </button>
                    );
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content-panel"
              layoutId={layoutId}
              transition={morph}
              style={{ borderRadius: 16 }}
              className="w-[min(92vw,480px)] overflow-hidden border border-border bg-card shadow-2xl flex flex-col max-h-[75vh]"
            >
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
              >
                {/* header with back button */}
                <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect?.(null)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground -ml-1.5 p-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onClose?.();
                    }}
                    aria-label="Close menu"
                    className="text-muted-foreground transition-colors hover:text-foreground p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* content */}
                <div className="overflow-y-auto scrollbar-thin p-5 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3, ease: EASE_OUT }}
                  >
                    {children}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
