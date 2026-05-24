import { useId, useRef, type KeyboardEvent } from "react";
import { POT_CATEGORIES } from "../features/pot/pot.constants";
import type { PotCategory } from "../features/pot/pot.types";

interface CategorySelectorProps {
  value: PotCategory | "";
  onChange: (value: PotCategory) => void;
}
export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const legendId = useId();
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = POT_CATEGORIES.findIndex((category) => category.value === value);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  function focusOption(index: number) {
    optionRefs.current[index]?.focus();
  }

  function selectOption(index: number) {
    onChange(POT_CATEGORIES[index].value);
  }

  function moveSelection(index: number) {
    const total = POT_CATEGORIES.length;
    const nextIndex = (index + total) % total;
    selectOption(nextIndex);
    focusOption(nextIndex);
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        moveSelection(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        moveSelection(index - 1);
        break;
      case "Home":
        event.preventDefault();
        moveSelection(0);
        break;
      case "End":
        event.preventDefault();
        moveSelection(POT_CATEGORIES.length - 1);
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        selectOption(index);
        break;
      default:
        break;
    }
  }

  return (
    <fieldset className="w-full border-0 p-0">
      <legend
        id={legendId}
        className="mb-3 font-body text-[16px] font-semibold text-brand-indigo"
      >
        What are you collecting for?
      </legend>

      <div className="grid w-full grid-cols-3 gap-2" role="radiogroup" aria-labelledby={legendId}>
        {POT_CATEGORIES.map((cat, index) => {
          const isActive = value === cat.value;
          const isTabbable = index === activeIndex;

          return (
            <button
              key={cat.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              data-category-option="true"
              role="radio"
              aria-checked={isActive}
              tabIndex={isTabbable ? 0 : -1}
              className={`flex min-h-[68px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border px-3 py-2 text-center transition duration-150 ease-in-out hover:border-accent-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/20 ${
                isActive
                  ? "border-accent-yellow bg-accent-yellow-soft shadow-[0_0_0_2px_rgba(255,222,0,0.35)]"
                  : "border-border-soft bg-[#F9FAFB]"
              }`}
              onClick={() => onChange(cat.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span className="text-[18px] leading-none">{cat.icon}</span>
              <span className="block max-w-[135px] font-display text-[12px] font-medium leading-[1.1] text-brand-indigo">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
