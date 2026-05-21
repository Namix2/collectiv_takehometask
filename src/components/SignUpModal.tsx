interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-indigo/30 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        className="w-full max-w-md rounded-3xl border border-border-soft bg-white p-6 shadow-xl"
      >
        <h2
          id="signup-modal-title"
          className="font-display text-2xl font-bold tracking-tight text-brand-indigo"
        >
          Create an account to continue
        </h2>

        <p className="mt-3 font-body text-sm leading-6 text-brand-indigo/80">
          Sign up to manage your pot, invite contributors, and start collecting
          money.
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
      </div>
    </div>
  );
}
