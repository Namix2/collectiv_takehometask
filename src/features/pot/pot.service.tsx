import type { Pot, PotCreationInput } from './pot.types';
import { savePot } from './pot.storage';

function createPotId(): string {
  return crypto.randomUUID();
}

export function createPot(input: PotCreationInput): Pot {
  const pot: Pot = {
    id: createPotId(),
    name: input.name.trim(),
    category: input.category as Pot['category'],
    createdAt: new Date().toISOString(),
  };

  savePot(pot);

  return pot;
}