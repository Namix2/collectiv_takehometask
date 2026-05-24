import type { ReactNode } from "react";
import { ModalShell } from "./ModalShell";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthOptionButton({
  children,
  icon,
  onClick,
}: {
  children: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-[14px] border border-[#dfe3ef] bg-white px-4 font-body text-[18px] font-semibold text-[#1f2740] transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
    >
      <span aria-hidden="true" className="inline-flex size-5 items-center justify-center">
        {icon}
      </span>
      <span>{children}</span>
    </button>
  );
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <ModalShell
      ariaLabelledBy="signup-modal-title"
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-full max-w-[440px] rounded-[28px] bg-white px-8 pb-8 pt-6 shadow-[0_32px_100px_rgba(18,24,40,0.28)]"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign in modal"
          className="inline-flex size-8 items-center justify-center rounded-full text-[30px] leading-none text-[#7b8399] transition hover:bg-[#f7f8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          {"\u00D7"}
        </button>
      </div>

      <div className="-mt-2 text-center">
        <h2
          id="signup-modal-title"
          className="font-body text-[clamp(2rem,4vw,1rem)] font-bold tracking-[-0.04em] text-[#1f2740]"
        >
          Sign in to start collecting
        </h2>
        <p className="mx-auto mt-1 max-w-[18rem] font-body text-[14.5px] leading-5 text-[#7b8399] sm:max-w-[19.5rem]">
          You can either use your Apple account or your email address.
        </p>
      </div>

      <div className="mt-8">
        <label
          htmlFor="signup-country"
          className="mb-3 block font-body text-[16px] font-semibold text-[#1f2740]"
        >
          Country
        </label>

        <div className="relative">
          <select
            id="signup-country"
            defaultValue="🇬🇧 United Kingdom"
            className="h-14 w-full appearance-none rounded-[14px] border border-[#dfe3ef] bg-white px-4 pr-11 font-display text-[16px] text-[#1f2740] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
          >
            <option>🇬🇧 United Kingdom</option>
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-4 inline-flex items-center text-[10px] text-[#7b8399]"
          >
            {"\u25BE"}
          </span>
          <span className="sr-only">Country selection</span>
        </div>
      </div>

      <div className="mt-6 border-t border-[#eceef5] pt-5">
        <div className="space-y-3">
          <AuthOptionButton
            icon={
              <svg viewBox="0 0 20 20" className="size-5 fill-current" aria-hidden="true">
                <path d="M13.63 3.18c.68-.82 1.13-1.95 1-3.08-.98.04-2.17.65-2.88 1.47-.63.72-1.19 1.87-1.04 2.97 1.1.08 2.23-.56 2.92-1.36Zm2.18 10.12c-.42.96-.62 1.39-1.16 2.27-.75 1.22-1.82 2.74-3.15 2.75-1.18.02-1.48-.78-3.08-.77-1.59.01-1.92.78-3.1.76-1.33-.01-2.34-1.38-3.09-2.6C.14 12.98-.27 9.3 1.18 7.09 2.2 5.52 3.82 4.6 5.34 4.6c1.56 0 2.54.79 3.83.79 1.25 0 2.01-.79 3.82-.79 1.35 0 2.78.74 3.8 2.01-3.34 1.83-2.81 6.62-.98 6.69Z" />
              </svg>
            }
          >
            Sign up with Apple
          </AuthOptionButton>
          <AuthOptionButton
            icon={
              <svg
                viewBox="0 0 20 20"
                className="size-5 stroke-current"
                fill="none"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
                <path d="m3.5 6 6.5 5 6.5-5" />
              </svg>
            }
          >
            Sign up with Email
          </AuthOptionButton>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-[19.5rem] text-center font-display text-[14px] leading-7 text-[#7b8399]">
        By signing up you agree to our{" "}
        <button
          type="button"
          className="text-[#6c748b] underline underline-offset-2 transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          Terms &amp; Conditions
        </button>{" "}
        and have read and acknowledged our{" "}
        <button
          type="button"
          className="text-[#6c748b] underline underline-offset-2 transition hover:text-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20"
        >
          Privacy Policy
        </button>
        .
      </p>
    </ModalShell>
  );
}
