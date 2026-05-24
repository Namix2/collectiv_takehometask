import type { ReactNode } from "react";
import { ModalShell } from "../ModalShell";

interface FormPromptModalProps {
  action: "category" | "name";
  body: string;
  ctaLabel: string;
  children: ReactNode;
  isContinueDisabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
}

export function FormPromptModal({
  action,
  body,
  ctaLabel,
  children,
  isContinueDisabled,
  isOpen,
  onClose,
  onContinue,
  title,
}: FormPromptModalProps) {
  return (
    <ModalShell
      ariaLabelledBy="form-prompt-title"
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-full max-w-[440px] rounded-[28px] bg-white p-7 shadow-[0_24px_64px_rgba(30,27,75,0.22)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="form-prompt-title"
          className="font-body text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-[#323F4B]"
        >
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close prompt"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-soft text-[20px] text-[#5f6f82] transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          {"\u00D7"}
        </button>
      </div>

      <p className="mt-4 text-[17px] leading-7 text-[#5f6f82]">{body}</p>

      <div className="mt-6">{children}</div>

      <div className="mt-7 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-full border border-border-soft px-5 font-body text-sm font-semibold text-brand-indigo transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          Close
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={isContinueDisabled}
          className="inline-flex h-11 items-center justify-center rounded-full bg-accent-yellow px-5 font-body text-sm font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {action === "name" ? "Save name and continue" : ctaLabel}
        </button>
      </div>
    </ModalShell>
  );
}
