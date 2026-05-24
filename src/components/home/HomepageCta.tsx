interface HomepageCtaProps {
  label?: string;
}

export function HomepageCta({ label = "Collect money now" }: HomepageCtaProps) {
  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-full bg-accent-yellow px-5 font-body text-sm font-semibold text-brand-indigo transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/60"
    >
      {label}
    </button>
  );
}
