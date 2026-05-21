import { POT_CATEGORIES } from "../features/pot/pot.constants";
import type { PotCategory } from "../features/pot/pot.types";
 


interface CategorySelectorProps {
  value: PotCategory | "";
  error?: string;
  onChange: (value: PotCategory) => void;
}
export function CategorySelector({
  value,
  error,
  onChange,
}: CategorySelectorProps) {
  return (
    <fieldset className="w-full border-0 p-0">
      <legend className="mb-3 font-body text-[16px] font-semibold text-brand-indigo">
        What are you collecting for?
      </legend>

      <div
        className="grid w-full grid-cols-3 gap-2"
        role="radiogroup"
        aria-describedby={error ? "pot-category-error" : undefined}
      >
        {POT_CATEGORIES.map((cat) => {
          const isActive = value === cat.value;

          return (
            <button
              key={cat.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`flex min-h-[68px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border px-3 py-2 text-center transition duration-150 ease-in-out hover:border-accent-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 ${
                isActive
                  ? 'border-accent-yellow bg-accent-yellow-soft shadow-[0_0_0_2px_rgba(255,222,0,0.35)]'
                  : 'border-border-soft bg-white'
              }`}
              onClick={() => onChange(cat.value)}
            >
              <span className="text-[18px] leading-none">{cat.icon}</span>
              <span className="block max-w-[135px] font-display text-[12px] font-medium leading-[1.1] text-brand-indigo">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p id="pot-category-error" className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
