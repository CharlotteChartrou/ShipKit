"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  className?: string;
}

export function Modal({
  children,
  className,
  description,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-950/72 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-soft",
          className,
        )}
      >
        <div className="mb-5 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
          {description ? <p className="text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
