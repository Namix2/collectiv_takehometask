import type { ReactNode } from 'react';

interface ActionButtonProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'pink' | 'teal' | 'secondary' | 'icon' | 'share';
}

const variantClasses: Record<NonNullable<ActionButtonProps['variant']>, string> = {
  pink:
    'h-11 rounded-xl bg-[#f2167d] px-5 text-white shadow-[0_4px_14px_rgba(242,22,125,0.24)] hover:brightness-95',
  teal:
    'h-11 rounded-xl bg-[#1ca0bc] px-5 text-white shadow-[0_4px_14px_rgba(28,160,188,0.24)] hover:brightness-95',
  secondary:
    'h-11 rounded-xl border border-border-soft bg-white px-5 text-brand-indigo shadow-[0_2px_8px_rgba(30,27,75,0.08)] hover:border-[#d8dcec] hover:bg-slate-50',
  icon:
    'size-11 rounded-xl border border-border-soft bg-white text-[#6b7280] shadow-[0_2px_8px_rgba(30,27,75,0.08)] hover:border-[#d8dcec] hover:bg-slate-50',
  share:
    'h-[78px] min-w-[78px] rounded-[12px] border border-[#dddff0] bg-white px-3 text-brand-indigo shadow-[0_2px_8px_rgba(30,27,75,0.06)] hover:border-[#d8dcec] hover:bg-slate-50',
};

export function ActionButton({
  ariaLabel,
  children,
  className = '',
  icon,
  onClick,
  variant = 'secondary',
}: ActionButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 font-body text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 cursor-pointer ${
        variant === 'share' ? 'flex-col' : ''
      } ${variantClasses[variant]} ${className}`}
    >
      {icon ? <span className="inline-flex items-center justify-center">{icon}</span> : null}
      {children}
    </button>
  );
}
