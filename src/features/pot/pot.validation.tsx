import { MAX_POT_NAME_LENGTH } from './pot.constants';
import type { PotCreationInput, PotValidationErrors } from './pot.types';

export function validatePotCreationInput(
  input: PotCreationInput
): PotValidationErrors {
  const errors: PotValidationErrors = {};

  const trimmedName = input.name.trim();

  if (!trimmedName) {
    errors.name = 'Please enter a pot name.';
  }

  if (trimmedName.length > MAX_POT_NAME_LENGTH) {
    errors.name = `Pot name must be ${MAX_POT_NAME_LENGTH} characters or fewer.`;
  }

  if (!input.category) {
    errors.category = 'Please choose a category.';
  }

  return errors;
}

export function hasValidationErrors(errors: PotValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}