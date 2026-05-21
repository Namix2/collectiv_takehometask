interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function ActionButton({ children, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border-soft bg-white px-4 py-2.5 font-body text-sm font-semibold 
      text-brand-indigo transition hover:border-accent-yellow hover:bg-accent-yellow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 cursor-pointer"
    >
      {children}
    </button>
  );
}
