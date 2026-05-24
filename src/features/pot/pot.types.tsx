export const POT_CATEGORY_VALUES = [
  "Travel",
  "Gift",
  "Sport",
  "Friends",
  "Other",
  "Charity",
] as const;

export type PotCategory = (typeof POT_CATEGORY_VALUES)[number];

export interface Pot {
  id: string;
  name: string;
  category: PotCategory;
  createdAt: string;
}

export interface PotCreationInput {
  name: string;
  category: PotCategory | "";
}

export interface PotValidationErrors {
  name?: string;
  category?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isPotCategory(value: unknown): value is PotCategory {
  return (
    typeof value === "string" &&
    POT_CATEGORY_VALUES.some((category) => category === value)
  );
}

export function isPot(value: unknown): value is Pot {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    isPotCategory(value.category) &&
    typeof value.createdAt === "string"
  );
}
