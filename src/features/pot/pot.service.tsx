import { isPotCategory, type Pot, type PotCreationInput } from "./pot.types";
import { savePot } from "./pot.storage";

function createPotId(): string {
  return crypto.randomUUID();
}

export function createPot(input: PotCreationInput): Pot {
  const trimmedName = input.name.trim();

  if (!trimmedName) {
    throw new Error("Pot name is required.");
  }

  if (!isPotCategory(input.category)) {
    throw new Error("Pot category is required.");
  }

  const pot: Pot = {
    id: createPotId(),
    name: trimmedName,
    category: input.category,
    createdAt: new Date().toISOString(),
  };

  savePot(pot);
  return pot;
}
