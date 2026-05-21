
import { MAX_POT_NAME_LENGTH } from "../features/pot/pot.constants";

interface PotNameInputProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PotNameInput({ value, error, onChange }: PotNameInputProps) {
  return (
    <div>
      <label htmlFor="pot-name">Pot name</label>

      <input
        id="pot-name"
        type="text"
        value={value}
        maxLength={MAX_POT_NAME_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'pot-name-error' : 'pot-name-hint'}
        placeholder="e.g. Sam's birthday pot"
      />

      <p id="pot-name-hint">
        {value.length}/{MAX_POT_NAME_LENGTH} characters
      </p>

      {error && (
        <p id="pot-name-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}