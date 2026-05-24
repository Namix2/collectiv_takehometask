import { ModalShell } from "./ModalShell";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <ModalShell
      ariaLabelledBy="signup-modal-title"
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-full max-w-md rounded-3xl border border-border-soft bg-white p-6 shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="signup-modal-title"
          className="font-display text-2xl font-bold tracking-tight text-brand-indigo"
        >
          Create an account to continue
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign up modal"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-soft text-[20px] text-brand-indigo/70 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          {"\u00D7"}
        </button>
      </div>

      <p className="mt-3 font-body text-sm leading-6 text-brand-indigo/80">
        Sign up to manage your pot, invite contributors, and start collecting money.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-brand-indigo px-4 py-3 font-display text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/30"
        >
          Sign up
        </button>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-xl border border-border-soft bg-white px-4 py-3 font-display text-sm font-semibold text-brand-indigo transition hover:border-accent-yellow hover:bg-accent-yellow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}
