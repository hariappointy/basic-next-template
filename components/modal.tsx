"use client";

import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, description, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <button
        aria-label="Close modal"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <div className="panel-strong relative z-10 w-full max-w-xl rounded-3xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
            {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
          </div>
          <button
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
