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
      <fieldset className="cat-selector">
      <legend className="cat-selector__legend">
        What are you collecting for?
      </legend>

    <div
      className="cat_grid"
      role="radiogroup"
      aria-describedby={error ? "pot-cat-error" : undefined}
    >
      {POT_CATEGORIES.map((cat) => {
        const isActive = value === cat.value;
        
        return(
        <div
        key={cat.value}
        role="radio"
        tabIndex={0}
        aria-checked={isActive}
        className={
            isActive
            ? 'cat_card cat_card--active'
            : 'cat_card'
        }
        onClick={() => onChange(cat.value)}
       >
          <span className="cat_card_icon">{cat.icon}</span>
          <span className="cat_card_label">{cat.label}</span>
        </div>
        );
    })}
        </div>
          {error && (
        <p id="pot-category-error" className="cat-selector__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
)};
