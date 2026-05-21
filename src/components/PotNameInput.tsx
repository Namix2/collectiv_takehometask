
import type { ReactNode } from 'react';
import { MAX_POT_NAME_LENGTH } from "../features/pot/pot.constants";

interface PotNameInputProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
}

export function PotNameInput({ value, error, onChange, icon }: PotNameInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="pot-name" className="font-body text-[16px] font-semibold text-brand-indigo">
        What should we call the pot?
      </label>

      <div className="flex h-12 items-center gap-2.5 rounded-[14px] border border-border-soft bg-surface-soft px-4 font-body focus-within:outline-none focus-within:border-accent-yellow focus-within:shadow-[0_0_0_2px_rgba(255,222,0,0.35)] transition duration-150">
        <span
          className="inline-flex size-5 shrink-0 items-center justify-center text-[#9CA3AF]"
          aria-hidden="true"
        >
          {icon}
        </span>

        <input
          id="pot-name"
          type="text"
          value={value}
          maxLength={MAX_POT_NAME_LENGTH}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'pot-name-error' : undefined}
          placeholder="Enter a name for this pot"
          className="w-full border-0 bg-transparent text-[16px] font-medium text-brand-indigo outline-none placeholder:font-medium placeholder:text-[#9CA3AF] placeholder:font-display"
        />
      </div>
      
      {error && (
        <p id="pot-name-error" className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
