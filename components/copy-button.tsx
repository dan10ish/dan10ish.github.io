"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "default" | "lg";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  size?: SizeVariant;
}

const sizeMap: Record<SizeVariant, { button: string; icon: number }> = {
  sm: { button: "h-8 w-8", icon: 14 },
  default: { button: "h-9 w-9", icon: 16 },
  lg: { button: "h-12 w-12", icon: 20 },
};

/** Clipboard API when available; textarea + execCommand fallback for older iOS / edge cases. */
async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
    }
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      size = "default",
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (value) {
        const ok = await copyToClipboard(value);
        if (ok) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }
      }
      onClick?.(event);
    };

    const { button: buttonSize, icon: iconSize } = sizeMap[size];

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
        className={cn(
          "relative inline-flex cursor-pointer touch-manipulation items-center justify-center rounded-md text-foreground transition-all duration-200 ease-out hover:will-change-transform active:scale-[0.97] disabled:pointer-events-none disabled:opacity-100",
          buttonSize,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none transition-all duration-200",
            copied
              ? "scale-100 opacity-100 blur-none"
              : "scale-70 opacity-0 blur-[2px]",
          )}
        >
          <CheckIcon
            size={iconSize}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div
          className={cn(
            "pointer-events-none absolute transition-all duration-200",
            copied
              ? "scale-0 opacity-0 blur-[2px]"
              : "scale-100 opacity-100 blur-none",
          )}
        >
          <CopyIcon size={iconSize} strokeWidth={2} aria-hidden="true" />
        </div>
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";

export { CopyButton };
export type { CopyButtonProps };
